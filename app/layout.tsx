import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BookingProvider } from "@/components/BookingModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Moredays Hairthentic | Natural Hair, Braids & Wigs — Teshie Tebibianor, Accra",
  description:
    "Elite protective styling, flawless braids, custom wigs and natural hair care in Teshie Tebibianor, Accra, Ghana. Book your appointment or chat on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased bg-cream text-espresso selection:bg-gold selection:text-espresso">
        <SmoothScroll>
          <BookingProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
