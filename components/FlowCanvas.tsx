"use client";
import { useEffect, useRef } from "react";

// Animated gold "background paths" canvas (React Bits / 21st.dev inspired)
export default function FlowCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, w = 0, h = 0;
    const resize = () => { const d = Math.min(devicePixelRatio, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, w * 0.7);
      g.addColorStop(0, "rgba(212,175,55,0.18)"); g.addColorStop(1, "rgba(253,251,247,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 9; i++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 12) {
          const y = h * (0.15 + i * 0.08) + Math.sin(x * 0.004 + t * 0.0004 + i * 0.7) * (30 + i * 6) + Math.cos(x * 0.0019 - t * 0.0003) * 24;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(168,131,42,${0.1 + i * 0.025})`; ctx.lineWidth = 1.2; ctx.stroke();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
