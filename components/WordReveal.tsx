"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// React Bits–style split-text headline, built with GSAP
export default function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".w", { yPercent: 110, opacity: 0, rotate: 4, duration: 1, stagger: 0.09, ease: "power4.out", delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <h1 ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]"><span className="w inline-block">{w}</span></span>
      ))}
    </h1>
  );
}
