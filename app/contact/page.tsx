"use client";
import { useState, useMemo } from "react";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CalendarCheck,
  Copy,
  Check,
  ExternalLink,
  Car,
  Compass,
  Smartphone,
  Sparkles,
} from "lucide-react";
import ShimmerButton from "@/components/ShimmerButton";
import Reveal from "@/components/Reveal";
import { useBooking } from "@/components/BookingModal";
import {
  ADDRESS,
  DIGITAL_ADDRESS,
  LANDMARK,
  HOURS,
  WA_NUMBER,
  CALL_NUMBER,
  CALL_LABEL,
  GOOGLE_MAPS_EMBED,
  GOOGLE_MAPS_SEARCH_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  getWhatsAppApiLink,
} from "@/lib/data";

export default function Contact() {
  const { open } = useBooking();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waContactUrl = getWhatsAppApiLink(
    "Hello Moredays Hairthentic! I would like to make an inquiry or book an appointment."
  );

  // Determine open/closed status for Ghana local time (GMT)
  const status = useMemo(() => {
    const now = new Date();
    // Ghana is in GMT (UTC+0)
    const day = now.getUTCDay(); // 0 is Sunday, 1 is Monday...
    const hour = now.getUTCHours();
    const min = now.getUTCMinutes();
    const timeVal = hour + min / 60;

    if (day === 0) {
      return { isOpen: false, text: "Closed today (Sunday)" };
    } else if (day === 1 || day === 3) {
      // Mon, Wed: 8:00 AM - 8:00 PM
      const open = timeVal >= 8 && timeVal < 20;
      return { isOpen: open, text: open ? "Open today until 8:00 PM" : "Closed now (Opens 8:00 AM)" };
    } else if (day === 2) {
      // Tue: 9:00 AM - 12:00 AM
      const open = timeVal >= 9 || timeVal < 0.5;
      return { isOpen: open, text: open ? "Open today (Late session until 12:00 AM)" : "Closed now" };
    } else {
      // Thu - Sat: 7:00 AM - 8:30 PM
      const open = timeVal >= 7 && timeVal < 20.5;
      return { isOpen: open, text: open ? "Open today until 8:30 PM" : "Closed now (Opens 7:00 AM)" };
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-32">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-bronze">
          <MapPin size={13} />
          <span>Accra Location &amp; Directions</span>
        </div>
        <h1 className="mt-3 font-serif text-5xl text-espresso md:text-6xl">
          Visit Us in Teshie
        </h1>
        <p className="mt-3 text-base text-espresso/75 leading-relaxed">
          Conveniently located on Hilda&apos;s Street, Teshie Tebibianor, Accra. Seamlessly reachable via private ride or public transit.
        </p>
      </div>

      {/* Main Grid: Left column Map & Location, Right column Booking & Contacts */}
      <div className="mt-12 grid gap-8 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Map & Studio Guide (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* REAL GOOGLE MAP EMBED */}
          <Reveal className="overflow-hidden rounded-3xl border border-espresso/15 bg-alabaster shadow-md">
            <div className="border-b border-espresso/10 bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-bold text-espresso">Google Maps Navigation</h2>
                <p className="text-xs text-espresso/60">Search query: GZ-133, 2757 HILDAS ST, Teshie Tebibianor</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2.5 w-2.5 rounded-full ${status.isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"}`} />
                <span className="text-xs font-medium text-espresso/80">{status.text}</span>
              </div>
            </div>

            {/* Interactive Iframe */}
            <div className="relative h-80 w-full md:h-96">
              <iframe
                title="Google Map location for Moredays Hairthentic"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Interactive Map Actions Bar */}
            <div className="bg-white p-5 flex flex-wrap items-center justify-between gap-3 border-t border-espresso/10">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-gold/15 px-2.5 py-1 text-xs font-bold text-espresso border border-gold/30">
                  {DIGITAL_ADDRESS}
                </span>
                <span className="text-xs text-espresso/70">Ghana Post GPS</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={GOOGLE_MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-espresso px-4 py-2 text-xs font-semibold text-cream hover:bg-bronze transition"
                >
                  <ExternalLink size={13} />
                  Open in Google Maps
                </a>
                <a
                  href={GOOGLE_MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-espresso/20 bg-cream px-4 py-2 text-xs font-semibold text-espresso hover:bg-espresso/5 transition"
                >
                  <Compass size={13} className="text-bronze" />
                  Get Directions
                </a>
              </div>
            </div>
          </Reveal>

          {/* EXACT ADDRESS & LANDMARK CARD */}
          <Reveal className="rounded-3xl border border-gold/30 bg-alabaster p-7 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-bronze">Physical Location</p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-espresso">{ADDRESS}</h3>
                <p className="mt-2 text-sm font-semibold text-espresso">
                  Landmark: <span className="text-bronze">{LANDMARK}</span>
                </p>
              </div>
            </div>

            {/* Copy Address Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-espresso/15 bg-white py-3 text-xs font-semibold text-espresso shadow-sm transition hover:bg-cream"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="text-green-700">Address Copied! Paste into Bolt, Uber, or GPS app</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Address for Uber / Bolt Drivers</span>
                </>
              )}
            </button>

            {/* Helpful Transport & Parking Notes */}
            <div className="mt-6 grid gap-4 border-t border-espresso/10 pt-5 sm:grid-cols-2 text-xs text-espresso/75">
              <div className="flex items-start gap-2.5">
                <Car size={16} className="text-bronze shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-espresso">Free On-Site Parking</p>
                  <p className="mt-0.5 text-espresso/65">Designated parking directly in front of the studio.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-bronze shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-espresso">Beside Original Don</p>
                  <p className="mt-0.5 text-espresso/65">Recognized local landmark on Hilda&apos;s Street, Teshie.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* STUDIO HOURS CARD */}
          <Reveal className="rounded-3xl bg-espresso p-7 text-cream shadow-md">
            <div className="flex items-center justify-between border-b border-cream/15 pb-4">
              <h2 className="flex items-center gap-2.5 font-serif text-2xl">
                <Clock className="text-gold" size={22} />
                Operating Hours
              </h2>
              <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                Ghana Time (GMT)
              </span>
            </div>

            <dl className="mt-4 divide-y divide-cream/10">
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex justify-between py-2.5 text-sm">
                  <dt className="text-cream/70">{day}</dt>
                  <dd className={`font-medium ${time === "Closed" ? "text-gold font-bold" : "text-cream"}`}>
                    {time}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Storefront Visual */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-espresso/10 bg-espresso">
              <img
                src="/images/work-5.jpg"
                alt="Moredays Hairthentic salon atmosphere"
                loading="lazy"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 text-cream">
                <p className="text-xs uppercase tracking-widest text-gold font-semibold">Welcoming Atmosphere</p>
                <p className="font-serif text-xl">Relax in a serene, private salon suite.</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: Booking Card & Direct Contact (5 cols) */}
        <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
          {/* RESERVE SEAT CARD */}
          <Reveal className="rounded-3xl border border-gold/40 bg-white p-8 shadow-xl shadow-gold/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-bronze">
              <CalendarCheck size={26} />
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-espresso">
              Reserve Your Seat
            </h2>
            <p className="mt-1 text-xs text-espresso/60">
              Instant appointment request in 3 easy steps
            </p>

            <ol className="mt-6 space-y-3 rounded-2xl bg-alabaster p-4 text-xs text-espresso/80">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-espresso text-[11px] font-bold text-cream">1</span>
                <span>Select your desired style, date, &amp; preferred time</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-espresso text-[11px] font-bold text-cream">2</span>
                <span>Provide your contact details and style preferences</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-espresso text-[11px] font-bold text-cream">3</span>
                <span>Confirm your slot directly on our official WhatsApp</span>
              </li>
            </ol>

            <div className="mt-6">
              <ShimmerButton onClick={() => open()} className="w-full justify-center">
                Book Appointment
              </ShimmerButton>
            </div>

            {/* Payment badge */}
            <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gold/10 p-2.5 text-xs text-espresso/80 border border-gold/25">
              <Smartphone size={15} className="text-bronze shrink-0" />
              <span>Cash, MTN MoMo, Telecel Cash &amp; Cards accepted</span>
            </div>
          </Reveal>

          {/* PRIMARY WHATSAPP REDIRECT CARD (059 627 1289) */}
          <Reveal className="rounded-3xl border border-[#25D366]/40 bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
                <MessageCircle size={22} className="fill-white/20" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#15803d]">Primary WhatsApp Line</p>
                <p className="font-serif text-2xl font-bold text-espresso">059 627 1289</p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-espresso/75">
              Fastest response for booking inquiries, style consultations, pricing quotes, and sending inspiration photos.
            </p>

            <a
              href={waContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md shadow-[#25D366]/30 transition hover:bg-[#20ba59]"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp Now
            </a>
          </Reveal>

          {/* DIRECT CALL CARD (050 714 8356) */}
          <Reveal className="rounded-3xl border border-espresso/15 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso text-cream">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-bronze">Direct Telephone Call</p>
                <p className="font-serif text-2xl font-bold text-espresso">{CALL_LABEL}</p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-espresso/70">
              For urgent directions on your appointment day or immediate assistance from our salon reception.
            </p>

            <a
              href={`tel:${CALL_NUMBER}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-espresso/20 bg-alabaster py-3 text-sm font-semibold text-espresso transition hover:bg-espresso hover:text-cream"
            >
              <Phone size={16} />
              Call {CALL_LABEL}
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
