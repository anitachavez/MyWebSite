import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/recognition",
  "/media",
  "/competitions",
  "/leadership",
  "/resume",
  "/contact",
  "/projects/robotic-hot-cell",
  "/projects/path-planning-testbed",
  "/projects/swerve-drive-climber",
  "/projects/ntp-engine",
  "/projects/inner-ear-delivery",
];
test("all routes render accessibly without overflow or browser errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // Audit the settled composition, not elements caught mid-fade by the reveal system.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    // TODO values in content/site.json must never reach the page.
    expect(await page.locator("body").innerText(), route).not.toMatch(/TODO/);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      audit.violations,
      `${route}: ${JSON.stringify(audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.screenshot({
    path: `artifacts/home-${info.project.name}.png`,
    fullPage: true,
  });
  await page.goto("/projects");
  await page.screenshot({
    path: `artifacts/projects-${info.project.name}.png`,
    fullPage: true,
  });
});
test("project filters and case-study navigation work", async ({ page }) => {
  await page.goto("/projects");
  await page
    .getByRole("button", { name: "Materials research", exact: true })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Materials research", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator(".project-card").click();
  await expect(page).toHaveURL(/projects\/inner-ear-delivery/);
  await expect(
    page.getByRole("heading", { name: "Inner-Ear Nanoparticle Delivery Modeling", level: 1 }),
  ).toBeVisible();
  // Empty media/document arrays render no media sections at all.
  await expect(page.locator("#media, #documents")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Read PDF" })).toHaveCount(0);
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(5);
});
test("navigation supports keyboard and reduced motion", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  expect(
    await page
      .locator(".orbit-precess")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "About me" })
      .click();
    await expect(page).toHaveURL(/about/);
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
});
test("missing pages return 404", async ({ page }) => {
  for (const path of ["/unknown-page", "/projects/unknown-project"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Uncharted territory." }),
    ).toBeVisible();
  }
});

test("compact widths and secondary navigation remain usable", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/about",
      "/media",
      "/competitions",
      "/projects/ntp-engine",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
  await page.setViewportSize(
    info.project.name === "mobile"
      ? { width: 390, height: 844 }
      : { width: 1440, height: 1000 },
  );
  await page.goto("/");
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
  } else {
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).not.toBeVisible();
    await page.getByRole("button", { name: "More", exact: true }).click();
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Media & interviews", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page).toHaveURL(/\/media$/);
  await page.goto("/projects/ntp-engine");
  await page.getByRole("link", { name: "02 Research question" }).click();
  await expect(page).toHaveURL(/#question$/);
});

test("contact shows real channels and copies the email", async ({ page, context, browserName }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "chavezas@mail.uc.edu" }).first()).toHaveAttribute(
    "href",
    "mailto:chavezas@mail.uc.edu",
  );
  await expect(page.locator("main a[href^='tel:']")).toHaveCount(0);
  if (browserName === "chromium") await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toContainText("copied");
});
