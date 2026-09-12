'use client';

import { useState, useCallback, useMemo } from 'react';
import { useBaseTrading } from './use-base-trading';
import { useProposal, useBuy } from './use-base-trading';
import { computeDigitStats, getLastDigit } from '../lib/digit-stats';
import type { ActiveSymbol, Tick, ProposalInfo, DurationLimits, BuyResult } from '../packages/core';
import type { ContractMode, TradeType, DigitStats, OpenPosition, ClosedPosition } from '../lib/types';

const CONTRACT_TYPES = ['CALL', 'PUT', 'DIGITMATCH', 'DIGITDIFF', 'DIGITOVER', 'DIGITUNDER', 'DIGITEVEN', 'DIGITODD', 'ACCU'] as const;

interface UseDigitsTradingReturn {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  symbols: ActiveSymbol[];
  activeSymbol: ActiveSymbol | null;
  selectSymbol: (symbol: string) => void;
  currentTick: Tick | null;
  lastDigit: number | null;
  digitStats: DigitStats;
  tradeType: TradeType;
  setTradeType: (type: TradeType) => void;
  contractMode: ContractMode;
  setContractMode: (mode: ContractMode) => void;
  selectedDigit: number;
  setSelectedDigit: (digit: number) => void;
  contractAvailable: boolean;
  pipSize: number;
  stake: string;
  setStake: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  durationLimits: DurationLimits;
  defaultStake: number;
  proposal: ProposalInfo | null;
  isProposalLoading: boolean;
  buyContract: () => Promise<void>;
  isBuying: boolean;
  buyResult: BuyResult | null;
  buyError: string | null;
  clearBuyResult: () => void;
  openPositions: OpenPosition[];
  closedPositions: ClosedPosition[];
  sellContract: (contractId: number, bidPrice: string) => Promise<void>;
  sellingId: number | null;
  sellError: string | null;
  clearSellError: () => void;
}

export type UseDigitsTradingParams = {
  ws: any;
  isConnected: boolean;
  isExhausted: boolean;
  isAuthenticated: boolean;
  authState: any;
  accounts: any;
  activeAccount: any;
};

function needsBarrier(mode: string): boolean {
  return ['DIGITMATCH', 'DIGITDIFF', 'DIGITOVER', 'DIGITUNDER'].includes(mode);
}

export function useDigitsTrading({
  ws, isConnected, isExhausted, isAuthenticated, authState, accounts, activeAccount,
}: UseDigitsTradingParams): UseDigitsTradingReturn {
  const trading = useBaseTrading({ ws, isConnected, isExhausted, isAuthenticated, authState, accounts, activeAccount });

  const [tradeType, setTradeTypeState] = useState<TradeType>('rise-fall' as TradeType);
  const [contractMode, setContractMode] = useState<ContractMode>('CALL' as ContractMode);
  const [selectedDigit, setSelectedDigit] = useState<number>(7);
  const [stake, setStake] = useState<string>('5');
  const [duration, setDuration] = useState<number>(5);

  const setTradeType = useCallback((type: TradeType) => {
    setTradeTypeState(type);
    switch (type) {
      case 'matches-differs':
        setContractMode('DIGITMATCH' as ContractMode);
        break;
      case 'over-under':
        setContractMode('DIGITOVER' as ContractMode);
        break;
      case 'even-odd':
        setContractMode('DIGITEVEN' as ContractMode);
        break;
      case 'rise-fall':
        setContractMode('CALL' as ContractMode);
        break;
      case 'accumulator':
        setContractMode('ACCU' as ContractMode);
        break;
      default:
        break;
    }
  }, []);

  const digitStats = useMemo(() => computeDigitStats(trading.prices, trading.pipSize), [trading.prices, trading.pipSize]);
  const lastDigit = useMemo(() => {
    if (!trading.currentTick) return null;
    return getLastDigit(trading.currentTick.quote, trading.pipSize);
  }, [trading.currentTick]);

  const proposalParams = useMemo(() => {
    if (!trading.activeSymbol) return null;
    const stakeNum = parseFloat(stake);
    if (!stakeNum || stakeNum <= 0) return null;

    if (contractMode === 'ACCU') {
      return {
        contract_type: contractMode,
        symbol: trading.activeSymbol.underlying_symbol,
        amount: stakeNum,
        basis: 'stake' as const,
        currency: 'USD',
        growth_rate: 0.04,
      };
    }

    const base: any = {
      contract_type: contractMode,
      symbol: trading.activeSymbol.underlying_symbol,
      duration,
      duration_unit: 't' as const,
      amount: stakeNum,
      basis: 'stake' as const,
      currency: 'USD',
    };
    if (needsBarrier(contractMode)) {
      base.barrier = selectedDigit;
    }
    return base;
  }, [trading.activeSymbol, contractMode, stake, duration, selectedDigit]);

  const { proposal, isLoading: isProposalLoading } = useProposal(trading.ws, trading.isConnected, proposalParams);
  const { buyContract: buyWithProposal, isBuying, buyResult, buyError, clearBuyResult, openPositions, closedPositions, sellContract, sellingId, sellError, clearSellError } = useBuy(trading.ws, trading.isConnected);

  const buyContract = useCallback(async () => {
    if (!proposal) return;
    await buyWithProposal(proposal);
  }, [proposal, buyWithProposal]);

  return {
    isConnected: trading.isConnected,
    isLoading: trading.isLoading,
    error: trading.error,
    symbols: trading.symbols,
    activeSymbol: trading.activeSymbol,
    selectSymbol: trading.selectSymbol,
    currentTick: trading.currentTick,
    lastDigit,
    digitStats,
    tradeType,
    setTradeType,
    contractMode,
    setContractMode,
    selectedDigit,
    setSelectedDigit,
    contractAvailable: true,
    pipSize: trading.pipSize,
    stake,
    setStake,
    duration,
    setDuration,
    durationLimits: trading.durationLimits,
    defaultStake: trading.defaultStake,
    proposal,
    isProposalLoading: isConnected && !!proposalParams && !proposal,
    buyContract,
    isBuying,
    buyResult,
    buyError,
    clearBuyResult,
    openPositions,
    closedPositions,
    sellContract,
    sellingId,
    sellError,
    clearSellError,
  };
}
