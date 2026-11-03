"use client";
import { createElement, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React Bits–style split-text headline, built with GSAP
export default function WordReveal({
  text,
  className = "",
  as = "h1",
  scroll = false,
  highlight,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  scroll?: boolean;
  highlight?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const highlightWords = highlight ? highlight.split(" ") : [];

  useEffect(() => {
    if (scroll) gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".w", {
        yPercent: 115,
        opacity: 0,
        rotate: 4,
        duration: 1,
        stagger: 0.09,
        ease: "power4.out",
        delay: scroll ? 0 : 0.2,
        ...(scroll
          ? { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }
          : {}),
      });
    }, ref);
    return () => ctx.revert();
  }, [scroll]);

  return createElement(
    as,
    { ref, className },
    text.split(" ").map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
        <span
          className={`w inline-block${
            highlightWords.includes(w)
              ? " bg-gradient-to-r from-gold via-bronze to-gold bg-clip-text text-transparent"
              : ""
          }`}
        >
          {w}
        </span>
      </span>
    ))
  );
}
