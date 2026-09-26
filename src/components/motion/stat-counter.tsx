"use client";
// Counts a stat up from zero the first time it scrolls into view.
// Only values that start with a whole number animate ("250", "900k+", "110+ lb");
// anything else ("Top 3", "< 15 s") is shown as written. The real value is always
// the server-rendered text and the accessible text, so it is correct without JS.
import { useEffect, useRef } from "react";
import { parseStat } from "@/data/portfolio";

export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parsed = parseStat(value);
    if (!el || !parsed || parsed.number < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return; // already visible
    el.textContent = `0${parsed.suffix}`;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = Math.min(1800, 900 + parsed.number * 2);
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(parsed.number * eased)}${parsed.suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
