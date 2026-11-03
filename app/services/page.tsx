"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Clock,
  Info,
  Search,
  MessageCircle,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  Phone,
} from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";
import { useBooking } from "@/components/BookingModal";
import {
  CATEGORIES,
  SERVICES,
  Category,
  Service,
  getWhatsAppApiLink,
  CALL_NUMBER,
  CALL_LABEL,
} from "@/lib/data";

export default function Services() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { open } = useBooking();

  // Aggregate services based on selected category & search query
  const filteredServices = useMemo(() => {
    const list: { category: string; item: Service }[] = [];

    const catsToSearch = selectedCat === "All" ? CATEGORIES : [selectedCat as Category];

    for (const cat of catsToSearch) {
      const catData = SERVICES[cat as Category];
      if (!catData) continue;
      for (const item of catData.items) {
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.toLowerCase().includes(searchQuery.toLowerCase());

        if (matchesSearch) {
          list.push({ category: cat, item });
        }
      }
    }
    return list;
  }, [selectedCat, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      {/* Page Title & Intro */}
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-bronze">
          Service Menu &amp; Hairstyle Catalog
        </p>
        <h1 className="mt-3 font-serif text-5xl text-espresso md:text-6xl">
          Crafted with Time &amp; Precision
        </h1>
        <p className="mt-4 text-base text-espresso/75 leading-relaxed">
          Every style is executed with meticulous parting, gentle scalp tension, and nourishing hydration. Browse our complete menu with dedicated visual guides below.
        </p>
      </div>

      {/* Preparation Notice Card */}
      <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 rounded-3xl border border-gold/40 bg-gold/10 p-6 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/25 text-bronze">
          <Info size={20} />
        </div>
        <div className="text-sm leading-relaxed text-espresso/85">
          <p className="font-semibold text-espresso">Preparing for your salon visit in Teshie:</p>
          <p className="mt-1">
            Please arrive with your hair thoroughly detangled and product-free, or select our <b>Wash &amp; Stretch</b> package when reserving your seat. This guarantees clean partings and the longest-lasting result.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => {
            const isActive = selectedCat === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCat(c)}
                className={`relative rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-espresso text-cream shadow-md"
                    : "border border-espresso/15 bg-white text-espresso/70 hover:border-gold hover:text-bronze"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40" />
          <input
            type="text"
            placeholder="Search knotless, wigs, locs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-espresso/15 bg-white py-2 pl-9 pr-4 text-xs text-espresso outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          >
          </input>
        </div>
      </div>

      {/* Service Cards with Images */}
      <div className="mt-10">
        {filteredServices.length === 0 ? (
          <div className="rounded-3xl border border-espresso/10 bg-white p-12 text-center">
            <p className="font-serif text-2xl text-espresso">No services matching &ldquo;{searchQuery}&rdquo;</p>
            <p className="mt-2 text-sm text-espresso/60">Try searching for &quot;braids&quot;, &quot;wigs&quot;, &quot;twists&quot;, or &quot;wash&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All");
              }}
              className="mt-4 rounded-full bg-espresso px-5 py-2 text-xs font-medium text-cream"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredServices.map(({ category, item }) => {
                const waStyleUrl = getWhatsAppApiLink(
                  `Hello Moredays Hairthentic! I would like to inquire about pricing and booking for *${item.name}* (${category}).`
                );

                return (
                  <motion.div
                    layout
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-xl"
                  >
                    {/* Visual Image alongside Service */}
                    <div className="relative h-56 w-full overflow-hidden bg-espresso">
                      <img
                        src={item.image}
                        alt={`${item.name} hairstyle by Moredays Hairthentic`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/15 to-transparent" />

                      {/* Category Pill */}
                      <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-espresso shadow backdrop-blur-sm">
                        {category}
                      </span>

                      {/* Estimated Duration Badge */}
                      <span className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-espresso/85 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
                        <Clock size={13} className="text-gold" />
                        {item.time}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-2xl font-bold text-espresso group-hover:text-bronze transition">
                            {item.name}
                          </h3>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-espresso/70">
                          {item.note}
                        </p>

                        <div className="mt-4 flex items-center gap-2 border-t border-espresso/10 pt-3 text-xs text-espresso/60">
                          <CheckCircle2 size={13} className="text-bronze shrink-0" />
                          <span>Priced on consultation based on length &amp; thickness</span>
                        </div>
                      </div>

                      {/* Actions: Book & WhatsApp Redirect */}
                      <div className="mt-6 flex flex-col gap-2.5">
                        <button
                          type="button"
                          onClick={() => open(item.name)}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-2.5 text-xs font-semibold text-cream shadow transition hover:bg-bronze active:scale-98"
                        >
                          <CalendarCheck size={14} />
                          Book This Style
                        </button>

                        {/* WhatsApp Redirect Button to 233596271289 */}
                        <a
                          href={waStyleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 py-2 text-xs font-semibold text-[#15803d] transition hover:bg-[#25D366] hover:text-white"
                        >
                          <MessageCircle size={14} />
                          WhatsApp Inquiry (059 627 1289)
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom CTA & Guidance */}
      <div className="mt-16 rounded-3xl border border-gold/30 bg-alabaster p-8 md:p-12 text-center">
        <Sparkles className="mx-auto text-gold" size={28} />
        <h2 className="mt-3 font-serif text-3xl md:text-4xl text-espresso">Have a Custom Style or Photo in Mind?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-espresso/70 leading-relaxed">
          Send us your inspiration photos directly on WhatsApp. We will evaluate length, recommend hair extensions, and give you an exact price and duration quote.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <ShimmerButton onClick={() => open()}>
            Book an Appointment
          </ShimmerButton>

          <a
            href={getWhatsAppApiLink("Hello Moredays Hairthentic! I have a reference photo for a style I want to do.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#20ba59]"
          >
            <MessageCircle size={17} />
            Send Photo on WhatsApp (059 627 1289)
          </a>

          <a
            href={`tel:${CALL_NUMBER}`}
            className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-white px-5 py-3.5 text-sm font-medium text-espresso hover:bg-cream"
          >
            <Phone size={15} />
            Call {CALL_LABEL}
          </a>
        </div>
      </div>
    </div>
  );
}
