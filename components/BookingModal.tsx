"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, PartyPopper, MessageCircle, Phone, Smartphone, Check, Copy } from "lucide-react";
import { CATEGORIES, WA_NUMBER, CALL_NUMBER, CALL_LABEL, SERVICES, getWhatsAppApiLink } from "@/lib/data";

type BookingContextType = {
  open: (preselectedService?: string) => void;
};

const Ctx = createContext<BookingContextType>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

const TIMES = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];
const blank = { category: "", serviceName: "", date: "", time: "", name: "", phone: "", notes: "" };

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [f, setF] = useState(blank);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof blank, v: string) => setF((p) => ({ ...p, [k]: v }));

  const openModal = (preselectedService?: string) => {
    let catMatch = "";
    if (preselectedService) {
      for (const cat of CATEGORIES) {
        if (SERVICES[cat].items.some((i) => i.name.toLowerCase() === preselectedService.toLowerCase())) {
          catMatch = cat;
          break;
        }
      }
    }
    setF({
      ...blank,
      category: catMatch || CATEGORIES[0],
      serviceName: preselectedService || "",
    });
    setStep(1);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setF(blank);
      setCopied(false);
    }, 300);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const ok1 = f.category && f.date && f.time;
  const ok2 = f.name.trim() && f.phone.trim().length >= 9;

  const styleRequested = f.serviceName ? `${f.serviceName} (${f.category})` : f.category;
  const msg = `Hello Moredays Hairthentic! I would like to book an appointment.\n\nStyle/Service: *${styleRequested}*\nDate: ${f.date}\nTime: ${f.time}\nName: ${f.name}\nPhone: ${f.phone}${f.notes ? `\nNotes: ${f.notes}` : ""}\n\nPlease confirm availability. Thank you!`;

  const waRedirectUrl = getWhatsAppApiLink(msg);

  const handleCopy = () => {
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const inputClass =
    "w-full rounded-xl border border-espresso/15 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <Ctx.Provider value={{ open: openModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-espresso/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-gold/30 bg-cream p-6 shadow-2xl sm:rounded-3xl sm:p-8"
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === step ? "w-10 bg-gold" : s < step ? "w-6 bg-bronze" : "w-4 bg-espresso/10"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="rounded-full p-2 text-espresso/70 hover:bg-espresso/5 hover:text-espresso"
                >
                  <X size={20} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* STEP 1: SERVICE & TIMING */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-bronze">Step 1 of 3</p>
                        <h3 className="mt-1 font-serif text-3xl text-espresso">Choose your service & time</h3>
                      </div>

                      {/* Categories */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
                          Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                set("category", c);
                                set("serviceName", "");
                              }}
                              className={`rounded-full border px-4 py-2 text-xs font-medium transition sm:text-sm ${
                                f.category === c
                                  ? "border-espresso bg-espresso text-cream shadow-sm"
                                  : "border-espresso/15 bg-white/70 hover:border-gold hover:text-bronze"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Specific Style if selected */}
                      {f.category && (
                        <div>
                          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
                            Select Style (Optional)
                          </label>
                          <select
                            value={f.serviceName}
                            onChange={(e) => set("serviceName", e.target.value)}
                            className={inputClass}
                          >
                            <option value="">Any style under {f.category}</option>
                            {SERVICES[f.category as keyof typeof SERVICES]?.items.map((it) => (
                              <option key={it.name} value={it.name}>
                                {it.name} ({it.time})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Date */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          className={inputClass}
                          value={f.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => set("date", e.target.value)}
                        />
                      </div>

                      {/* Time Slot */}
                      <div>
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-espresso/60">
                          Preferred Start Time
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIMES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => set("time", t)}
                              className={`rounded-xl border py-2 text-xs font-medium transition sm:text-sm ${
                                f.time === t
                                  ? "border-gold bg-gold/20 font-semibold text-espresso ring-1 ring-gold"
                                  : "border-espresso/15 bg-white/80 hover:border-gold"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!ok1}
                        onClick={() => setStep(2)}
                        className="w-full rounded-full bg-espresso py-3.5 font-medium text-cream shadow-md transition hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-35"
                      >
                        Continue to Your Details
                      </button>
                    </div>
                  )}

                  {/* STEP 2: CLIENT DETAILS */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-bronze">Step 2 of 3</p>
                        <h3 className="mt-1 font-serif text-3xl text-espresso">Your contact info</h3>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-espresso/70">Full Name *</label>
                        <input
                          className={inputClass}
                          placeholder="e.g. Akosua Mensah"
                          value={f.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-espresso/70">Phone Number (Ghana) *</label>
                        <input
                          className={inputClass}
                          type="tel"
                          placeholder="e.g. 054 123 4567"
                          value={f.phone}
                          onChange={(e) => set("phone", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-espresso/70">Notes / Hair Requirements</label>
                        <textarea
                          className={inputClass}
                          rows={3}
                          placeholder="Length preference (waist, butt-length), hair color, natural density..."
                          value={f.notes}
                          onChange={(e) => set("notes", e.target.value)}
                        />
                      </div>

                      <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs text-espresso/80">
                        <Smartphone size={18} className="shrink-0 text-bronze" />
                        <span>We gladly accept NFC Mobile Payments &amp; MoMo on-site in Teshie Tebibianor!</span>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="rounded-full border border-espresso/20 bg-white px-6 py-3.5 text-sm font-medium hover:bg-espresso/5"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!ok2}
                          onClick={() => setStep(3)}
                          className="flex-1 rounded-full bg-espresso py-3.5 text-sm font-medium text-cream shadow-md transition hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          Review &amp; Book
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: INSTANT WHATSAPP CONFIRMATION */}
                  {step === 3 && (
                    <div className="space-y-5 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-bronze shadow-inner"
                      >
                        <PartyPopper size={32} />
                      </motion.div>

                      <div>
                        <h3 className="font-serif text-3xl text-espresso">
                          Almost Crowned, {f.name.split(" ")[0] || "Friend"}!
                        </h3>
                        <p className="mt-1 text-xs text-espresso/60">
                          Tap below to send your reservation directly to our official WhatsApp line: <strong className="text-espresso">059 627 1289</strong>.
                        </p>
                      </div>

                      {/* Summary card */}
                      <div className="rounded-2xl border border-espresso/10 bg-alabaster p-4 text-left text-sm leading-relaxed text-espresso">
                        <div className="flex justify-between border-b border-espresso/10 pb-2">
                          <span className="text-xs uppercase text-espresso/60">Service</span>
                          <span className="font-semibold">{styleRequested}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-espresso/10">
                          <span className="text-xs uppercase text-espresso/60">Date &amp; Time</span>
                          <span className="font-semibold">{f.date} · {f.time}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-xs uppercase text-espresso/60">Client</span>
                          <span>{f.name} ({f.phone})</span>
                        </div>
                      </div>

                      {/* Primary WhatsApp Action */}
                      <div className="space-y-3">
                        <a
                          href={waRedirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#20ba59] active:scale-[0.98]"
                        >
                          <MessageCircle size={20} className="fill-white/20" />
                          Send on WhatsApp (059 627 1289)
                        </a>

                        {/* Copy Details Option */}
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-espresso/15 bg-white py-2.5 text-xs text-espresso/80 transition hover:bg-espresso/5"
                        >
                          {copied ? (
                            <>
                              <Check size={14} className="text-green-600" />
                              <span className="text-green-700 font-medium">Copied booking details to clipboard!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span>Copy details to clipboard</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Alternate Direct Call */}
                      <div className="border-t border-espresso/10 pt-4">
                        <p className="text-xs text-espresso/50">Prefer a phone call for immediate questions?</p>
                        <a
                          href={`tel:${CALL_NUMBER}`}
                          className="mt-1.5 inline-flex items-center gap-2 text-sm font-medium text-bronze hover:underline"
                        >
                          <Phone size={14} />
                          Call {CALL_LABEL}
                        </a>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
