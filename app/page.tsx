"use client";
import Link from "next/link";
import { ArrowRight, Wifi, Bath, Coffee, Car } from "lucide-react";
import FlowCanvas from "@/components/FlowCanvas";
import WordReveal from "@/components/WordReveal";
import ShimmerButton from "@/components/ShimmerButton";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/components/BookingModal";
import { CATEGORIES, SERVICES } from "@/lib/data";

const IMG: Record<string, number> = { "Braids & Lines": 9, "Wigs & Extensions": 2, "Hair Care": 1 };
const AMEN = [[Wifi, "Free Wi-Fi", "Stay connected through long sessions."], [Bath, "Restrooms", "Clean and convenient."], [Coffee, "Complimentary Beverages", "Refreshments during long braid sessions."], [Car, "Free Parking", "Easy parking at the studio."]] as const;

export default function Home() {
  const { open } = useBooking();
  return (<>
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20">
      <FlowCanvas />
      <div className="relative mx-auto max-w-6xl">
        <p className="mb-5 text-xs uppercase tracking-[0.35em] text-bronze">Teshie Tebibianor · Accra</p>
        <WordReveal text="Authentic Care for Your Crown." className="max-w-4xl font-serif text-6xl leading-[0.95] md:text-8xl" />
        <p className="mt-8 max-w-xl text-lg text-espresso/70">Elite protective styling, flawless braids and custom wig layouts, crafted with patience and care.</p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <ShimmerButton onClick={open}>Book Appointment <ArrowRight size={16} /></ShimmerButton>
          <Link href="/lookbook" className="text-sm underline decoration-gold underline-offset-8">View the lookbook</Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal><h2 className="font-serif text-4xl md:text-5xl">Real work. Real transformations.</h2></Reveal>
      <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 7, 3, 9].map((n, i) => <img key={n} src={`/images/work-${n}.jpg`} alt="Moredays Hairthentic style" loading="lazy" className={`h-72 w-full rounded-2xl object-cover md:h-96 ${i % 2 ? "md:mt-10" : ""}`} />)}
      </Reveal>
      <p className="mt-6 text-sm text-espresso/50">Drop a before-and-after video here by replacing this strip with a &lt;video&gt; element.</p>
    </section>

    <section className="bg-alabaster px-5 py-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-bronze">Our philosophy</p>
        <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">Neat, protective styles are more than beauty. They shield your ends, retain length and let your natural hair rest, while you walk out feeling like royalty.</p>
      </Reveal>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-24">
      <Reveal><h2 className="font-serif text-4xl md:text-5xl">What we do</h2></Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c} delay={i * 0.1}>
            <Link href="/services" className="group block overflow-hidden rounded-3xl bg-espresso text-cream">
              <div className="h-64 overflow-hidden"><img src={`/images/work-${IMG[c]}.jpg`} alt={c} loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110" /></div>
              <div className="p-6"><h3 className="font-serif text-3xl">{c}</h3><p className="mt-2 text-sm text-cream/60">{SERVICES[c].blurb}</p><span className="mt-4 inline-flex items-center gap-2 text-sm text-gold">Explore <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></div>
            </Link>
          </Reveal>))}
      </div>
    </section>

    <section className="px-5 pb-24">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gold/30 bg-gradient-to-br from-alabaster to-cream p-8 md:p-14">
        <Reveal><h2 className="font-serif text-4xl">The Moredays experience</h2></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AMEN.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.08}><div className="rounded-2xl bg-cream p-5 shadow-sm ring-1 ring-espresso/5"><Icon className="text-bronze" /><h3 className="mt-4 font-medium">{t}</h3><p className="mt-1 text-sm text-espresso/60">{d}</p></div></Reveal>))}
        </div>
      </div>
    </section>
  </>);
}
