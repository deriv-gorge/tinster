"use client"
import { useState } from "react"

export default function Page(){
 const [logged,setLogged]=useState(false)
 const [market,setMarket]=useState("Volatility 100 Index")
 const [bot,setBot]=useState("")

 const markets = ["Volatility 100 Index","Volatility 75 Index","Crash 500","Boom 500","EUR/USD"]

 return(
  <div style={{background:"#0a0e1a",minHeight:"100vh",color:"white",padding:16}}>
   {/* HEADER */}
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    <h1 style={{fontSize:26,fontWeight:"bold"}}><span style={{color:"red"}}>Dollar</span><span style={{color:"cyan"}}>printer</span></h1>
    <button onClick={()=>setLogged(!logged)} style={{background:logged?"green":"#1e3a8a",padding:"8px 16px",borderRadius:20,fontSize:12}}>
     {logged?"✓ Logged In":"Login"}
    </button>
   </div>

   {/* MARKET SELECTOR */}
   <div style={{marginTop:12,background:"#1a1f2e",padding:12,borderRadius:8}}>
    <label style={{fontSize:12,opacity:0.7}}>SELECT MARKET</label>
    <select value={market} onChange={e=>setMarket(e.target.value)} style={{width:"100%",background:"black",padding:8,borderRadius:6,marginTop:4}}>
     {markets.map(m=><option key={m}>{m}</option>)}
    </select>
    <div style={{marginTop:8,fontSize:11,color:"cyan"}}>📈 {market} • Live Price: Loading...</div>
   </div>

   {/* TRADING CHART */}
   <div style={{marginTop:12,height:200,background:"white",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"black"}}>
    <iframe src="https://s.tradingview.com/widgetembed/?symbol=DERIV%2FVIX100&interval=1&theme=dark" style={{width:"100%",height:"100%",border:0,borderRadius:12}}></iframe>
   </div>

   {/* BOTS */}
   <input placeholder="Search bots..." style={{width:"100%",background:"#1a1f2e",padding:12,borderRadius:8,marginTop:12}}/>
   {["Alpha Version 2026 Edition","AI SIGNAL SCANNER","Binary Expert V6 pro","DOLLAR PRINTER BOT11"].map(n=>(
    <div key={n} style={{background:"white",color:"black",padding:16,borderRadius:12,marginTop:12}}>
     <b>🤖 {n}</b><p>⭐⭐⭐⭐⭐</p><p style={{fontSize:11,color:"gray"}}>{market} • Auto Trading</p>
     <button onClick={()=>{setBot(n); if(!logged) alert("Please Login First!"); else alert(n+" Started on "+market)}} style={{width:"100%",background:logged?"#0a2a7a":"gray",color:"white",padding:12,borderRadius:20,marginTop:8,fontWeight:"bold"}}>
      {bot===n?"LOADING...":"LOAD PREMIUM BOT"}
     </button>
    </div>
   ))}

   {!logged && <div style={{marginTop:16,background:"yellow",color:"black",padding:12,borderRadius:8,textAlign:"center",fontSize:12}}>⚠️ Please Login to Deriv to start trading</div>}
  </div>
 )
}
