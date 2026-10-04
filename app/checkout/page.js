"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "../../lib/products";

export default function Checkout() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("hoco_cart") || "[]"
      );

      const items = savedCart
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean);

      setCart(items);
    } catch (error) {
      console.error("Unable to load cart:", error);
      setCart([]);
    }
  }, []);

  const subtotal = cart.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 49;

  const total = subtotal + shipping;

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function placeOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    const orderId = "HOCO" + Date.now();

    const order = {
      orderId,
      items: cart,
      form,
      payment,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("hoco_order", JSON.stringify(order));
    localStorage.removeItem("hoco_cart");

    router.push("/order-success");
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-row">
            <Link href="/" className="logo">
              <img
                src="/hoco-logo.png"
                alt="HOCO"
              />
            </Link>

            <Link href="/" className="secure-checkout">
              Secure Checkout
            </Link>
          </div>
        </div>
      </header>

      <main className="container checkout-container">
        <h1>Checkout</h1>

        {cart.length === 0 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <p>Add some products before checking out.</p>

            <Link href="/" className="cta">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="checkout-grid">
            <form
              className="checkout-card"
              onSubmit={placeOrder}
            >
              <h2>Delivery Address</h2>

              <div className="field">
                <label>Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="field">
                <label>Mobile Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div className="field">
                <label>Full Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={change}
                  required
                  placeholder="House no., street, area"
                  rows="3"
                />
              </div>

              <div className="two-column">
                <div className="field">
                  <label>City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={change}
                    required
                    placeholder="City"
                  />
                </div>

                <div className="field">
                  <label>State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={change}
                    required
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="field">
                <label>PIN Code</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={change}
                  required
                  pattern="[0-9]{6}"
                  placeholder="6-digit PIN code"
                />
              </div>

              <h2>Payment Method</h2>

              <div className="payment-options">
                <label className="pay-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives</small>
                  </span>
                </label>

                <label className="pay-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={payment === "upi"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>
                    <strong>UPI</strong>
                    <small>Pay using UPI</small>
                  </span>
                </label>

                <label className="pay-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <span>
                    <strong>Card</strong>
                    <small>Credit / Debit Card</small>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="primary"
              >
                Place Order • ₹{total.toLocaleString("en-IN")}
              </button>
            </form>

            <aside className="checkout-summary">
              <h2>Order Summary</h2>

              {cart.map((product) => (
                <div
                  className="summary-row"
                  key={product.id}
                >
                  <span>{product.name}</span>
                  <b>
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </b>
                </div>
              ))}

              <hr />

              <div className="summary-row">
                <span>Subtotal</span>
                <b>
                  ₹{subtotal.toLocaleString("en-IN")}
                </b>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <b>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </b>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <b>
                  ₹{total.toLocaleString("en-IN")}
                </b>
              </div>

              <p className="muted">
                Your address and order details will be
                shown on the order confirmation page.
              </p>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
