"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  FileText,
  ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import type { Photo, Video } from "@/data/portfolio";

export function MediaImage({
  photo,
  priority = false,
  className = "",
  contain = false,
}: {
  photo?: Photo;
  priority?: boolean;
  className?: string;
  contain?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  return (
    <div
      className={`media-image ${className} ${contain ? "image-contain" : ""}`}
    >
      {photo?.src && failedSrc !== photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1200px) 50vw, 700px"
          preload={priority}
          onError={() => setFailedSrc(photo.src)}
        />
      ) : failedSrc ? (
        <div className="image-placeholder">
          <ImageIcon size={26} strokeWidth={1} aria-hidden="true" />
          <span>Image unavailable</span>
        </div>
      ) : (
        <div className="image-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

export function PdfViewer({
  src,
  title,
  description,
}: {
  src?: string;
  title: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const viewerId = useId();
  if (!src) return null;
  return (
    <section className={`asset-panel ${open ? "asset-open" : ""}`}>
      <div className="asset-heading">
        <span className="document-icon">
          <FileText size={24} strokeWidth={1.3} />
        </span>
        <div>
          <span className="eyebrow">DOCUMENT / PDF</span>
          <h3>{title}</h3>
          <p>{description ?? "Read online or open the original."}</p>
        </div>
      </div>
      <div className="asset-actions">
        <button
          className="button button-small"
          aria-expanded={open}
          aria-controls={viewerId}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close viewer" : "Read PDF"}
          <FileText size={15} />
        </button>
        <a
          className="icon-button"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} PDF in a new tab`}
        >
          <ArrowUpRight size={20} />
        </a>
        <a
          className="icon-button"
          href={src}
          download
          aria-label={`Download ${title}`}
        >
          <Download size={18} />
        </a>
      </div>
      <div id={viewerId} className="pdf-container" hidden={!open}>
        {open && (
          <>
            <p className="pdf-fallback">
              If your browser cannot preview this document,{" "}
              <a href={src} target="_blank" rel="noopener noreferrer">
                open the original PDF ↗
              </a>
              .
            </p>
            <object
              className="pdf-viewer"
              data={src}
              type="application/pdf"
              aria-label={title}
            >
              <p>
                Preview unavailable. <a href={src}>Open the PDF</a>.
              </p>
            </object>
          </>
        )}
      </div>
    </section>
  );
}

function safeEmbed(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (
      ["www.youtube-nocookie.com", "www.youtube.com"].includes(
        parsed.hostname,
      ) &&
      /^\/embed\/[\w-]+$/.test(parsed.pathname)
    )
      return `https://www.youtube-nocookie.com${parsed.pathname}`;
    if (
      parsed.hostname === "player.vimeo.com" &&
      /^\/video\/\d+$/.test(parsed.pathname)
    )
      return `https://player.vimeo.com${parsed.pathname}?dnt=1`;
  } catch {
    return null;
  }
  return null;
}
export function VideoPlayer({ video }: { video?: Video }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const embed = safeEmbed(video?.embedUrl);
  if (!video || (!video.src && !embed)) return null;
  return (
    <figure className={`video-block ${video.orientation === "vertical" ? "is-vertical" : ""}`}>
      <div className="video-stage">
        {video.src ? (
          <>
            <video
              controls
              playsInline
              preload="none"
              poster={video.poster?.src}
              aria-label={video.title}
              onError={() => setFailed(true)}
            >
              <source src={video.src} />
              {video.captions && (
                <track
                  kind="captions"
                  src={video.captions}
                  srcLang={video.captionLanguage ?? "en"}
                  label="Captions"
                  default
                />
              )}
              Your browser does not support inline video.
            </video>
            {failed && (
              <p className="video-error">
                Video unavailable. <a href={video.src}>Open the video file</a>.
              </p>
            )}
          </>
        ) : loaded ? (
          <iframe
            src={embed!}
            title={video.title}
            allow="fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            className="video-load"
            onClick={() => setLoaded(true)}
            aria-label={`Load video: ${video.title}`}
          >
            <MediaImage photo={video.poster} />
            <span className="play-circle">
              <Play size={24} />
            </span>
            <span className="video-consent">
              Load video · {embed?.includes("vimeo") ? "Vimeo" : "YouTube"}
              <small>Connects to the video provider only when selected.</small>
            </span>
          </button>
        )}
      </div>
      {video.title && (
        <figcaption>
          <h3>{video.title}</h3>
          {video.description && <p>{video.description}</p>}
          {video.transcript && (
            <a className="text-link" href={video.transcript}>
              Read transcript <ArrowUpRight size={14} />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function Gallery({
  photos,
  title = "Project gallery",
}: {
  photos: Photo[];
  title?: string;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) =>
    setIndex(
      (current) => (current + direction + photos.length) % photos.length,
    );
  if (!photos.length) return null;
  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button
            key={`${photo.src}-${i}`}
            onClick={() => {
              setIndex(i);
              dialog.current?.showModal();
            }}
            aria-label={`Enlarge: ${photo.alt}`}
          >
            <MediaImage photo={photo} />
            <span className="gallery-zoom">
              <Maximize2 size={18} />
            </span>
            <span className="gallery-caption">
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              {photo.caption}
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-label={title}
        className="lightbox"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="lightbox-close icon-button"
          aria-label="Close gallery"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <div
          onTouchStart={(e) => {
            touchStart.current = e.changedTouches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current !== null) {
              const distance = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
              touchStart.current = null;
            }
          }}
        >
          <MediaImage photo={photos[index]} contain />
        </div>
        <p>{photos[index].caption}</p>
        <div className="gallery-controls">
          <button
            className="text-link"
            onClick={() => move(-1)}
            disabled={photos.length < 2}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <span className="eyebrow" aria-live="polite">
            {index + 1} / {photos.length}
          </span>
          <button
            className="text-link"
            onClick={() => move(1)}
            disabled={photos.length < 2}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </dialog>
    </>
  );
}
