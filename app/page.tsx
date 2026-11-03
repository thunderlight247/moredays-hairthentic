"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  Bath,
  Coffee,
  Car,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import FlowCanvas from "@/components/FlowCanvas";
import WordReveal from "@/components/WordReveal";
import ShimmerButton from "@/components/ShimmerButton";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/components/BookingModal";
import {
  CATEGORIES,
  SERVICES,
  ADDRESS,
  DIGITAL_ADDRESS,
  LANDMARK,
  GOOGLE_MAPS_EMBED,
  GOOGLE_MAPS_SEARCH_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  getWhatsAppApiLink,
  CALL_NUMBER,
  CALL_LABEL,
} from "@/lib/data";

const CAT_IMG: Record<string, string> = {
  "Braids & Lines": "/images/services/box-braids.jpg",
  "Wigs & Extensions": "/images/services/wig-installation.jpg",
  "Hair Care": "/images/services/wash-deep-condition.jpg",
};

const AMENITIES = [
  [Wifi, "High-Speed Wi-Fi", "Stay connected, stream, or work comfortably through long sessions."],
  [Bath, "Pristine Restrooms", "Clean, private, and fully stocked amenities for your comfort."],
  [Coffee, "Complimentary Beverages", "Chilled refreshments and teas during extensive braid appointments."],
  [Car, "Free Safe Parking", "Spacious and secure on-site parking right in front of the studio."],
  [Smartphone, "MoMo & NFC Payments", "Fast cashless checkout via MTN MoMo, Telecel Cash & Bank Cards."],
  [ShieldCheck, "Tension-Free Technique", "Gentle on your hairline, edges, and scalp for healthy growth."],
] as const;

const SHOWCASE_GALLERY = [
  { img: "/images/work-1.jpg", title: "Mini Twists", cat: "Protective Twists" },
  { img: "/images/work-7.jpg", title: "Sculpted Cornrows", cat: "Clean Precision" },
  { img: "/images/work-3.jpg", title: "Feed-In Lines", cat: "Sleek Patterns" },
  { img: "/images/work-9.jpg", title: "Boho Knotless", cat: "Flawless Braids" },
];

const VIDEO_PROOF = [
  "Feather-light tension",
  "Neat, sculpted partings",
  "Curl-sealed ends",
];

