"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useBooking } from "./BookingModal";

const LINKS = [["/", "Home"], ["/services", "Services"], ["/lookbook", "Lookbook"], ["/contact", "Visit"]];
export default function Header() {
  const p = usePathname(); const { open } = useBooking(); const [m, setM] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-espresso/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight">Moredays <span className="text-bronze">Hairthentic</span></Link>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map(([h, l]) => <Link key={h} href={h} className={`text-sm transition hover:text-bronze ${p === h ? "border-b border-gold" : ""}`}>{l}</Link>)}
          <button onClick={open} className="rounded-full bg-espresso px-5 py-2 text-sm text-cream ring-1 ring-gold/60 hover:bg-bronze">Book</button>
        </nav>
        <button className="md:hidden" onClick={() => setM(!m)} aria-label="Menu">{m ? <X /> : <Menu />}</button>
      </div>
      {m && <div className="flex flex-col gap-4 border-t border-espresso/5 bg-cream px-5 py-5 md:hidden">
        {LINKS.map(([h, l]) => <Link key={h} href={h} onClick={() => setM(false)} className="font-serif text-xl">{l}</Link>)}
        <button onClick={() => { setM(false); open(); }} className="rounded-full bg-espresso py-3 text-cream">Book Appointment</button>
      </div>}
    </header>
  );
}
