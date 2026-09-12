'use client';
import { useState } from 'react';

export default function Page() {
  const [view, setView] = useState<'landing' | 'trading'>('landing');
  const [activeTab, setActiveTab] = useState('Free Bots');

  if (view === 'trading') {
    return (
      <div className="min-h-screen bg-[#f3f6fb] text-black">
        {/* Top Bar */}
        <div className="bg-[#0e1b3a] text-white p-2 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">🏠</div>
            <span className="truncate">dollarprinter.com/#trading...</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-[#7c3aed] px-3 py-1 rounded-full text-xs">Deposit</button>
            <div className="bg-white text-black px-2 py-1 rounded text-xs font-bold">0.00 KES</div>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="bg-[#0e1b3a] text-white flex overflow-x-auto gap-1 p-1 text-[11px] whitespace-nowrap scrollbar-hide">
          {['Dashboard','Bot Builder','Charts','Trading Bots','Bulk Trade','Scanner','Analysis Tool','Reports','Risk Calculator','Copy Trading','DTrader','TradingView'].map(t => (
            <span key={t} className="px-3 py-1.5 rounded bg-[#1c2f5a]">{t}</span>
          ))}
        </div>

        <div className="bg-white p-2 flex gap-2 overflow-x-auto text-[11px]">
          {['Free Bots','Bots Store','Scalper Bots','SpeedB'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 border rounded ${activeTab===tab? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200'}`}>{tab}</button>
          ))}
        </div>

        {/* Search */}
        <div className="p-3">
          <input placeholder="Search bots..." className="w-full border rounded-lg p-2.5 text-sm" />
        </div>

        {/* Bot Cards */}
        <div className="p-3 space-y-3 pb-24">
          {[
            {name:'Alpha Version 2026 Edition', desc:'Alpha Version 2026 Edition - Premium trading bot with cutting-edge 2026 algorithms. Features advanced market analysis and automated...'},
            {name:'AI SIGNAL SCANNER', desc:'AI Signal Scanner - Intelligent market scanner that detects high-probability setups and automated trade execution with built-in risk...'},
            {name:'Binary Expert V6 pro', desc:'Binary Expert V6 Pro - Professional-grade binary trading bot with expert-level strategies and high-speed signal processing.'},
            {name:'DOLLAR PRINTER BOT11', desc:'Professional Dollar bot version 11. Designed for consistent profits and advanced risk management.'},
            {name:'SignalSniper AutoBot (1)', desc:'Signal Sniper AutoBot - Automated signal detection and execution. Captures trading opportunities instantly with intelligent pattern...'},
          ].map((bot,i) => (
            <div key={i} className="bg-white border rounded-xl p-3 shadow-sm relative">
              <div className="absolute top-2 right-2 bg-[#d4a017] text-[9px] px-2 py-0.5 rounded font-bold">PREMIUM</div>
              <div className="flex items-center gap-2 font-bold text-sm"><span className="text-lg">🤖</span> {bot.name}</div>
              <div className="flex text-yellow-400 text-xs my-1">★★★★★</div>
              <div className="text-[11px] text-gray-500 line-clamp-2">{bot.desc}</div>
              <button className="w-full mt-3 bg-[#1e3a8a] text-white rounded-full py-2.5 text-xs font-bold">LOAD PREMIUM BOT</button>
            </div>
          ))}
        </div>

        {/* Bottom Run Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#eef2ff] border-t p-2 flex justify-between items-center">
          <button className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-[10px]">Risk Disclaimer</button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-xs"><span className="bg-white rounded-full p-1">▶</span> Run</button>
            <span className="text-[10px] text-gray-500">Bot is not running</span>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-red-500 text-white text-[10px] font-bold">GEMINI</button>
            <button className="w-8 h-8 rounded-full bg-[#c4b5fd] flex items-center justify-center">AI</button>
          </div>
        </div>
      </div>
    );
  }

  // LANDING PAGE
  return (
    <div className="min-h-screen bg-[#0a0f24] text-white overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="font-bold text-lg"><span className="text-red-500">Dollar</span><span className="text-cyan-400">printer</span></div>
        <button onClick={() => setView('trading')} className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">Login Now →</button>
      </div>

      <div className="flex justify-center mt-2">
        <div className="border border-pink-500/30 rounded-full px-4 py-1.5 text-[11px] flex items-center gap-2 bg-white/5">
          <span className="text-cyan-400">⚡</span> Trusted by 50,000+ Traders Worldwide
        </div>
      </div>

      <div className="h-[30vh]"></div>

      <div className="flex flex-col items-center gap-3 px-6">
        <button onClick={() => setView('trading')} className="w-[230px] bg-gradient-to-r from-red-500 to-blue-400 rounded-full py-3.5 font-bold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          Start Trading Now <span>→</span>
        </button>
        <button onClick={() => setView('trading')} className="w-[210px] bg-gradient-to-r from-yellow-400 to-cyan-400 p-[2px] rounded-full">
          <div className="bg-[#0a0f24] rounded-full py-2.5 text-sm font-bold text-yellow-200">Old Account Login</div>
        </button>
        <button onClick={() => setView('trading')} className="w-[140px] bg-gradient-to-r from-red-500 to-blue-400 p-[2px] rounded-full">
          <div className="bg-[#0a0f24] rounded-full py-2 text-sm font-bold">Sign Up</div>
        </button>

        <div className="flex gap-4 text-[11px] mt-3 text-gray-300">
          <span className="flex items-center gap-1"><span className="text-cyan-400">✓</span> No Credit Card Required</span>
          <span className="flex items-center gap-1"><span className="text-cyan-400">✓</span> $10,000 Virtual Account</span>
        </div>
      </div>

      {/* Testimonial */}
      <div className="px-6 mt-10 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/50 to-blue-500/50 flex items-center justify-center font-bold border border-white/20 backdrop-blur">DG</div>
        <div className="bg-[#121a33] border border-white/10 rounded-[24px] p-6 pt-10 text-center">
          <p className="text-[13px] italic text-gray-300 leading-relaxed">"Lightning-fast execution and professional-grade tools. The risk management features saved me from major losses."</p>
          <div className="mt-4 font-bold">Delvoux Glen</div>
          <div className="text-cyan-400 text-xs">Forex Specialist</div>
          <div className="text-yellow-400 mt-2">★ ★ ★ ★ ★</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 px-10 mt-8 pb-20">
        <div className="text-center"><div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 mx-auto flex items-center justify-center text-red-400 font-bold text-sm">50K+</div><div className="text-[10px] mt-2 text-gray-400">Active Traders</div></div>
        <div className="text-center"><div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 mx-auto flex items-center justify-center text-red-400 font-bold text-sm">$2.5B+</div><div className="text-[10px] mt-2 text-gray-400">Trading Volume</div></div>
        <div className="text-center"><div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 mx-auto flex items-center justify-center text-red-400 font-bold text-sm">99.9%</div><div className="text-[10px] mt-2 text-gray-400">Uptime</div></div>
        <div className="text-center"><div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 mx-auto flex items-center justify-center text-red-400 font-bold text-sm">150+</div><div className="text-[10px] mt-2 text-gray-400">Trading Pairs</div></div>
      </div>
    </div>
  );
}
