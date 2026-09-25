import {
  mkdir,
  readFile,
  writeFile,
  unlink,
  rmdir,
  access,
} from "node:fs/promises";
import path from "node:path";
export default async function setup() {
  const dir = path.join(process.cwd(), "src", "app", "media-component-test");
  const target = path.join(dir, "page.tsx");
  try {
    await access(target);
    throw new Error(
      "Refusing to replace an existing media-component-test page. Remove a stale test fixture manually before running tests.",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const fixture = await readFile(
    path.join(process.cwd(), "tests", "fixtures", "media-page.tsx"),
    "utf8",
  );
  await mkdir(dir, { recursive: true });
  await writeFile(target, fixture);
  return async () => {
    await unlink(target);
    await rmdir(dir);
  };
}
