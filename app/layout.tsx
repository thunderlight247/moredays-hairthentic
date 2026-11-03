import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BookingProvider } from "@/components/BookingModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "Moredays Hairthentic | Natural Hair, Braids & Wigs — Teshie, Accra", description: "Elite protective styling, braids and custom wigs in Teshie Tebibianor, Accra." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll><BookingProvider><Header /><main>{children}</main><Footer /></BookingProvider></SmoothScroll>
      </body>
    </html>
  );
}
