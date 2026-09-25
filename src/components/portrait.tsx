import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/portfolio";
import { MediaImage } from "./assets";

export function Portrait() {
  // File presence is checked on the server: no missing-image request or broken image.
  // In production, rebuild after adding or replacing the portrait.
  const available = existsSync(
    path.join(process.cwd(), "public", profile.portrait.src),
  );
  return (
    <div className="portrait-composition">
      <div className="portrait-orbit orbit-back" aria-hidden="true" />
      <div className="portrait-frame">
        {available ? (
          <MediaImage photo={profile.portrait} priority />
        ) : (
          <div className="portrait-placeholder">
            <span className="portrait-coordinate" aria-hidden="true">
              + &nbsp; +
            </span>
            <span className="portrait-monogram" aria-hidden="true">
              as.
            </span>
            <div className="portrait-pending">
              <span className="tiny-dot" /> PORTRAIT TO COME
            </div>
            <p>
              A little space for
              <br />
              the person behind the work.
            </p>
          </div>
        )}
      </div>
      <div className="portrait-orbit orbit-front" aria-hidden="true">
        <span />
      </div>
      <span className="portrait-star" aria-hidden="true">
        ✳
      </span>
      <div className="portrait-caption">
        <span>ANA SOFÍA CHÁVEZ SALAS</span>
        <span>ENGINEER IN THE MAKING</span>
      </div>
    </div>
  );
}
