"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import type { SectionLink } from "@/data/portfolio";

// resumeHref is set only when the PDF exists; otherwise "Resume" goes to /resume.
export function SiteHeader({
  primary,
  more,
  resumeHref,
}: {
  primary: SectionLink[];
  more: SectionLink[];
  resumeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const moreRef = useRef<HTMLLIElement>(null);
  const isCurrent = (href: string) =>
    path === href || path.startsWith(`${href}/`);
  const moreActive = more.some((m) => isCurrent(m.href));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (moreOpen) {
        setMoreOpen(false);
        document.getElementById("more-toggle")?.focus();
      } else if (open) {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, moreOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setMoreOpen(false);
  };
  const resume = resumeHref ? (
    <a
      href={resumeHref}
      target="_blank"
      rel="noopener noreferrer"
      className="resume-nav"
      onClick={close}
    >
      Resume
      <ArrowUpRight size={14} aria-hidden="true" />
      <span className="sr-only">(PDF, opens in a new tab)</span>
    </a>
  ) : (
    <Link
      href="/resume"
      className="resume-nav"
      aria-current={isCurrent("/resume") ? "page" : undefined}
      onClick={close}
    >
      Resume
      <ArrowUpRight size={14} aria-hidden="true" />
    </Link>
  );

  return (
    <header className={`header-wrap ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <div className="site-header shell">
        <Link href="/" className="wordmark" aria-label="Home: Ana Sofía Chávez Salas" onClick={close}>
          <span className="wordmark-mark" aria-hidden="true">
            as
            <span className="brand-orbit" />
          </span>
          <span className="wordmark-caption" aria-hidden="true">
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
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="main-nav"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          <ul className="nav-list">
            {primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={close}
                >
                  <span className="nav-node" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="more-nav" ref={moreRef}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setMoreOpen(false);
              }}
            >
              <button
                id="more-toggle"
                className={`nav-link ${moreActive ? "is-current" : ""}`}
                aria-expanded={moreOpen}
                aria-controls="more-links"
                onClick={() => setMoreOpen(!moreOpen)}
              >
                <span className="nav-node" aria-hidden="true" />
                More
                <ChevronDown size={13} aria-hidden="true" />
              </button>
              <div id="more-links" className="more-links" hidden={!moreOpen}>
                {more.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    <span className="more-text">
                      {item.label}
                      <small aria-hidden="true">{item.description}</small>
                    </span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </li>
          </ul>
          <ul className="mobile-extra">
            {more.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  onClick={close}
                >
                  <span className="nav-node" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {resume}
        </nav>
      </div>
    </header>
  );
}
