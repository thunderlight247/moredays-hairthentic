"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type P = { children: React.ReactNode; onClick?: () => void; href?: string; external?: boolean; className?: string };
export default function ShimmerButton({ children, onClick, href, external, className = "" }: P) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-espresso px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-lg shadow-espresso/20 ring-1 ring-gold/60 ${className}`;
  const inner = (<>
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-shimmer bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    <span className="absolute inset-0 bg-gold opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
  </>);
  const m = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.97 } };
  if (href) return <motion.span {...m} className="inline-block">{external
    ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>}</motion.span>;
  return <motion.button {...m} onClick={onClick} className={cls}>{inner}</motion.button>;
}
