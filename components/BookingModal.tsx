"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, PartyPopper, MessageCircle, Phone, Smartphone } from "lucide-react";
import { CATEGORIES, PHONES, WA_NUMBER } from "@/lib/data";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useBooking = () => useContext(Ctx);
const TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];
const blank = { category: "", date: "", time: "", name: "", phone: "", notes: "" };

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [f, setF] = useState(blank);
  const set = (k: keyof typeof blank, v: string) => setF((p) => ({ ...p, [k]: v }));
  const close = () => { setOpen(false); setTimeout(() => { setStep(1); setF(blank); }, 300); };
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, []);
  const ok1 = f.category && f.date && f.time;
  const ok2 = f.name.trim() && f.phone.trim().length >= 9;
  const msg = `Hello Moredays Hairthentic! I'd like to book *${f.category}* on ${f.date} at ${f.time}.\nName: ${f.name}\nPhone: ${f.phone}${f.notes ? `\nNotes: ${f.notes}` : ""}`;
  const input = "w-full rounded-xl border border-espresso/15 bg-cream px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div data-lenis-prevent role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl sm:p-8"
              initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1.5">{[1, 2, 3].map((s) => <span key={s} className={`h-1.5 w-10 rounded-full transition-colors ${s <= step ? "bg-gold" : "bg-espresso/10"}`} />)}</div>
                <button onClick={close} aria-label="Close" className="rounded-full p-2 hover:bg-espresso/5"><X size={18} /></button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                  {step === 1 && (<div className="space-y-5">
                    <h3 className="font-serif text-3xl">Choose your service</h3>
                    <div className="flex flex-wrap gap-2">{CATEGORIES.map((c) => (
                      <button key={c} onClick={() => set("category", c)} className={`rounded-full border px-4 py-2 text-sm transition ${f.category === c ? "border-gold bg-gold text-espresso" : "border-espresso/20 hover:border-gold"}`}>{c}</button>))}</div>
                    <input type="date" className={input} value={f.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => set("date", e.target.value)} />
                    <div className="grid grid-cols-3 gap-2">{TIMES.map((t) => (
                      <button key={t} onClick={() => set("time", t)} className={`rounded-xl border py-2 text-sm transition ${f.time === t ? "border-gold bg-gold/20" : "border-espresso/15 hover:border-gold"}`}>{t}</button>))}</div>
                    <button disabled={!ok1} onClick={() => setStep(2)} className="w-full rounded-full bg-espresso py-3.5 text-cream transition disabled:opacity-30">Continue</button>
                  </div>)}
                  {step === 2 && (<div className="space-y-4">
                    <h3 className="font-serif text-3xl">Your details</h3>
                    <input className={input} placeholder="Full name" value={f.name} onChange={(e) => set("name", e.target.value)} />
                    <input className={input} type="tel" placeholder="Phone number" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                    <textarea className={input} rows={3} placeholder="Notes (style, length, colour…)" value={f.notes} onChange={(e) => set("notes", e.target.value)} />
                    <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm"><Smartphone size={18} className="shrink-0 text-bronze" />We gladly accept NFC Mobile Payments / MoMo on-site!</div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="rounded-full border border-espresso/20 px-6 py-3.5">Back</button>
                      <button disabled={!ok2} onClick={() => setStep(3)} className="flex-1 rounded-full bg-espresso py-3.5 text-cream disabled:opacity-30">Confirm booking</button>
                    </div>
                  </div>)}
                  {step === 3 && (<div className="space-y-5 text-center">
                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.1 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-bronze"><PartyPopper size={36} /></motion.div>
                    <h3 className="font-serif text-3xl">You&apos;re almost crowned, {f.name.split(" ")[0]}!</h3>
                    <p className="rounded-2xl bg-alabaster p-4 text-left text-sm leading-relaxed">{f.category}<br />{f.date} · {f.time}<br />{f.phone}</p>
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-medium text-white shadow-lg"><MessageCircle size={18} />Send on WhatsApp</a>
                    <a href={`tel:${PHONES[1].tel}`} className="flex items-center justify-center gap-2 text-sm text-espresso/70 hover:text-bronze"><Phone size={14} />Or call {PHONES[1].label}</a>
                  </div>)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
