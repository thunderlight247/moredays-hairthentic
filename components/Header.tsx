"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, MessageCircle, Phone, MapPin } from "lucide-react";
import { useBooking } from "./BookingModal";
import { WA_NUMBER, CALL_NUMBER, CALL_LABEL, getWhatsAppApiLink } from "@/lib/data";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services & Styles" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/contact", label: "Location & Visit" },
];

export default function Header() {
  const pathname = usePathname();
  const { open } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const waUrl = getWhatsAppApiLink("Hello Moredays Hairthentic! I would like to inquire about your hair services.");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-tight text-espresso transition group-hover:text-bronze md:text-3xl">
            Moredays <span className="font-serif text-bronze italic">Hairthentic</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-espresso/50">
            Teshie Tebibianor · Accra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition ${
                  isActive ? "text-bronze font-semibold" : "text-espresso/70 hover:text-espresso"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gold" />
                )}
              </Link>
            );
          })}

          {/* Quick WhatsApp Action (059 627 1289) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp: 059 627 1289"
            className="flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-1.5 text-xs font-semibold text-[#15803d] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>

          {/* Book Appointment CTA */}
          <button
            onClick={() => open()}
            className="rounded-full bg-espresso px-5 py-2 text-sm font-medium text-cream shadow-sm ring-1 ring-gold/40 transition hover:bg-bronze hover:shadow-md active:scale-95"
          >
            Book Appointment
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm"
          >
            <MessageCircle size={18} />
          </a>
          <button
            className="rounded-xl border border-espresso/10 p-2 text-espresso hover:bg-espresso/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-espresso/10 bg-cream px-5 py-6 shadow-xl md:hidden animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 font-serif text-xl transition ${
                    isActive ? "bg-espresso text-cream" : "text-espresso hover:bg-espresso/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-3 border-t border-espresso/10 pt-5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                open();
              }}
              className="w-full rounded-full bg-espresso py-3.5 text-center font-medium text-cream shadow-md"
            >
              Book Appointment
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white shadow-sm"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp: 059 627 1289
            </a>

            <div className="mt-2 flex items-center justify-between px-2 text-xs text-espresso/70">
              <a href={`tel:${CALL_NUMBER}`} className="flex items-center gap-1.5 hover:text-bronze">
                <Phone size={13} />
                Call {CALL_LABEL}
              </a>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1 hover:text-bronze">
                <MapPin size={13} />
                Teshie Tebibianor
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
