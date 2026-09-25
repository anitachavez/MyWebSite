import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("gallery keyboard, focus, PDFs and opt-in embedded video work", async ({
  page,
}) => {
  let providerRequests = 0;
  await page.route("https://www.youtube-nocookie.com/**", async (route) => {
    providerRequests++;
    await route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="en"><title>Test video</title><body><main>Synthetic video provider response</main></body></html>',
    });
  });
  await page.route("**/__test/document.pdf", (route) =>
    route.fulfill({
      contentType: "application/pdf",
      body: readFileSync("tests/fixtures/document.pdf"),
    }),
  );
  await page.goto("/media-component-test");
  const trigger = page.getByRole("button", { name: "Enlarge: Test image one" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Test gallery" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("img", { name: "Test image one" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(
    dialog.getByRole("img", { name: "Test image two" }),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Next" }).click();
  await expect(
    dialog.getByRole("img", { name: "Test image one" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Read PDF" }).click();
  await expect(page.locator("object")).toHaveAttribute(
    "data",
    "/__test/document.pdf",
  );
  await expect(
    page.getByRole("link", { name: "Download Test document" }),
  ).toHaveAttribute("download", "");
  await page.getByRole("button", { name: "Close viewer" }).click();
  await expect(page.locator("object")).toHaveCount(0);
  expect(providerRequests).toBe(0);
  await expect(page.locator("iframe")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Load video: Test embedded video" })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/test-video",
  );
  await expect.poll(() => providerRequests).toBe(1);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("local video plays with native controls and caption track", async ({
  page,
}) => {
  await page.goto("/");
  const bytes = await page.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 90;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#efa1c5";
    context.fillRect(0, 0, 160, 90);
    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:999";
    document.body.appendChild(canvas);
    const stream = canvas.captureStream(0);
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp8",
    });
    const chunks: Blob[] = [];
    return await new Promise<number[]>((resolve) => {
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        resolve(
          Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer())),
        );
        stream.getTracks().forEach((track) => track.stop());
      };
      recorder.onstart = () => {
        let frame = 0;
        const timer = setInterval(() => {
          context.fillStyle = frame % 2 ? "#813357" : "#efa1c5";
          context.fillRect(0, 0, 160, 90);
          (
            stream.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack
          ).requestFrame();
          frame++;
          if (frame === 15) {
            clearInterval(timer);
            setTimeout(() => recorder.stop(), 200);
          }
        }, 80);
      };
      recorder.start();
    });
  });
  expect(bytes.length).toBeGreaterThan(200);
  await page.route("**/__test/clip.webm", (route) =>
    route.fulfill({ contentType: "video/webm", body: Buffer.from(bytes) }),
  );
  await page.route("**/__test/captions.vtt", (route) =>
    route.fulfill({
      contentType: "text/vtt",
      body: "WEBVTT\n\n00:00.000 --> 00:01.000\nSynthetic test footage\n",
    }),
  );
  await page.goto("/media-component-test");
  const video = page.getByLabel("Test local video", { exact: true });
  await expect(video).toHaveAttribute("controls", "");
  await expect(video.locator("track")).toHaveAttribute("kind", "captions");
  await video.scrollIntoViewIfNeeded();
  await video.evaluate(async (el) => {
    await (el as HTMLVideoElement).play();
  });
  await expect
    .poll(() => video.evaluate((el) => (el as HTMLVideoElement).readyState))
    .toBeGreaterThanOrEqual(2);
  await expect(
    page.getByRole("link", { name: "Read transcript" }),
  ).toHaveAttribute("href", "/__test/transcript.txt");
});
