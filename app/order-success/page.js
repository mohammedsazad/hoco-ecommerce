 "use client";
import {useEffect,useState} from "react";
import Link from "next/link";
export default function Success(){
 const [order,setOrder]=useState(null);
 useEffect(()=>{try{setOrder(JSON.parse(localStorage.getItem("hoco_order")||"null"))}catch{}},[]);
 if(!order)return <main className="container empty"><h2>Order confirmation</h2><p>Open checkout to place a new order.</p><Link className="cta" href="/">Back to store</Link></main>;
 return <><header className="header"><div className="container"><div className="headrow"><Link href="/"><img className="logo" src="/hoco-logo.png" alt="HOCO"/></Link><b>Order Confirmation</b></div></div></header>
 <main className="container success-page">
  <div className="success-icon">✓</div><h1>Order placed successfully!</h1>
  <p className="muted">Thank you, {order.form.name}. Your HOCO order has been received.</p>
  <div className="order-box"><div><span>Order ID</span><b>{order.orderId}</b></div><div><span>Payment</span><b>{order.payment==="cod"?"Cash on Delivery":order.payment==="upi"?"UPI":"Card"}</b></div><div><span>Total</span><b>₹{order.total.toLocaleString()}</b></div></div>
  <div className="address-box"><h3>Delivery address</h3><p>{order.form.name}<br/>{order.form.address}<br/>{order.form.city}, {order.form.state} — {order.form.pincode}<br/>Mobile: {order.form.phone}</p></div>
  <div className="order-items">{order.items.map(p=><div className="summary-row" key={p.id}><span>{p.name}</span><b>₹{p.price.toLocaleString()}</b></div>)}</div>
  <Link className="cta" href="/">Continue shopping</Link>
 </main></>
