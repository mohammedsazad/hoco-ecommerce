 "use client";
import Link from "next/link";
import {useState} from "react";
export default function Header({onSearch}) {
 const [q,setQ]=useState("");
 function submit(e){e.preventDefault(); onSearch?.(q)}
 return <><div className="topbar"><div className="container"><span>Welcome to HOCO</span><span>Free delivery on selected orders • Secure checkout</span></div></div>
 <header className="header"><div className="container"><div className="headrow">
 <Link href="/"><img className="logo" src="/hoco-logo.png" alt="HOCO"/></Link>
 <form className="search" onSubmit={submit}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products, brands and categories..."/><button>Search</button></form>
 <div className="head-actions"><Link className="pill" href="/login">👤 <span>Account</span></Link><Link className="pill" href="/">🛒 <span>Cart</span></Link></div>
 </div><nav className="nav"><Link href="/">All</Link><Link href="/?cat=Audio">Audio</Link><Link href="/?cat=Wearables">Wearables</Link><Link href="/?cat=Charging">Charging</Link><Link href="/?cat=Accessories">Accessories</Link><Link href="/?cat=Gaming">Gaming</Link><Link href="/admin">Admin</Link></nav></div></header></>
}