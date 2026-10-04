"use client";
import {useMemo,useState} from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import {products,categories} from "../lib/products";
import Link from "next/link";
export default function Home(){
 const [q,setQ]=useState(""); const [cat,setCat]=useState("");
 const filtered=useMemo(()=>products.filter(p=>(!q||p.name.toLowerCase().includes(q.toLowerCase())||p.category.toLowerCase().includes(q.toLowerCase()))&&(!cat||p.category===cat)),[q,cat]);
 return <><Header onSearch={setQ}/><main className="container">
 <section className="hero"><div className="hero-main"><div className="eyebrow">HOCO official shopping</div><h1>Great products.<br/><span style={{color:"#ffcf00"}}>Better prices.</span></h1><p>Discover everyday tech and accessories with deals, product videos and a smarter shopping experience.</p><Link className="cta" href="#products">Shop deals →</Link></div><div className="hero-side"><span className="tag">TODAY'S SPECIAL</span><strong>Up to 40% OFF</strong><span>Limited-time offers on selected HOCO products.</span><Link className="pill" href="#products">Explore offers</Link></div></section>
 <section className="section"><div className="section-head"><h2>Shop by category</h2><span className="muted">Everything in one place</span></div><div className="cats">{categories.map(([icon,name])=><button className="cat" key={name} onClick={()=>setCat(name)}><span className="emoji">{icon}</span>{name}</button>)}</div></section>
 <section className="section" id="products"><div className="section-head"><div><h2>{q?`Results for “${q}”`:cat||"Popular products"}</h2><span className="muted">{filtered.length} products</span></div><button className="pill" onClick={()=>{setQ("");setCat("")}}>Clear filters</button></div><div className="products">{filtered.map(p=><ProductCard key={p.id} p={p}/>)}</div>{!filtered.length&&<div className="empty">No products found.</div>}</section>
 <section className="section"><div className="section-head"><h2>Personalized for you</h2><span className="muted">Based on what you view and search</span></div><div className="products">{products.slice(4,8).map(p=><ProductCard key={p.id} p={p}/>)}</div></section>
 </main><footer className="footer"><div className="container footergrid"><div><img className="logo" src="/hoco-logo.png" alt="HOCO"/><p>Smart shopping for modern tech and accessories.</p></div><div><b>Shop</b><p>Audio<br/>Wearables<br/>Charging</p></div><div><b>Help</b><p>Contact<br/>Shipping<br/>Returns</p></div><div><b>Account</b><p>Login<br/>Orders<br/>Wishlist</p></div></div></footer></>
}