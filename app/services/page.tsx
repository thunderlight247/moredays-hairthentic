"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Info } from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";
import { useBooking } from "@/components/BookingModal";
import { CATEGORIES, SERVICES } from "@/lib/data";

export default function Services() {
  const [tab, setTab] = useState(CATEGORIES[0]); const { open } = useBooking();
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-bronze">Services & Prices</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Crafted with time</h1>
      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gold/40 bg-gold/10 p-5">
        <Info className="mt-0.5 shrink-0 text-bronze" />
        <p className="text-sm leading-relaxed"><b>Before you arrive:</b> please come with your hair detangled, or add a <b>Wash &amp; Stretch</b> package when you reserve. It saves time and keeps your style neat.</p>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setTab(c)} className={`relative rounded-full px-5 py-2.5 text-sm ${tab === c ? "text-cream" : "hover:text-bronze"}`}>
            {tab === c && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-espresso" />}<span className="relative">{c}</span>
          </button>))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 divide-y divide-espresso/10 rounded-3xl bg-alabaster">
          {SERVICES[tab].items.map((s) => (
            <div key={s.name} className="flex flex-wrap items-center justify-between gap-3 p-6">
              <div><h3 className="font-serif text-2xl">{s.name}</h3><p className="text-sm text-espresso/60">{s.note}</p></div>
              <div className="text-right"><p className="flex items-center justify-end gap-1.5 text-sm text-bronze"><Clock size={14} />{s.time}</p><p className="text-xs text-espresso/50">Price on consultation</p></div>
            </div>))}
        </motion.div>
      </AnimatePresence>
      <p className="mt-4 text-xs text-espresso/50">Durations are estimates and vary by length, size and hair density.</p>
      <div className="mt-10"><ShimmerButton onClick={open}>Book Appointment</ShimmerButton></div>
    </div>
  );
}
