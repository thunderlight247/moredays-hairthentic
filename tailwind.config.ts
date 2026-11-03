import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { cream: "#FDFBF7", alabaster: "#F3EDE2", espresso: "#1E110B", gold: "#D4AF37", bronze: "#A8832A" },
    fontFamily: { serif: ["var(--font-serif)", "serif"], sans: ["var(--font-sans)", "sans-serif"] },
    keyframes: { shimmer: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "100%": { transform: "translateX(320%) skewX(-20deg)" } } },
    animation: { shimmer: "shimmer 2.8s ease-in-out infinite" },
  } },
  plugins: [],
};
export default config;
