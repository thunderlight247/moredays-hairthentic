import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from "lucide-react";
import {
  ADDRESS,
  LANDMARK,
  DIGITAL_ADDRESS,
  WA_NUMBER,
  CALL_NUMBER,
  CALL_LABEL,
  GOOGLE_MAPS_SEARCH_URL,
  getWhatsAppApiLink,
} from "@/lib/data";

export default function Footer() {
  const waUrl = getWhatsAppApiLink("Hello Moredays Hairthentic! I would like to make an inquiry.");

  return (
    <footer className="border-t border-espresso/15 bg-espresso px-5 py-16 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <p className="font-serif text-3xl font-bold">
            Moredays <span className="font-serif italic text-gold">Hairthentic</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            Authentic, gentle care for your crown. Premier protective braids, custom lace wigs, and restorative hair treatments in Teshie Tebibianor, Accra.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold border border-gold/30">
              GhanaPost: {DIGITAL_ADDRESS}
            </span>
          </div>
        </div>

        {/* Location Column */}
        <div>
          <h4 className="flex items-center gap-2 font-serif text-xl text-gold">
            <MapPin size={18} /> Our Location
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            {ADDRESS}
          </p>
          <p className="mt-1 text-xs text-gold/90 font-medium">
            ({LANDMARK})
          </p>
          <a
            href={GOOGLE_MAPS_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold hover:underline"
          >
            Open in Google Maps <ExternalLink size={12} />
          </a>
        </div>

        {/* Contact & WhatsApp Column */}
        <div>
          <h4 className="flex items-center gap-2 font-serif text-xl text-gold">
            <Phone size={18} /> Direct Contact
          </h4>
          <div className="mt-3 space-y-2.5 text-sm">
            {/* Primary WhatsApp redirect to 233596271289 */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-cream/50">Primary WhatsApp Line:</span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-[#25D366] hover:underline"
              >
                <MessageCircle size={15} />
                059 627 1289
              </a>
            </div>

            {/* Direct Call to 050 714 8356 */}
            <div className="pt-1">
              <span className="block text-[11px] uppercase tracking-wider text-cream/50">Direct Phone Line:</span>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="inline-flex items-center gap-2 font-medium text-cream/90 hover:text-gold"
              >
                <Phone size={15} />
                {CALL_LABEL}
              </a>
            </div>
          </div>
        </div>

        {/* Hours Column */}
        <div>
          <h4 className="flex items-center gap-2 font-serif text-xl text-gold">
            <Clock size={18} /> Studio Hours
          </h4>
          <ul className="mt-3 space-y-1.5 text-xs text-cream/70">
            <li className="flex justify-between"><span>Mon:</span> <span className="text-cream">8:00 AM – 8:00 PM</span></li>
            <li className="flex justify-between"><span>Tue:</span> <span className="text-cream">9:00 AM – 12:00 AM</span></li>
            <li className="flex justify-between"><span>Wed:</span> <span className="text-cream">9:00 AM – 8:00 PM</span></li>
            <li className="flex justify-between"><span>Thu – Sat:</span> <span className="text-cream">7:00 AM – 8:30 PM</span></li>
            <li className="flex justify-between"><span>Sun:</span> <span className="text-gold font-medium">Closed</span></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 md:flex-row max-w-6xl">
        <p>© {new Date().getFullYear()} Moredays Hairthentic. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/services" className="hover:text-gold">Services</Link>
          <Link href="/lookbook" className="hover:text-gold">Lookbook</Link>
          <Link href="/contact" className="hover:text-gold">Location &amp; Visit</Link>
        </div>
      </div>
    </footer>
  );
}
