// lib/types.ts - FULL VERSION WITH RISE/FALL + ACCU + ALL MARKETS

export type TradeType = 
  | 'rise-fall' 
  | 'matches-differs' 
  | 'over-under' 
  | 'even-odd' 
  | 'accumulator';

export type ContractMode = 
  | 'CALL' 
  | 'PUT' 
  | 'DIGITMATCH' 
  | 'DIGITDIFF' 
  | 'DIGITOVER' 
  | 'DIGITUNDER' 
  | 'DIGITEVEN' 
  | 'DIGITODD' 
  | 'ACCU';

export type DigitStats = {
  [key: number]: number;
};

export interface OpenPosition {
  contract_id: number;
  contract_type: ContractMode;
  underlying_symbol: string;
  buy_price: number;
  current_price?: number;
  bid_price?: number;
  profit?: number;
  payout?: number;
  status?: string;
  entry_tick?: number;
  current_tick?: number;
}

export interface ClosedPosition extends OpenPosition {
  sell_price: number;
  profit: number;
  status: 'won' | 'lost';
}

export interface ProposalInfo {
  id: string;
  payout: number;
  ask_price: number;
  spot?: number;
  display_value?: string;
}

export interface DurationLimits {
  min: number;
  max: number;
}

export interface MarketConfig {
  symbol: string;
  name: string;
  market: string;
  pipSize: number;
}

export const MARKETS: MarketConfig[] = [
  { symbol: '1HZ100V', name: 'Volatility 100 (1s) Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'R_100', name: 'Volatility 100 Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'R_50', name: 'Volatility 50 Index', market: 'synthetic_indices', pipSize: 4 },
  { symbol: 'R_25', name: 'Volatility 25 Index', market: 'synthetic_indices', pipSize: 4 },
  { symbol: 'BOOM1000', name: 'Boom 1000 Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'CRASH1000', name: 'Crash 1000 Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'BOOM500', name: 'Boom 500 Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'CRASH500', name: 'Crash 500 Index', market: 'synthetic_indices', pipSize: 2 },
  { symbol: 'frxEURUSD', name: 'EUR/USD', market: 'forex', pipSize: 5 },
  { symbol: 'frxGBPUSD', name: 'GBP/USD', market: 'forex', pipSize: 5 },
  { symbol: 'frxUSDJPY', name: 'USD/JPY', market: 'forex', pipSize: 3 },
];

export const TRADE_TYPES = [
  { id: 'rise-fall' as TradeType, label: 'Rise/Fall', modes: ['CALL', 'PUT'] as ContractMode[] },
  { id: 'accumulator' as TradeType, label: 'Accumulators', modes: ['ACCU'] as ContractMode[] },
  { id: 'matches-differs' as TradeType, label: 'Matches/Differs', modes: ['DIGITMATCH', 'DIGITDIFF'] as ContractMode[] },
  { id: 'over-under' as TradeType, label: 'Over/Under', modes: ['DIGITOVER', 'DIGITUNDER'] as ContractMode[] },
  { id: 'even-odd' as TradeType, label: 'Even/Odd', modes: ['DIGITEVEN', 'DIGITODD'] as ContractMode[] },
];
