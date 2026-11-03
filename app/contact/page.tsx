"use client";
import { MapPin, Clock, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/components/BookingModal";
import { ADDRESS, HOURS, PHONES, WA_NUMBER } from "@/lib/data";

export default function Contact() {
  const { open } = useBooking();
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-bronze">Location & booking</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Come as you are</h1>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Reveal className="rounded-3xl bg-espresso p-7 text-cream">
            <h2 className="flex items-center gap-2 font-serif text-2xl"><Clock className="text-gold" size={20} />Opening hours</h2>
            <dl className="mt-5 divide-y divide-cream/10">{HOURS.map(([d, t]) => (
              <div key={d} className="flex justify-between py-3 text-sm"><dt className="text-cream/70">{d}</dt><dd className={t === "Closed" ? "text-gold" : ""}>{t}</dd></div>))}</dl>
          </Reveal>
          <Reveal className="overflow-hidden rounded-3xl bg-alabaster">
            <div className="relative h-52 bg-[linear-gradient(#D4AF3722_1px,transparent_1px),linear-gradient(90deg,#D4AF3722_1px,transparent_1px)] bg-[size:28px_28px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none"><path d="M0 150 C120 120 200 60 400 90" stroke="#A8832A" strokeWidth="6" fill="none" opacity=".35" /><path d="M160 0 C170 80 210 140 230 200" stroke="#A8832A" strokeWidth="4" fill="none" opacity=".25" /></svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><span className="absolute inset-0 animate-ping rounded-full bg-gold/50" /><MapPin className="relative text-espresso" fill="#D4AF37" size={40} /></div>
            </div>
            <div className="p-6"><h2 className="font-serif text-2xl">Find us</h2><p className="mt-2 font-medium">{ADDRESS}</p><p className="text-sm text-bronze">Beside Original Don</p></div>
          </Reveal>
          <Reveal><img src="/images/work-5.jpg" alt="Moredays Hairthentic storefront" loading="lazy" className="h-64 w-full rounded-3xl object-cover" /></Reveal>
        </div>
        <Reveal className="h-fit rounded-3xl border border-gold/40 bg-cream p-8 shadow-xl shadow-gold/10 lg:sticky lg:top-28">
          <CalendarCheck className="text-bronze" size={30} />
          <h2 className="mt-4 font-serif text-4xl">Reserve your seat</h2>
          <ol className="mt-5 space-y-2 text-sm text-espresso/70"><li>1. Pick a service, date and time</li><li>2. Share your name and phone</li><li>3. Confirm instantly on WhatsApp</li></ol>
          <div className="mt-7"><ShimmerButton onClick={open} className="w-full">Book Appointment</ShimmerButton></div>
          <div className="mt-6 space-y-3 border-t border-espresso/10 pt-6 text-sm">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-bronze"><MessageCircle size={16} />WhatsApp {PHONES[0].label.split(" ")[0]} {PHONES[0].label.split(" ")[1]} {PHONES[0].label.split(" ")[2]}</a>
            {PHONES.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-3 hover:text-bronze"><Phone size={16} />{p.label}</a>)}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
