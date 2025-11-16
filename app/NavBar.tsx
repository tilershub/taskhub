"use client";
import Link from "next/link"; import {useState} from "react"; import {usePathname} from "next/navigation";
export default function NavBar(){const p=usePathname();const[o,s]=useState(false);
const a=h=>p===h?"text-amber-300":"text-slate-200 hover:text-amber-200";
return(<nav className="border-b border-slate-800 bg-slate-950/80"><div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
<Link href="/" className="flex items-center gap-2"><div className="h-7 w-7 rounded-md border border-amber-400/60 flex items-center justify-center text-[10px] font-semibold text-amber-300">TH</div>
<div className="leading-tight"><div className="text-xs tracking-[0.25em] uppercase text-slate-100"><span className="text-amber-400">TILERS</span>HUB</div>
<p className="text-[10px] text-slate-500">Tasks and providers board</p></div></Link>
<div className="hidden md:flex gap-4 text-xs"><Link href="/" className={a("/")}>Home</Link><Link href="/board" className={a("/board")}>Provider Board</Link></div>
<button onClick={()=>s(!o)} className="md:hidden border border-slate-700 bg-slate-900 px-2 py-1"><div className="space-y-0.5"><span className="block h-[2px] w-4 bg-slate-200"></span><span className="block h-[2px] w-4 bg-slate-200"></span><span className="block h-[2px] w-4 bg-slate-200"></span></div></button></div>
{o&&(<div className="md:hidden border-t border-slate-800 bg-slate-950"><div className="px-4 py-2 flex flex-col gap-1 text-xs">
<Link href="/" onClick={()=>s(false)} className={a("/")}>Home</Link>
<Link href="/board" onClick={()=>s(false)} className={a("/board")}>Provider Board</Link></div></div>)}</nav>);}
