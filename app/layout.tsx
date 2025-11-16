import "./globals.css"; import NavBar from "./NavBar";
export const metadata={title:"TILERSHUB – Task Board",description:"Post and browse tasks"};
export default function RootLayout({children}){return(<html lang="en"><body className="bg-slate-950 text-slate-100 min-h-screen">
<NavBar/><div className="max-w-5xl mx-auto px-4 py-6">{children}</div></body></html>);}