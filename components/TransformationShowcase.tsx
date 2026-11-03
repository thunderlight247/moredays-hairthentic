"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
  ArrowRight,
  Eye,
} from "lucide-react";
import { useBooking } from "./BookingModal";
import { getWhatsAppApiLink, LOOKS } from "@/lib/data";

const TRUST_POINTS = [
  {
    title: "Tension-Free Partings",
    desc: "Clean, sculpted lines without tight pulling. Sleep peacefully on night one.",
  },
  {
    title: "Edges & Hairline Protection",
    desc: "Gentle grip that protects your delicate perimeter and encourages natural growth.",
  },
  {
    title: "Long-Lasting Neatness",
    desc: "Tuck-in technique and clean dipping that keeps braids fresh for weeks.",
  },
];

export default function TransformationShowcase() {
  const { open } = useBooking();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const waReelUrl = getWhatsAppApiLink(
    "Hello Moredays Hairthentic! I saw your transformation video on your homepage and would like to book this hairstyle."
  );

  // Duplicate looks list to make an endless seamless marquee loop
  const marqueeItems = [...LOOKS, ...LOOKS];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-alabaster/60 to-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
            <Sparkles size={14} className="text-bronze" />
            <span>Proven Studio Results</span>
          </div>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso">
            Real Work. Real Transformations.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-espresso/75 leading-relaxed">
            At a single glance, see the seamless partings, feather-light tension, and flowing curl finishes crafted right here in our Teshie Tebibianor studio.
          </p>
        </div>

        {/* Hero Video & Proof Spotlight Split */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-center">
          {/* LEFT: Portrait Transformation Reel Player (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Ring-light ambient glow backdrop */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-gold/30 via-bronze/20 to-gold/40 blur-xl opacity-75" />

              {/* Phone / salon mirror frame container */}
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-gold/50 bg-espresso shadow-2xl shadow-espresso/30">
                {/* Autoplaying video */}
                <video
                  ref={videoRef}
                  src="/videos/transformation.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-[520px] sm:h-[560px] w-full object-cover"
                />

                {/* Gradient overlays for readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-espresso/30" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-espresso/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-gold border border-gold/30">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Live Studio Reel
                  </span>

                  {/* Audio Mute/Unmute toggle */}
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso/80 backdrop-blur-md text-cream hover:bg-espresso hover:text-gold border border-cream/20 transition"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-gold" />}
                  </button>
                </div>

                {/* Center Play/Pause Overlay Trigger */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity hover:bg-black/20"
                >
                  {!isPlaying && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-espresso/90 text-gold shadow-2xl ring-2 ring-gold/60">
                      <Play size={28} className="translate-x-0.5 fill-gold" />
                    </div>
                  )}
                </button>

                {/* Bottom Video Meta & Fast Booking */}
                <div className="absolute bottom-4 inset-x-4 space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                      Boho Knotless Curls · Client Transformation
                    </p>
                    <p className="font-serif text-lg font-bold text-cream">
                      Moredays Hairthentic Signature Style
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => open("Knotless Braids")}
                      className="flex-1 rounded-full bg-gold py-2.5 text-xs font-bold text-espresso shadow-md transition hover:bg-bronze hover:text-cream"
                    >
                      Book This Look
                    </button>
                    <a
                      href={waReelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20ba59] transition"
                      title="Ask about this style on WhatsApp"
                    >
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Why Customers Choose Moredays (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-bronze font-semibold">
                Why Clients Travel Across Accra
              </p>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-espresso font-bold">
                Hair Styling That Elevates Your Confidence
              </h3>
              <p className="mt-3 text-sm sm:text-base text-espresso/75 leading-relaxed">
                We believe you shouldn&apos;t have to suffer headaches or hair breakage for beauty. Our stylists specialize in gentle techniques that look runway-ready the moment you step out of the chair.
              </p>
            </div>

            {/* Quality Pillars */}
            <div className="space-y-4 pt-2">
              {TRUST_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="flex items-start gap-4 rounded-2xl border border-espresso/10 bg-white p-4 shadow-sm transition hover:border-gold/50 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-bronze mt-0.5">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-espresso">{point.title}</h4>
                    <p className="mt-0.5 text-xs sm:text-sm text-espresso/70 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <button
                onClick={() => open()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-semibold text-cream shadow-md transition hover:bg-bronze hover:shadow-lg active:scale-98"
              >
                <CalendarCheck size={16} />
                Book Your Crown Session
              </button>

              <a
                href={getWhatsAppApiLink("Hello Moredays Hairthentic! I want to consult about getting my hair done at your Teshie studio.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-white px-6 py-3.5 text-sm font-semibold text-[#15803d] shadow-sm transition hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle size={17} />
                WhatsApp Consultation: 059 627 1289
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUOUS ANIMATED MARQUEE OF TRANSFORMATIONS */}
      <div className="mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-bronze font-semibold">
              Live Lookbook Reel
            </p>
            <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-espresso font-bold">
              Hover to Flip Angles · Tap to Reserve
            </h3>
          </div>
          <span className="text-xs text-espresso/60 flex items-center gap-1.5">
            <Eye size={13} className="text-bronze" />
            Interactive 360° style perspectives
          </span>
        </div>

        {/* Animated Infinite Sliding Track */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Subtle edge fades */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-cream to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-cream to-transparent z-10" />

          <motion.div
            className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 32,
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative w-64 sm:w-72 shrink-0 overflow-hidden rounded-3xl border border-espresso/10 bg-espresso shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Images: primary and alternate angle on hover */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src={`/images/work-${item.id}.jpg`}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <img
                    src={`/images/work-${item.alt}.jpg`}
                    alt={`${item.title} angle`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                </div>

                {/* Style Details & Direct Book */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-cream">
                  <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] font-bold text-espresso uppercase tracking-wider">
                    {item.cat}
                  </span>
                  <p className="mt-1 font-serif text-xl font-bold">{item.title}</p>

                  <div className="mt-3 flex items-center justify-between border-t border-cream/15 pt-2">
                    <span className="text-[11px] text-cream/70">Alternate angle on hover</span>
                    <button
                      onClick={() => open(item.title)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline"
                    >
                      Book <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
