"use client";
// One place for page-wide motion:
// - [data-reveal] elements fade/slide in once as they enter the viewport
//   (children of [data-stagger] follow in sequence; see styles/motion.css);
// - SVGs marked [data-anim] run their SMIL animations only while on screen,
//   and are frozen in place under prefers-reduced-motion;
// - a very small pointer offset (--px/--py, -1..1) drives parallax layers on
//   fine-pointer devices.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function useReveal(path: string) {
  useEffect(() => {
    const reduced = window.matchMedia(reducedQuery);
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (reduced.matches) {
      elements.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    const showAll = () => {
      if (!reduced.matches) return;
      elements.forEach((el) => el.classList.add("revealed"));
      observer.disconnect();
    };
    reduced.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", showAll);
      elements.forEach((el) => el.classList.remove("will-reveal", "revealed"));
    };
  }, [path]);
}

function useSvgAnimations(path: string) {
  useEffect(() => {
    const reduced = window.matchMedia(reducedQuery);
    const svgs = Array.from(
      document.querySelectorAll<SVGSVGElement>("svg[data-anim]"),
    );
    const visible = new Set<SVGSVGElement>();
    const sync = () =>
      svgs.forEach((svg) => {
        if (!reduced.matches && visible.has(svg)) svg.unpauseAnimations();
        else svg.pauseAnimations();
      });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const svg = entry.target as SVGSVGElement;
        if (entry.isIntersecting) visible.add(svg);
        else visible.delete(svg);
      });
      sync();
    });
    svgs.forEach((svg) => observer.observe(svg));
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
    };
  }, [path]);
}

function usePointerField() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia(reducedQuery);
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      root.style.setProperty("--px", x.toFixed(3));
      root.style.setProperty("--py", y.toFixed(3));
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches) return;
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => {
      x = 0;
      y = 0;
      apply();
    };
    window.addEventListener("pointermove", move, { passive: true });
    reduced.addEventListener("change", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", reset);
      cancelAnimationFrame(frame);
    };
  }, []);
}

export function MotionController() {
  const path = usePathname();
  useReveal(path);
  useSvgAnimations(path);
  usePointerField();
  return null;
}
