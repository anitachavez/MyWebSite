"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  };
  return (
    <div className="copy-email">
      <button
        type="button"
        className={`button button-outline ${state === "copied" ? "is-copied" : ""}`}
        onClick={copy}
      >
        {state === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {state === "copied" ? "Email copied" : "Copy email"}
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {state === "copied"
          ? `${email} copied to clipboard.`
          : state === "failed"
            ? "Copy failed. Select the address to copy it."
            : ""}
      </span>
    </div>
  );
}
