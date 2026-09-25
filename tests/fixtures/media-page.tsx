// Synthetic test assets only. Temporarily mounted by Playwright; never a portfolio entry.
import { notFound } from "next/navigation";
import { Gallery, PdfViewer, VideoPlayer } from "@/components/assets";
const photo = (color: string, name: string) => ({
  src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="${color}"/><circle cx="300" cy="200" r="100" fill="#efa1c5"/></svg>`)}`,
  alt: name,
  caption: name,
});
export default function Fixture() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <div className="page-wrap shell">
      <h1>Component test fixture</h1>
      <p>Synthetic assets. Not portfolio content.</p>
      <Gallery
        title="Test gallery"
        photos={[
          photo("#15233a", "Test image one"),
          photo("#37233a", "Test image two"),
        ]}
      />
      <PdfViewer title="Test document" src="/__test/document.pdf" />
      <VideoPlayer
        video={{
          title: "Test embedded video",
          embedUrl: "https://www.youtube-nocookie.com/embed/test-video",
          poster: photo("#15233a", "Test video poster"),
        }}
      />
      <VideoPlayer
        video={{
          title: "Test local video",
          src: "/__test/clip.webm",
          captions: "/__test/captions.vtt",
          transcript: "/__test/transcript.txt",
        }}
      />
    </div>
  );
}
