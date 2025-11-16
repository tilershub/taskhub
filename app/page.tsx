"use client"; import {useState,useEffect} from "react"; import {supabase} from "@/lib/supabaseClient";
const cats=["Tiling","Bathroom","Ceiling","Carpentry","Masonry","Glass Work","Plumbing","Electrical","Slab Work","Architectural Design","Other"];
export default function Page(){const[tasks,setTasks]=useState([]);const[l,setL]=useState(true);
const[T,setT]=useState("");const[C,setC]=useState("");const[Lc,setLc]=useState("");const[B,setB]=useState("");const[D,setD]=useState("");const[ct,setCt]=useState("");const[f,setF]=useState(null);
const[fc,setFc]=useState("All");const[sr,setSr]=useState("");
useEffect(()=>{(async()=>{const{data}=await supabase.from("tasks").select("*").order("created_at",{ascending:false});setTasks(data||[]);setL(false);})();},[]);
async function submit(e){e.preventDefault();let url=null;
if(f){const ext=f.name.split(".").pop();const name=Date.now()+"."+ext;const path="tasks/"+name;
await supabase.storage.from("task-images").upload(path,f);url=supabase.storage.from("task-images").getPublicUrl(path).data.publicUrl;}
const{data}=await supabase.from("tasks").insert([{title:T,category:C,location:Lc,budget:B||null,details:D,contact:ct||null,image_url:url}]).select().single();
if(data)setTasks([data,...tasks]);setT("");setC("");setLc("");setB("");setD("");setCt("");setF(null);}
const F=tasks.filter(x=>(fc==="All"||x.category===fc)&&(!sr||(x.title+x.location+x.details).toLowerCase().includes(sr.toLowerCase())));
return(<main className="space-y-4">
<h1 className="text-xl font-bold text-slate-100">Post Task</h1>
<form onSubmit={submit} className="space-y-2 p-4 border border-slate-800 rounded">
<input placeholder="Title" value={T} onChange={e=>setT(e.target.value)} className="p-2 w-full text-black"/>
<select value={C} onChange={e=>setC(e.target.value)} className="p-2 w-full text-black"><option value="">Category</option>{cats.map(c=><option key={c}>{c}</option>)}</select>
<input placeholder="Location" value={Lc} onChange={e=>setLc(e.target.value)} className="p-2 w-full text-black"/>
<input placeholder="Budget" value={B} onChange={e=>setB(e.target.value)} className="p-2 w-full text-black"/>
<textarea placeholder="Details" value={D} onChange={e=>setD(e.target.value)} className="p-2 w-full text-black"/>
<input placeholder="Contact" value={ct} onChange={e=>setCt(e.target.value)} className="p-2 w-full text-black"/>
<input type="file" onChange={e=>setF(e.target.files[0])} />
<button className="bg-amber-400 px-4 py-2 text-black rounded">Post</button>
</form>
<select value={fc} onChange={e=>setFc(e.target.value)} className="p-2 text-black"><option>All</option>{cats.map(c=><option key={c}>{c}</option>)}</select>
<input placeholder="Search" value={sr} onChange={e=>setSr(e.target.value)} className="p-2 text-black w-full"/>
<div className="space-y-2">{F.map(t=><div key={t.id} className="border border-slate-700 p-3 rounded">
<h2 className="font-semibold">{t.title}</h2><p>{t.location} - {t.category}</p><p>{t.details}</p>{t.image_url&&<img src={t.image_url} className="w-32"/>}
</div>)}</div>
</main>);}