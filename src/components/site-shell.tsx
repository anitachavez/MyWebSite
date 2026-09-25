"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/portfolio";
const moreLinks = [
  { href: "/media", label: "Media & interviews" },
  { href: "/competitions", label: "Competitions" },
  { href: "/leadership", label: "Leadership & involvement" },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const path = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (more) {
          setMore(false);
          document.getElementById("more-toggle")?.focus();
        } else if (open) {
          setOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }
    };
    const outside = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node))
        setMore(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, more]);
  const close = () => {
    setOpen(false);
    setMore(false);
  };
  return (
    <header className="header-wrap">
      <div className="site-header shell">
        <Link
          href="/"
          className="wordmark"
          aria-label="Ana Sofía, home"
          onClick={close}
        >
          as
          <span className="brand-orbit" aria-hidden="true" />{" "}
          <span className="wordmark-caption">
            ANA SOFÍA
            <br />
            CHÁVEZ SALAS
          </span>
        </Link>
        <button
          id="menu-toggle"
          className="menu-toggle icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={path.startsWith(item.href) ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <div
            className="more-nav"
            ref={moreRef}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setMore(false);
            }}
          >
            <button
              id="more-toggle"
              aria-expanded={more}
              aria-controls="more-links"
              onClick={() => setMore(!more)}
            >
              More
              <ChevronDown size={13} />
            </button>
            <div id="more-links" className="more-links" hidden={!more}>
              {moreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={path === item.href ? "page" : undefined}
                >
                  {item.label}
                  <ArrowUpRight size={13} />
                </Link>
              ))}
            </div>
          </div>
          <div className="mobile-extra">
            {moreLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/resume"
            className="resume-nav"
            aria-current={path === "/resume" ? "page" : undefined}
            onClick={close}
          >
            Resume
            <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06 },
    );
    elements.forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    const show = () => {
      if (media.matches) {
        elements.forEach((el) => el.classList.add("revealed"));
        observer.disconnect();
      }
    };
    media.addEventListener("change", show);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", show);
      elements.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, [path]);
  return null;
}
export function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link href="/" className="footer-brand">
          ana <span className="serif-accent">sofía.</span>
        </Link>
        <p>Aerospace. Materials. Possibility.</p>
      </div>
      <div className="footer-links">
        {[
          ...navigation,
          ...moreLinks,
          { href: "/resume", label: "Resume" },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
            <ArrowUpRight size={13} />
          </Link>
        ))}
      </div>
      <div className="footer-bottom">
        <span>Ana Sofía Chávez Salas</span>
        <span>
          <span className="tiny-dot" />
          ENGINEERING PORTFOLIO
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
