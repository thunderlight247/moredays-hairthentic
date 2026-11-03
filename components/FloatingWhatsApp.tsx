"use client";
import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { WA_NUMBER, CALL_NUMBER, CALL_LABEL, getWhatsAppApiLink } from "@/lib/data";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = "Hello Moredays Hairthentic! I would like to book an appointment or ask about your hair services.";
  const waUrl = getWhatsAppApiLink(defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip / popup pill */}
      {showTooltip && (
        <div className="relative flex max-w-xs items-center gap-2 rounded-2xl border border-espresso/10 bg-white/95 px-4 py-2.5 text-xs text-espresso shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2">
          <div className="flex-1">
            <p className="font-semibold text-espresso">Quick booking or question?</p>
            <p className="text-espresso/70">Chat on WhatsApp: <span className="font-medium text-[#128C7E]">059 627 1289</span></p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss message"
            className="rounded-full p-1 text-espresso/40 hover:bg-espresso/5 hover:text-espresso"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        {/* Direct Call Button (050 714 8356) */}
        <a
          href={`tel:${CALL_NUMBER}`}
          title={`Call us at ${CALL_LABEL}`}
          aria-label={`Call us at ${CALL_LABEL}`}
          className="group flex h-11 w-11 items-center justify-center rounded-full bg-cream text-espresso shadow-lg ring-1 ring-espresso/15 transition-all duration-300 hover:scale-105 hover:bg-espresso hover:text-cream"
        >
          <Phone size={18} />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg bg-espresso px-2.5 py-1 text-xs text-cream opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            Call {CALL_LABEL}
          </span>
        </a>

        {/* Primary WhatsApp Redirect Button (059 627 1289) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (059 627 1289)"
          aria-label="Chat on WhatsApp with Moredays Hairthentic (059 627 1289)"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 animate-ping rounded-full bg-[#25D366]/30 opacity-75" />
          <MessageCircle size={30} className="relative fill-white/20" />
        </a>
      </div>
    </div>
  );
}
