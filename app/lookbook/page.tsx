"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FILTERS, LOOKS } from "@/lib/data";

export default function Lookbook() {
  const [f, setF] = useState("All");
  const items = LOOKS.filter((l) => f === "All" || l.cat === f);
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <p className="text-xs uppercase tracking-[0.35em] text-bronze">Visual style lookbook</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">Styles we love</h1>
      <div className="mt-8 flex flex-wrap gap-2">{FILTERS.map((x) => (
        <button key={x} onClick={() => setF(x)} className={`rounded-full border px-5 py-2 text-sm transition ${f === x ? "border-gold bg-gold text-espresso" : "border-espresso/15 hover:border-gold"}`}>{x}</button>))}</div>
      <motion.div layout className="mt-10 columns-2 gap-4 md:columns-3">
        <AnimatePresence>{items.map((l) => (
          <motion.figure layout key={l.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
            className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-alabaster">
            <img src={`/images/work-${l.id}.jpg`} alt={l.title} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
            <img src={`/images/work-${l.alt}.jpg`} alt={`${l.title} alternate angle`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/80 to-transparent p-4 text-cream"><p className="font-serif text-xl">{l.title}</p><p className="text-xs text-gold">{l.cat}</p></figcaption>
          </motion.figure>))}</AnimatePresence>
      </motion.div>
      <p className="mt-6 text-xs text-espresso/50">Hover (or tap) a card for a second angle. Add a Custom Wigs / Natural Hair Care filter in lib/data.ts when you have those photos.</p>
    </div>
  );
}
