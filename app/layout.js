import "./globals.css";

export const metadata = {
  title: "HOCO — Shop Smarter",
  description: "HOCO modern e-commerce experience"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}