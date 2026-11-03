export const WA_NUMBER = "233596271289"; // Main WhatsApp redirect
export const CALL_NUMBER = "+233507148356"; // Direct phone call number
export const WA_LABEL = "059 627 1289 (WhatsApp)";
export const CALL_LABEL = "050 714 8356 (Call)";

export const PHONES = [
  { label: "059 627 1289 (WhatsApp)", tel: "+233596271289", isWhatsApp: true },
  { label: "050 714 8356 (Direct Call)", tel: "+233507148356", isWhatsApp: false },
];

export const ADDRESS = "GZ-133, 2757 HILDAS ST, 1679 Teshie Tebibianor, Accra, Ghana";
export const DIGITAL_ADDRESS = "GZ-133-2757";
export const LANDMARK = "Beside Original Don, Hildas St, Teshie Tebibianor";

export const GOOGLE_MAPS_EMBED =
  "https://maps.google.com/maps?q=Moredays%20Hairthentic%2C%20GZ-133%2C%202757%20HILDAS%20ST%2C%201679%20Teshie%20Tebibianor%2C%20Accra%2C%20Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed";

export const GOOGLE_MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Moredays+Hairthentic+GZ-133+2757+HILDAS+ST+Teshie+Tebibianor+Accra+Ghana";

export const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Moredays+Hairthentic+GZ-133+2757+HILDAS+ST+Teshie+Tebibianor+Accra+Ghana";

export const getWhatsAppLink = (message?: string) => {
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${WA_NUMBER}${query}`;
};

export const getWhatsAppApiLink = (message?: string) => {
  const query = message ? `&text=${encodeURIComponent(message)}` : "";
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}${query}`;
};

export const HOURS = [
  ["Monday", "8:00 AM – 8:00 PM"],
  ["Tuesday", "9:00 AM – 12:00 AM"],
  ["Wednesday", "9:00 AM – 8:00 PM"],
  ["Thursday – Saturday", "7:00 AM – 8:30 PM"],
  ["Sunday", "Closed"],
];

export const CATEGORIES = ["Braids & Lines", "Wigs & Extensions", "Hair Care"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Service = {
  name: string;
  time: string;
  note: string;
  image: string;
  popular?: boolean;
};

export const SERVICES: Record<Category, { blurb: string; items: Service[] }> = {
  "Braids & Lines": {
    blurb: "Neat partings, light tension, and long-lasting protective finishes.",
    items: [
      {
        name: "Box Braids",
        time: "5–7 hrs",
        note: "Classic, versatile, protective style with lightweight feel.",
        image: "/images/services/box-braids.jpg",
        popular: true,
      },
      {
        name: "Knotless Braids",
        time: "6–8 hrs",
        note: "Painless at roots, ultra-flat base, seamless natural flow.",
        image: "/images/services/knotless-braids.jpg",
        popular: true,
      },
      {
        name: "Cornrows",
        time: "1–4 hrs",
        note: "Straight-back, feed-in, and custom geometric scalp designs.",
        image: "/images/services/cornrows.jpg",
      },
      {
        name: "Stitch Lines",
        time: "2–4 hrs",
        note: "Crisp razor-sharp lines sculpted with clean precision.",
        image: "/images/services/stitch-lines.jpg",
      },
      {
        name: "Twists",
        time: "4–6 hrs",
        note: "Passion, spring, Marley, and mini twists full of bounce.",
        image: "/images/services/twists.jpg",
      },
    ],
  },
  "Wigs & Extensions": {
    blurb: "Melted lace, precision customization, and flawless natural finish.",
    items: [
      {
        name: "Wig Installation",
        time: "1–2 hrs",
        note: "Lace frontal and closure installs with skin-tone melting.",
        image: "/images/services/wig-installation.jpg",
        popular: true,
      },
      {
        name: "Custom Wig Cap Creation",
        time: "2–3 hrs",
        note: "Handcrafted to your exact head measurements for snug fit.",
        image: "/images/services/wig-cap.jpg",
      },
      {
        name: "Wig Revamping",
        time: "1–2 hrs",
        note: "Deep wash, conditioning, defrizzing, restyling, and plucking.",
        image: "/images/services/wig-revamping.jpg",
      },
      {
        name: "Pixie Cut",
        time: "1–2 hrs",
        note: "Precision-molded short hairstyles, expertly shaped and styled.",
        image: "/images/services/pixie-cut.jpg",
      },
    ],
  },
  "Hair Care": {
    blurb: "Healthy roots and nourished crowns are the bedrock of great styling.",
    items: [
      {
        name: "Wash & Deep Condition",
        time: "1–1.5 hrs",
        note: "Clarifying cleanse followed by intense hydrating steam mask.",
        image: "/images/services/wash-deep-condition.jpg",
        popular: true,
      },
      {
        name: "Wash & Stretch",
        time: "1.5–2 hrs",
        note: "Blow-dry stretch with heat protectant, perfect for braiding.",
        image: "/images/services/wash-stretch.jpg",
      },
      {
        name: "Blow-Dry",
        time: "1 hr",
        note: "Silky smooth, low-heat finish maintaining natural moisture.",
        image: "/images/services/blow-dry.jpg",
      },
      {
        name: "Locs & Tightening",
        time: "1.5–3 hrs",
        note: "Palm-roll or crochet loc retwisting, scalp cleanse & detox.",
        image: "/images/services/locs-tightening.jpg",
      },
    ],
  },
};

export type Look = { id: number; title: string; cat: string; alt: number };

export const LOOKS: Look[] = [
  { id: 1, title: "Mini Twists", cat: "Twists", alt: 6 },
  { id: 2, title: "Boho Knotless", cat: "Braids", alt: 9 },
  { id: 3, title: "Cornrow Lines", cat: "Cornrows", alt: 4 },
  { id: 4, title: "Feed-in Cornrows", cat: "Cornrows", alt: 3 },
  { id: 6, title: "Curly-End Twists", cat: "Twists", alt: 1 },
  { id: 7, title: "Waist-Length Cornrows", cat: "Cornrows", alt: 8 },
  { id: 8, title: "Men's Cornrows", cat: "Cornrows", alt: 7 },
  { id: 9, title: "Burgundy Knotless", cat: "Braids", alt: 2 },
];

export const FILTERS = ["All", "Braids", "Twists", "Cornrows"];
