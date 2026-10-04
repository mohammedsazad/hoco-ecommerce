# HOCO E-commerce Website — Fresh Prototype

A fresh Next.js prototype for the HOCO e-commerce concept.

## Included
- HOCO branding/logo
- Customer storefront
- Search and categories
- Product detail pages
- Product images and video playback
- Cart/wishlist UI
- Customer login UI
- Admin dashboard
- Admin product image upload UI
- Admin product video upload UI
- Orders/customers/discount/media dashboard sections
- Responsive design
- Vercel-ready

## Demo admin
Email: mohammed.azad@mitwpu.edu.in
Password: Mitwpu@12345

**Important:** These credentials are included only for the prototype. Do not use hard-coded credentials in a production application. Production authentication should use secure server-side auth, password hashing, sessions, MFA where appropriate, and environment/secret management.

## Run
npm install
npm run dev

## Production
npm run build
npm start

## Prototype limitation
Uploads are previewed locally in the browser and are not persisted to a database/storage service yet. The production version should use secure object storage and a backend/database.

### Checkout flow
Customer can add products to cart, enter name/mobile/full address/city/state/PIN, select Cash on Delivery, UPI or card, place the order, and see an order confirmation with order ID and delivery details. UPI/card are prototype selections; a production deployment should connect a real payment gateway such as Razorpay/Stripe with server-side verification.
