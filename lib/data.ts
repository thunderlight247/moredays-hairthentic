export const WA_NUMBER = "233507148356";
export const PHONES = [{ label: "050 714 8356 (WhatsApp)", tel: "+233507148356" }, { label: "059 627 1289", tel: "+233596271289" }];
export const ADDRESS = "GZ-133, 2757 HILDAS ST, 1679 Teshie Tebibianor, Accra, Ghana";
export const HOURS = [
  ["Monday", "8:00 AM – 8:00 PM"], ["Tuesday", "9:00 AM – 12:00 AM"], ["Wednesday", "9:00 AM – 8:00 PM"],
  ["Thursday – Saturday", "7:00 AM – 8:30 PM"], ["Sunday", "Closed"],
];
export const CATEGORIES = ["Braids & Lines", "Wigs & Extensions", "Hair Care"];
export type Service = { name: string; time: string; note: string };
export const SERVICES: Record<string, { blurb: string; items: Service[] }> = {
  "Braids & Lines": { blurb: "Neat partings, light tension, flawless finish.", items: [
    { name: "Box Braids", time: "5–7 hrs", note: "Classic, versatile, protective." },
    { name: "Knotless Braids", time: "6–8 hrs", note: "Lighter on the scalp, natural flow." },
    { name: "Cornrows", time: "1–4 hrs", note: "Straight-back, feed-in and custom patterns." },
    { name: "Stitch Lines", time: "2–4 hrs", note: "Crisp, sculpted lines." },
    { name: "Twists", time: "4–6 hrs", note: "Passion, spring and mini twists." } ] },
  "Wigs & Extensions": { blurb: "Precision work for a seamless, natural look.", items: [
    { name: "Wig Installation", time: "1–2 hrs", note: "Frontal and closure installs." },
    { name: "Custom Wig Cap Creation", time: "2–3 hrs", note: "Made to fit you." },
    { name: "Wig Revamping", time: "1–2 hrs", note: "Fresh life for a tired unit." },
    { name: "Pixie Cut", time: "1–2 hrs", note: "Shaped and styled." } ] },
  "Hair Care": { blurb: "Healthy hair is the foundation of every great style.", items: [
    { name: "Wash & Deep Condition", time: "1–1.5 hrs", note: "Cleanse, hydrate, restore." },
    { name: "Wash & Stretch", time: "1.5–2 hrs", note: "Blow-dry stretch, braid-ready." },
    { name: "Blow-Dry", time: "1 hr", note: "Smooth, low-heat finish." },
    { name: "Locs & Tightening", time: "1.5–3 hrs", note: "Retwist and maintenance." } ] },
};
export type Look = { id: number; title: string; cat: string; alt: number };
export const LOOKS: Look[] = [
  { id: 1, title: "Mini Twists", cat: "Twists", alt: 6 }, { id: 2, title: "Boho Knotless", cat: "Braids", alt: 9 },
  { id: 3, title: "Cornrow Lines", cat: "Cornrows", alt: 4 }, { id: 4, title: "Feed-in Cornrows", cat: "Cornrows", alt: 3 },
  { id: 6, title: "Curly-End Twists", cat: "Twists", alt: 1 }, { id: 7, title: "Waist-Length Cornrows", cat: "Cornrows", alt: 8 },
  { id: 8, title: "Men's Cornrows", cat: "Cornrows", alt: 7 }, { id: 9, title: "Burgundy Knotless", cat: "Braids", alt: 2 },
];
export const FILTERS = ["All", "Braids", "Twists", "Cornrows"];
