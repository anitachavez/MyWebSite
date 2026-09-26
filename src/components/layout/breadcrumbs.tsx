"use client";
// [← Home]  Section / Page. Home is the obvious control; the rest of the trail
// is quieter orientation. Hidden on the home page itself.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function Breadcrumbs({ labels }: { labels: Record<string, string> }) {
  const path = usePathname();
  if (path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  const trail = parts
    .map((_, i) => {
      const href = `/${parts.slice(0, i + 1).join("/")}`;
      return { href, label: labels[href] };
    })
    .filter((c) => c.label);
  return (
    <nav className="breadcrumbs shell" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/" className="crumb-home">
            <ArrowLeft size={16} aria-hidden="true" />
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.href} className="crumb">
            {i > 0 && (
              <span className="crumb-sep" aria-hidden="true">
                /
              </span>
            )}
            {i === trail.length - 1 ? (
              <span aria-current="page">{c.label}</span>
            ) : (
              <Link href={c.href}>{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
