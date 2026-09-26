// Server-only helpers. Asset paths in content/site.json are only used when the file
// is actually in /public (or is an https URL), so a missing file never produces a
// broken link or image. Rebuild after adding assets in production.
import { existsSync } from "node:fs";
import path from "node:path";
import { contact, profile, type Photo } from "@/data/portfolio";

export function assetExists(src?: string) {
  if (!src) return false;
  if (src.startsWith("https://")) return true;
  if (!src.startsWith("/")) return false;
  return existsSync(path.join(process.cwd(), "public", src));
}

export const availablePhotos = (photos: Photo[] = []) =>
  photos.filter((p) => assetExists(p.src));

export const resumeHref = () =>
  assetExists(contact.resume) ? contact.resume : undefined;

export const portraitPhoto = (): Photo | undefined =>
  profile.portrait?.src && assetExists(profile.portrait.src)
    ? {
        src: profile.portrait.src,
        alt: profile.portrait.alt ?? profile.fullName,
      }
    : undefined;
