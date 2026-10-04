"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Success() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("hoco_order");

      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch (error) {
      console.error("Could not load order:", error);
    }
  }, []);

  if (!order) {
    return (
      <main className="container empty">
        <h2>Order confirmation</h2>
        <p>We could not find your order.</p>
        <Link className="cta" href="/">
          Back to store
        </Link>
      </main>
    );
  }

  const paymentLabel =
    order.payment === "cod"
      ? "Cash on Delivery"
      : order.payment === "upi"
      ? "UPI"
      : "Card";

  return (
    <main className="container success-page">
      <div className="success-icon">✓</div>

      <h1>Order placed successfully!</h1>

      <p className="muted">
        Thank you, {order.form?.name || "Customer"}. Your HOCO order has been
        received.
      </p>

      <div className="order-box">
        <div className="summary-row">
          <span>Order ID</span>
          <b>{order.orderId}</b>
        </div>

        <div className="summary-row">
          <span>Payment</span>
          <b>{paymentLabel}</b>
        </div>

        <div className="summary-row">
          <span>Total</span>
          <b>
            ₹
            {Number(order.total || 0).toLocaleString("en-IN")}
          </b>
        </div>
      </div>

      <div className="address-box">
        <h3>Delivery address</h3>

        <p>
          <b>{order.form?.name}</b>
          <br />
          {order.form?.address}
          <br />
          {order.form?.city}, {order.form?.state} - {order.form?.pincode}
          <br />
          Mobile: {order.form?.phone}
        </p>
      </div>

      <div className="order-box">
        <h3>Ordered items</h3>

        {order.items?.map((product) => (
          <div className="summary-row" key={product.id}>
            <span>
              {product.name} × {product.quantity || 1}
            </span>

            <b>
              ₹
              {(
                Number(product.price || 0) * Number(product.quantity || 1)
              ).toLocaleString("en-IN")}
            </b>
          </div>
        ))}
      </div>

      <Link className="cta" href="/">
        Continue shopping
      </Link>
    </main>
  );
}
