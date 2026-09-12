'use client';
import React from 'react';

export default function DigitsView({
  symbols, activeSymbol, selectSymbol,
  currentTick, lastDigit, digitStats,
  tradeType, setTradeType,
  contractMode, setContractMode,
  selectedDigit, setSelectedDigit,
  stake, setStake, duration, setDuration,
  proposal, buyContract, isBuying
}: any) {

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#111] text-white min-h-screen">

      {/* Symbol / Market Dropdown */}
      <select
        value={activeSymbol?.underlying_symbol || '1HZ100V'}
        onChange={(e) => selectSymbol(e.target.value)}
        className="w-full bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700"
      >
        <option value="1HZ100V">Volatility 100 (1s) Index</option>
        <option value="R_100">Volatility 100 Index</option>
        <option value="R_50">Volatility 50 Index</option>
        <option value="R_25">Volatility 25 Index</option>
        <option value="BOOM1000">Boom 1000 Index</option>
        <option value="CRASH1000">Crash 1000 Index</option>
        <option value="BOOM500">Boom 500 Index</option>
        <option value="CRASH500">Crash 500 Index</option>
        <option value="frxEURUSD">EUR/USD</option>
        <option value="frxGBPUSD">GBP/USD</option>
        <option value="frxUSDJPY">USD/JPY</option>
      </select>

      {/* Price */}
      <div className="text-center py-2">
        <div className="text-4xl font-bold tracking-wider">{currentTick?.quote?? '---'}</div>
        <div className="mt-2 text-sm opacity-70">Last Digit: <span className="bg-blue-600 px-3 py-1 rounded-full font-bold text-white">{lastDigit?? '-'}</span></div>
      </div>

      {/* NEW TRADE TYPE SELECTOR */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setTradeType('rise-fall')} className={`p-3 rounded-xl font-semibold border ${tradeType==='rise-fall'? 'bg-blue-600 border-blue-600' : 'bg-neutral-800 border-neutral-700'}`}>Rise/Fall</button>
        <button onClick={() => setTradeType('accumulator')} className={`p-3 rounded-xl font-semibold border ${tradeType==='accumulator'? 'bg-blue-600 border-blue-600' : 'bg-neutral-800 border-neutral-700'}`}>Accumulators</button>
        <button onClick={() => setTradeType('matches-differs')} className={`p-3 rounded-xl font-semibold border ${tradeType==='matches-differs'? 'bg-blue-600 border-blue-600' : 'bg-neutral-800 border-neutral-700'}`}>Matches/Differs</button>
        <button onClick={() => setTradeType('over-under')} className={`p-3 rounded-xl font-semibold border ${tradeType==='over-under'? 'bg-blue-600 border-blue-600' : 'bg-neutral-800 border-neutral-700'}`}>Over/Under</button>
        <button onClick={() => setTradeType('even-odd')} className={`p-3 rounded-xl col-span-2 font-semibold border ${tradeType==='even-odd'? 'bg-blue-600 border-blue-600' : 'bg-neutral-800 border-neutral-700'}`}>Even/Odd</button>
      </div>

      {/* RISE FALL PANEL */}
      {tradeType === 'rise-fall' && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button onClick={() => setContractMode('CALL')} className={`p-5 rounded-xl font-bold text-lg ${contractMode==='CALL'? 'bg-green-600' : 'bg-neutral-800 border border-neutral-700'}`}>Rise ↑</button>
          <button onClick={() => setContractMode('PUT')} className={`p-5 rounded-xl font-bold text-lg ${contractMode==='PUT'? 'bg-red-600' : 'bg-neutral-800 border border-neutral-700'}`}>Fall ↓</button>
        </div>
      )}

      {/* ACCUMULATOR PANEL */}
      {tradeType === 'accumulator' && (
        <div className="bg-neutral-800 p-4 rounded-xl text-center border border-neutral-700">
          <div className="text-sm opacity-70">Growth Rate</div>
          <div className="text-3xl font-bold text-green-400 mt-1">4%</div>
          <div className="text-xs mt-2 opacity-60">Grows every tick. Closes if it hits a barrier. You can Take Profit anytime.</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-neutral-900 p-2 rounded-lg">Max Ticks: ∞</div>
            <div className="bg-neutral-900 p-2 rounded-lg">Protection: No</div>
          </div>
        </div>
      )}

      {/* DIGITS PANEL */}
      {(tradeType === 'matches-differs' || tradeType === 'over-under' || tradeType === 'even-odd') && (
        <>
          <div className="text-sm opacity-70 mt-2">Last digit prediction</div>
          <div className="grid grid-cols-5 gap-2">
            {[0,1,2,3,4,5,6,7,8,9].map((d) => (
              <button key={d} onClick={() => setSelectedDigit(d)} className={`p-3 rounded-xl flex flex-col items-center ${selectedDigit===d? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>
                <span className="font-bold text-lg">{d}</span>
                <span className="text-[11px] opacity-60">{digitStats?.[d]?.toFixed(1)?? '-'}%</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tradeType==='matches-differs' && <>
              <button onClick={() => setContractMode('DIGITMATCH')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITMATCH'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Matches</button>
              <button onClick={() => setContractMode('DIGITDIFF')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITDIFF'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Differs</button>
            </>}
            {tradeType==='over-under' && <>
              <button onClick={() => setContractMode('DIGITOVER')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITOVER'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Over</button>
              <button onClick={() => setContractMode('DIGITUNDER')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITUNDER'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Under</button>
            </>}
            {tradeType==='even-odd' && <>
              <button onClick={() => setContractMode('DIGITEVEN')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITEVEN'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Even</button>
              <button onClick={() => setContractMode('DIGITODD')} className={`p-3 rounded-full font-semibold ${contractMode==='DIGITODD'? 'bg-blue-600' : 'bg-neutral-800 border border-neutral-700'}`}>Odd</button>
            </>}
          </div>
        </>
      )}

      {/* Stake & Duration */}
      <div className="mt-2">
        <div className="text-sm mb-1 opacity-70">Stake</div>
        <div className="flex">
          <input value={stake} onChange={(e) => setStake(e.target.value)} className="w-full bg-neutral-900 p-3 rounded-xl border border-neutral-700" placeholder="10" />
          <span className="ml-[-60px] flex items-center opacity-50">USD</span>
        </div>
      </div>
      {contractMode!== 'ACCU' && (
        <div>
          <div className="text-sm mb-1 opacity-70">Duration</div>
          <div className="flex">
            <input value={duration} onChange={(e) => setDuration(Number(e.target.value))} type="number" className="w-full bg-neutral-900 p-3 rounded-xl border border-neutral-700" />
            <span className="ml-[-60px] flex items-center opacity-50">Ticks</span>
          </div>
        </div>
      )}

      {/* Prediction text */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm">
        <div className="opacity-60">Prediction</div>
        <div className="mt-1">Last digit will <span className="text-blue-400 font-bold">{contractMode}</span> {needsBarrier? selectedDigit : ''}</div>
        <div className="mt-1 flex justify-between"><span className="opacity-60">Payout</span><span className="font-bold">{proposal?.payout? `${proposal.payout} USD` : '--'}</span></div>
      </div>

      <button onClick={buyContract} disabled={isBuying} className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-full font-bold text-lg mt-2 disabled:opacity-50">
        {isBuying? 'Buying...' : `Buy @ ${stake || '0'}.00 USD`}
      </button>
    </div>
  );
}

function needsBarrier(mode?: string) {
  return ['DIGITMATCH','DIGITDIFF','DIGITOVER','DIGITUNDER'].includes(mode || '');
}
