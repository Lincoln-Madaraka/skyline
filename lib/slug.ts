export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function uniqueSlug(
  base: string,
  exists: (s: string) => Promise<boolean>
) {
  const root = slugify(base) || "listing";
  let candidate = root;
  let i = 2;
  while (await exists(candidate)) {
    candidate = `${root}-${i++}`;
    if (i > 999) {
      candidate = `${root}-${Date.now()}`;
      break;
    }
  }
  return candidate;
}
