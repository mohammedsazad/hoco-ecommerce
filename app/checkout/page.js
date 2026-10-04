 "use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {products} from "../../lib/products";

export default function Checkout(){
  const router=useRouter();
  const [cart,setCart]=useState([]);
  const [payment,setPayment]=useState("cod");
  const [placed,setPlaced]=useState(false);
  const [form,setForm]=useState({name:"",phone:"",address:"",city:"",state:"",pincode:""});
  useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem("hoco_cart")||"[]"))}catch{}},[]);
  const items=cart.map(id=>products.find(p=>p.id===id)).filter(Boolean);
  const subtotal=items.reduce((s,p)=>s+p.price,0);
  const shipping=subtotal>=999||subtotal===0?0:49;
  const total=subtotal+shipping;

  function change(e){setForm({...form,[e.target.name]:e.target.value})}
  function place(e){
    e.preventDefault();
    if(!items.length){alert("Your cart is empty.");return}
    localStorage.setItem("hoco_order",JSON.stringify({items,form,payment,total,orderId:"HOCO"+Date.now()}));
    localStorage.removeItem("hoco_cart");
    router.push("/order-success");
  }

  return <><header className="header"><div className="container"><div className="headrow">
    <Link href="/"><img className="logo" src="/hoco-logo.png" alt="HOCO"/></Link>
    <strong>Secure Checkout</strong>
  </div></div></header>
  <main className="container">
    <div className="checkout-grid">
      <form className="checkout-card" onSubmit={place}>
        <h1>Checkout</h1>
        <h3>1. Delivery address</h3>
        <div className="two"><div className="field"><label>Full name</label><input required name="name" value={form.name} onChange={change}/></div><div className="field"><label>Mobile number</label><input required pattern="[0-9]{10}" name="phone" value={form.phone} onChange={change}/></div></div>
        <div className="field"><label>House / Street / Area</label><input required name="address" value={form.address} onChange={change}/></div>
        <div className="two"><div className="field"><label>City</label><input required name="city" value={form.city} onChange={change}/></div><div className="field"><label>State</label><input required name="state" value={form.state} onChange={change}/></div></div>
        <div className="field"><label>PIN code</label><input required pattern="[0-9]{6}" name="pincode" value={form.pincode} onChange={change}/></div>

        <h3>2. Payment method</h3>
        <label className="pay-option"><input type="radio" checked={payment==="cod"} onChange={()=>setPayment("cod")}/> <b>Cash on Delivery</b><span>Pay when your order arrives</span></label>
        <label className="pay-option"><input type="radio" checked={payment==="upi"} onChange={()=>setPayment("upi")}/> <b>UPI</b><span>Production version will open the secure payment gateway</span></label>
        <label className="pay-option"><input type="radio" checked={payment==="card"} onChange={()=>setPayment("card")}/> <b>Credit / Debit Card</b><span>Production version will use a secure payment gateway</span></label>
        <button className="primary" type="submit">Place Order • ₹{total.toLocaleString()}</button>
      </form>

      <aside className="checkout-card summary">
        <h2>Order summary</h2>
        {items.map(p=><div className="summary-row" key={p.id}><span>{p.name}</span><b>₹{p.price.toLocaleString()}</b></div>)}
        <hr/>
        <div className="summary-row"><span>Subtotal</span><b>₹{subtotal.toLocaleString()}</b></div>
        <div className="summary-row"><span>Delivery</span><b>{shipping?"₹49":"FREE"}</b></div>
        <div className="summary-total"><span>Total</span><b>₹{total.toLocaleString()}</b></div>
        <p className="muted">Your address and order details will be shown on the confirmation page.</p>
      </aside>
    </div>
  </main></>
