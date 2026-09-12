"use client"
import { useState } from "react"
export default function Page(){
 const [bot,setBot]=useState("")
 const load=(name:string)=>{
  setBot(name)
  alert("Loading "+name+"... Connecting to Deriv!")
 }
 return(
  <div style={{background:"#0a0e1a",minHeight:"100vh",color:"white",padding:16}}>
   <h1 style={{fontSize:24,fontWeight:"bold"}}><span style={{color:"red"}}>Dollar</span><span style={{color:"cyan"}}>printer</span></h1>
   <input placeholder="Search bots..." style={{width:"100%",background:"#1a1f2e",padding:12,borderRadius:8,marginTop:12}}/>
   {["Alpha Version 2026 Edition","AI SIGNAL SCANNER","Binary Expert V6 pro","DOLLAR PRINTER BOT11"].map(n=>(
    <div key={n} style={{background:"white",color:"black",padding:16,borderRadius:12,marginTop:12}}>
     <b>🤖 {n}</b><p>⭐⭐⭐⭐⭐</p>
     <button onClick={()=>load(n)} style={{width:"100%",background:"#0a2a7a",color:"white",padding:12,borderRadius:20,marginTop:8,fontWeight:"bold"}}>
      {bot===n?"LOADING...":"LOAD PREMIUM BOT"}
     </button>
    </div>
   ))}
  </div>
 )
}
