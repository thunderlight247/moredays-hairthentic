import { ADDRESS, PHONES } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="bg-espresso px-5 py-14 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><p className="font-serif text-3xl">Moredays <span className="text-gold">Hairthentic</span></p><p className="mt-2 text-sm text-cream/60">Authentic care for your crown.</p></div>
        <p className="text-sm leading-relaxed text-cream/70">{ADDRESS}<br />(Beside Original Don)</p>
        <p className="text-sm leading-relaxed text-cream/70">{PHONES.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-gold">{p.label}</a>)}</p>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-cream/10 pt-6 text-xs text-cream/40">© {new Date().getFullYear()} Moredays Hairthentic</p>
    </footer>
  );
}
