"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sparkles, CalendarCheck } from "lucide-react";
import { FILTERS, LOOKS, getWhatsAppApiLink } from "@/lib/data";
import { useBooking } from "@/components/BookingModal";
import ShimmerButton from "@/components/ShimmerButton";

export default function Lookbook() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { open } = useBooking();

  const items = LOOKS.filter((l) => activeFilter === "All" || l.cat === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-bronze">
          Visual Style Lookbook
        </p>
        <h1 className="mt-3 font-serif text-5xl text-espresso md:text-6xl">
          Styles We Love &amp; Create
        </h1>
        <p className="mt-4 text-base text-espresso/75 leading-relaxed">
          Explore real client transformations crafted at Moredays Hairthentic in Teshie Tebibianor. Hover or tap each style card to see alternate angles.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((x) => (
          <button
            key={x}
            onClick={() => setActiveFilter(x)}
            className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeFilter === x
                ? "border-espresso bg-espresso text-cream shadow-md"
                : "border-espresso/15 bg-white text-espresso/70 hover:border-gold hover:text-bronze"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {/* Lookbook Gallery */}
      <motion.div layout className="mt-10 columns-2 gap-4 md:columns-3 lg:gap-6">
        <AnimatePresence>
          {items.map((l) => (
            <motion.figure
              layout
              key={l.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-espresso shadow-md"
            >
              <img
                src={`/images/work-${l.id}.jpg`}
                alt={l.title}
                loading="lazy"
                className="w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <img
                src={`/images/work-${l.alt}.jpg`}
                alt={`${l.title} alternate angle`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent p-5 text-cream">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold">{l.cat}</p>
                <p className="font-serif text-2xl font-bold">{l.title}</p>
                <div className="mt-2 flex items-center justify-between opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => open(l.title)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gold underline underline-offset-4"
                  >
                    <CalendarCheck size={13} />
                    Book this look
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Helpful client guidance and CTA banner */}
      <div className="mt-16 rounded-3xl border border-gold/30 bg-alabaster p-8 text-center md:p-12">
        <Sparkles className="mx-auto text-gold" size={26} />
        <h2 className="mt-3 font-serif text-3xl md:text-4xl text-espresso">
          See a Hairstyle You Want Recreated?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-espresso/70 leading-relaxed">
          Screenshot any style from our lookbook or send your own Pinterest reference photos to our team on WhatsApp. We provide custom consultation and instant price quotes.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <ShimmerButton onClick={() => open()}>
            Book an Appointment
          </ShimmerButton>

          <a
            href={getWhatsAppApiLink("Hello Moredays Hairthentic! I saw a style in your lookbook that I love and want to book.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#20ba59]"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp (059 627 1289)
          </a>
        </div>
      </div>
    </div>
  );
}
