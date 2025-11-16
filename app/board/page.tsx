"use client";import{useState,useEffect}from"react";import{supabase}from"@/lib/supabaseClient";
export default function Board(){const[tasks,setTasks]=useState([]);useEffect(()=>{(async()=>{const{data}=await supabase.from("tasks").select("*");setTasks(data||[]);})();},[]);
return(<main className="space-y-3"><h1 className="text-lg font-bold">Provider Board</h1>{tasks.map(t=><div key={t.id} className="border border-slate-700 p-3 rounded">
<h2 className="font-semibold">{t.title}</h2><p>{t.location} - {t.category}</p><p>{t.details}</p></div>)}</main>);}