export default function Home() {
  const { open } = useBooking();
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      void videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const waHeroUrl = getWhatsAppApiLink(
    "Hello Moredays Hairthentic! I found you on your website and would like to ask about booking a hair appointment."
  );

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden px-4 sm:px-6 pb-16 pt-24 sm:pt-32 md:pt-36">
        <FlowCanvas />
        <div className="relative mx-auto max-w-6xl w-full">
          {/* Subtle tag without awkward badges or emojis */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-bronze">
            Protective Styling &amp; Hair Care Studio
          </p>

          <WordReveal
            text="Authentic Care for Your Crown."
            className="max-w-4xl font-serif text-4xl sm:text-6xl md:text-8xl leading-[1.05] text-espresso"
          />

          <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-espresso/80">
            Accra&apos;s sanctuary for neat protective braids, custom lace wig installs, and revitalizing natural hair care — crafted with patience, tension-free technique, and deep respect for your roots.
          </p>

          {/* Action CTAs - Fully responsive and mobile-friendly */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <ShimmerButton onClick={() => open()} className="w-full sm:w-auto justify-center">
              Book Appointment <ArrowRight size={16} />
            </ShimmerButton>

            {/* Direct WhatsApp Action (059 627 1289) */}
            <a
              href={waHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#25D366] bg-white px-6 py-3.5 text-sm font-semibold text-[#15803d] shadow-sm transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp: 059 627 1289
            </a>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-espresso underline decoration-gold underline-offset-8 transition hover:text-bronze"
            >
              Explore services &amp; pricing
            </Link>
          </div>

          {/* Key highlights strip - mobile friendly grid */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 border-t border-espresso/10 pt-6 md:grid-cols-4">
            <div className="rounded-2xl bg-white/60 p-3 sm:p-0 sm:bg-transparent">
              <p className="font-serif text-2xl font-bold text-espresso sm:text-3xl">100%</p>
              <p className="text-xs text-espresso/65">Gentle Edge Protection</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-3 sm:p-0 sm:bg-transparent">
              <p className="font-serif text-2xl font-bold text-espresso sm:text-3xl">Teshie</p>
              <p className="text-xs text-espresso/65">Tebibianor · Hildas St</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-3 sm:p-0 sm:bg-transparent">
              <p className="font-serif text-2xl font-bold text-espresso sm:text-3xl">Mon – Sat</p>
              <p className="text-xs text-espresso/65">Early &amp; Late Sessions</p>
            </div>
            <div className="rounded-2xl bg-white/60 p-3 sm:p-0 sm:bg-transparent">
              <p className="font-serif text-2xl font-bold text-[#15803d] sm:text-3xl">059 627 1289</p>
              <p className="text-xs text-espresso/65">Direct WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL WORK · REAL TRANSFORMATIONS (Video proof + gallery) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-bronze">Signature Craftsmanship</p>
            <WordReveal
              as="h2"
              scroll
              text="Real Work. Real Transformations."
              highlight="Real Transformations."
              className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-espresso"
            />
          </div>
          <Link
            href="/lookbook"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-bronze hover:underline"
          >
            View full style lookbook <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Client transformation video */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px]">
              {/* Ambient gold glow behind the frame */}
              <div className="pointer-events-none absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-gold/30 via-bronze/20 to-gold/40 opacity-75 blur-xl" />

              <div className="relative overflow-hidden rounded-[2rem] border-2 border-gold/50 bg-espresso shadow-2xl shadow-espresso/30">
                <video
                  ref={videoRef}
                  src="/videos/transformation.mp4"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-[440px] sm:h-[520px] w-full object-cover"
                />

                {/* Readability gradients */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-espresso/35" />

                {/* Top row: live badge + sound toggle */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-espresso/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    Real Client Reel
                  </span>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-espresso/80 text-cream backdrop-blur-md transition hover:bg-espresso hover:text-gold"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-gold" />}
                  </button>
                </div>

                {/* Tap anywhere to play / pause */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/20"
                >
                  {!isPlaying && (
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-espresso/90 text-gold shadow-2xl ring-2 ring-gold/60">
                      <Play size={28} className="translate-x-0.5 fill-gold" />
                    </span>
                  )}
                </button>

                {/* Bottom meta + booking */}
                <div className="absolute inset-x-4 bottom-4 space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                      Boho Knotless Curls · Client Transformation
                    </p>
                    <p className="font-serif text-lg font-bold text-cream">
                      Moredays Signature Finish
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => open("Knotless Braids")}
                      className="flex-1 rounded-full bg-gold py-2.5 text-xs font-bold text-espresso shadow-md transition hover:bg-bronze hover:text-cream"
                    >
                      Book This Look
                    </button>
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 bg-espresso/70 text-cream backdrop-blur-md transition hover:text-gold"
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-cream" />}
                    </button>
                    <a
                      href={getWhatsAppApiLink(
                        "Hello Moredays Hairthentic! I saw your transformation video on your homepage and would like to book this hairstyle."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ask about this style on WhatsApp"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#20ba59]"
                    >
                      <MessageCircle size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* At-a-glance proof chips */}
            <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {VIDEO_PROOF.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-gold/30 bg-white/70 px-3 py-1 text-[11px] font-semibold text-espresso/75"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Recent studio work */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-5">
            {SHOWCASE_GALLERY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl bg-espresso shadow-md">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-52 sm:h-64 lg:h-[240px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-cream">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gold">{item.cat}</p>
                    <p className="font-serif text-base sm:text-xl font-medium">{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY BANNER */}
      <section className="border-y border-gold/20 bg-alabaster px-4 sm:px-6 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-bronze">Our Philosophy</p>
          <p className="mt-4 font-serif text-xl sm:text-2xl md:text-4xl leading-relaxed text-espresso">
            &ldquo;Neat, protective styling is more than beauty. It shields your delicate ends, retains length, and lets your natural hair rest — leaving you feeling poised, confident, and crowned.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-espresso/60">
            <Sparkles size={14} className="text-gold" />
            <span>Moredays Hairthentic Standards</span>
            <Sparkles size={14} className="text-gold" />
          </div>
        </Reveal>
      </section>

      {/* WHAT WE DO - CATEGORIES WITH IMAGES */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-bronze">Specialized Services</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-espresso">What We Do</h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-espresso/70">
            From intricate African braids to custom wig melting and intensive scalp steam therapies.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => {
            const catData = SERVICES[c];
            return (
              <Reveal key={c} delay={i * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-sm transition hover:shadow-xl">
                  {/* Category Image */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-espresso">
                    <img
                      src={CAT_IMG[c]}
                      alt={c}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-5 rounded-full bg-gold/90 px-3 py-1 text-xs font-bold text-espresso shadow">
                      {catData.items.length} Signature Styles
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-espresso">{c}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-espresso/70 leading-relaxed">{catData.blurb}</p>

                      {/* Sample services list */}
                      <ul className="mt-4 space-y-2 border-t border-espresso/10 pt-4 text-xs text-espresso/80">
                        {catData.items.slice(0, 3).map((it) => (
                          <li key={it.name} className="flex justify-between items-center">
                            <span className="font-medium">• {it.name}</span>
                            <span className="text-bronze font-semibold">{it.time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-espresso/10 pt-4">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-bronze hover:text-espresso"
                      >
                        Explore Styles <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                      </Link>

                      <button
                        onClick={() => open()}
                        className="rounded-full bg-espresso px-4 py-1.5 text-xs font-medium text-cream hover:bg-bronze transition"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* SALON AMENITIES */}
      <section className="px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-gold/30 bg-gradient-to-br from-alabaster via-cream to-alabaster p-6 sm:p-10 md:p-14 shadow-sm">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-bronze">Client Experience</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl text-espresso">The Moredays Hospitality</h2>
            <p className="mt-2 text-xs sm:text-sm text-espresso/70">
              Long braid appointments should be a relaxing retreat. We’ve designed our space with your peace and comfort in mind.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map(([Icon, title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="rounded-2xl border border-espresso/5 bg-white p-5 sm:p-6 shadow-sm ring-1 ring-espresso/5 transition hover:shadow-md">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gold/15 text-bronze">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-base sm:text-lg font-bold text-espresso">{title}</h3>
                  <p className="mt-1 text-xs text-espresso/65 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED LOCATION & INTERACTIVE GOOGLE MAP SECTION ON HOMEPAGE */}
      <section className="border-t border-espresso/10 bg-white px-4 sm:px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-bronze">Visit Our Studio</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl text-espresso">Find Us in Teshie Tebibianor</h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-espresso/70">
              Conveniently situated on Hilda&apos;s Street, right beside Original Don in Accra. Free on-site parking available.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Interactive Google Map Embed */}
            <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-espresso/15 shadow-lg bg-alabaster min-h-[320px] sm:min-h-[380px] relative">
              <iframe
                title="Moredays Hairthentic Google Maps Location"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-espresso/10 text-xs font-semibold text-espresso shadow-md flex items-center gap-1.5">
                <MapPin size={12} className="text-bronze" />
                <span>GZ-133, 2757 Hildas St</span>
              </div>
            </div>

            {/* Address & Direction Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-gold/30 bg-alabaster p-5 sm:p-7 shadow-sm">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-espresso border border-gold/40">
                    Ghana Post GPS: {DIGITAL_ADDRESS}
                  </span>
                  <h3 className="mt-3 font-serif text-xl sm:text-2xl font-bold text-espresso">Studio Address</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-espresso font-medium">
                    {ADDRESS}
                  </p>
                  <p className="mt-1 text-xs text-bronze font-semibold">
                    Landmark: {LANDMARK}
                  </p>
                </div>

                {/* Copy Address Button */}
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-espresso/20 bg-white py-2.5 text-xs font-semibold text-espresso shadow-sm transition hover:bg-cream"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      <span className="text-green-700">Address copied! Paste in Uber / Bolt / Maps</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Full Address for Uber / Bolt</span>
                    </>
                  )}
                </button>

                {/* Map Directions Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={GOOGLE_MAPS_SEARCH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-espresso px-3 py-3 text-xs font-semibold text-cream transition hover:bg-bronze text-center"
                  >
                    <ExternalLink size={13} />
                    Open Maps
                  </a>
                  <a
                    href={GOOGLE_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-espresso/20 bg-white px-3 py-3 text-xs font-semibold text-espresso transition hover:bg-cream text-center"
                  >
                    <MapPin size={13} className="text-bronze" />
                    Get Directions
                  </a>
                </div>

                {/* Direct Contacts Split */}
                <div className="border-t border-espresso/10 pt-4 space-y-2.5">
                  <a
                    href={getWhatsAppApiLink("Hello! I am navigating to your studio at Hildas St, Teshie.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59]"
                  >
                    <MessageCircle size={15} />
                    Chat on WhatsApp (059 627 1289)
                  </a>

                  <a
                    href={`tel:${CALL_NUMBER}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-espresso/15 bg-white py-2 text-xs font-medium text-espresso hover:bg-cream"
                  >
                    <Phone size={13} />
                    Direct Call: {CALL_LABEL}
                  </a>
                </div>
              </div>

              {/* Hours note */}
              <div className="mt-5 flex items-center gap-2 text-xs text-espresso/60 border-t border-espresso/10 pt-4">
                <Clock size={13} className="text-bronze" />
                <span>Mon–Sat open from morning · Sunday Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
