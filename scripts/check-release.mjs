// Pemeriksaan rilis atas hasil `pnpm build` dan `public/`.
// `public/cv/` dikecualikan dari pemeriksaan nomor telepon (Keputusan 3 di docs/plan.md).

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BUILD_DIRS = [".next/server/app", ".next/static"];
const APP_DIR = path.join(ROOT, ".next/server/app");
const TEXT_FILE = /\.(html|rsc|meta|json|js|css|txt|xml|svg)$|(?:llms\.txt|robots\.txt|sitemap\.xml|manifest\.webmanifest)\.body$/;

const LOCALES = ["id", "en"];
const PROJECT_COUNT = 5;
const EXPECTED_PAGES = LOCALES.length * (2 + PROJECT_COUNT);
const DESCRIPTION_LENGTH = { min: 70, max: 170 };

const PHONE = /(?:\+?62|0)[\s.-]?8\d{2}[\s.-]?\d{4}[\s.-]?\d{3,4}/;
const HIDDEN_PHOTO = /foto-[25](?!\d)/i;
const DASH = /[–—]/;
const BANNED_TEXT = /lorem ipsum|acme|john doe/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    }),
  );
  return nested.flat();
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
}

const failures = [];
const report = (file, reason) => failures.push(`${path.relative(ROOT, file)}: ${reason}`);

const buildFiles = (await Promise.all(BUILD_DIRS.map((dir) => walk(path.join(ROOT, dir))))).flat();
const htmlFiles = buildFiles.filter((file) => file.endsWith(".html"));

if (htmlFiles.length === 0) {
  console.error("Tidak ada HTML hasil build. Jalankan `pnpm build` lebih dulu.");
  process.exit(1);
}

for (const file of buildFiles.filter((name) => TEXT_FILE.test(name))) {
  const content = await readFile(file, "utf8");
  if (PHONE.test(content)) report(file, "pola nomor telepon");
  if (HIDDEN_PHOTO.test(content)) report(file, "merujuk foto yang tidak boleh terbit");
}

for (const file of htmlFiles) {
  const text = visibleText(await readFile(file, "utf8"));
  if (DASH.test(text)) report(file, "em dash atau en dash pada teks terlihat");
  if (BANNED_TEXT.test(text)) report(file, "teks terlarang");
}

/** Nilai atribut dari tag pertama yang cocok, tanpa bergantung pada urutan atribut. */
function metaContent(html, attribute, value) {
  const tag = html.match(new RegExp(`<meta[^>]*${attribute}="${value}"[^>]*>`))?.[0];
  return tag?.match(/content="([^"]*)"/)?.[1];
}

function hreflangs(html) {
  const entries = {};
  for (const [tag] of html.matchAll(/<link[^>]*rel="alternate"[^>]*>/g)) {
    const lang = tag.match(/hreflang="([^"]+)"/i)?.[1];
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (lang && href) entries[lang] = href;
  }
  return entries;
}

/** Tipe yang wajib ada per jenis halaman, dan properti wajib per tipe. */
const REQUIRED_TYPES = {
  home: ["Person", "WebSite", "ProfilePage"],
  about: ["Person", "WebSite", "ProfilePage", "BreadcrumbList"],
  project: ["Person", "WebSite", "CreativeWork", "BreadcrumbList"],
};
const REQUIRED_PROPERTIES = {
  Person: ["@id", "name", "jobTitle", "url", "sameAs", "knowsAbout", "alumniOf"],
  WebSite: ["@id", "url", "name", "inLanguage"],
  ProfilePage: ["@id", "url", "name", "mainEntity", "isPartOf"],
  CreativeWork: ["@id", "url", "name", "description", "contributor", "temporalCoverage"],
  BreadcrumbList: ["@id", "itemListElement"],
};

function checkJsonLd(file, html, kind) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) return report(file, `JSON-LD: ${blocks.length} blok, seharusnya 1`);

  const raw = blocks[0][1];
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    return report(file, `JSON-LD tidak valid: ${error.message}`);
  }
  if (data["@context"] !== "https://schema.org") report(file, "JSON-LD: @context salah");
  if (/telephone|faxNumber/i.test(raw)) report(file, "JSON-LD memuat telephone");
  if (DASH.test(raw)) report(file, "JSON-LD memuat em dash atau en dash");

  const nodes = data["@graph"] ?? [];
  const types = nodes.map((node) => node["@type"]);
  for (const type of REQUIRED_TYPES[kind]) {
    if (!types.includes(type)) report(file, `JSON-LD: tipe ${type} tidak ada`);
  }
  for (const node of nodes) {
    for (const property of REQUIRED_PROPERTIES[node["@type"]] ?? []) {
      const value = node[property];
      if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
        report(file, `JSON-LD: ${node["@type"]}.${property} kosong`);
      }
    }
  }

  // Setiap rujukan `@id` harus menunjuk node di graph yang sama.
  const ids = new Set(nodes.map((node) => node["@id"]));
  for (const [, reference] of raw.matchAll(/\{"@id":"([^"]+)"\}/g)) {
    if (!ids.has(reference)) report(file, `JSON-LD: rujukan ${reference} tidak ditemukan`);
  }

  const person = nodes.find((node) => node["@type"] === "Person");
  const sameAs = (person?.sameAs ?? []).join(" ");
  if (!/linkedin\.com/.test(sameAs) || !/github\.com/.test(sameAs)) report(file, "JSON-LD: sameAs tanpa LinkedIn atau GitHub");

  const trail = nodes.find((node) => node["@type"] === "BreadcrumbList")?.itemListElement ?? [];
  trail.forEach((item, index) => {
    if (item.position !== index + 1 || !item.name || !/^https?:/.test(item.item ?? "")) {
      report(file, `JSON-LD: item breadcrumb ${index + 1} tidak lengkap`);
    }
  });
}

function checkHeadings(file, html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/g, " ");
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));
  if (levels.filter((level) => level === 1).length !== 1) report(file, "heading: h1 harus tepat satu");
  if (levels[0] !== 1) report(file, "heading: elemen pertama bukan h1");
  levels.forEach((level, index) => {
    if (index > 0 && level > levels[index - 1] + 1) report(file, `heading: lompat dari h${levels[index - 1]} ke h${level}`);
  });
}

const pages = htmlFiles
  .map((file) => ({ file, route: `/${path.relative(APP_DIR, file).replaceAll("\\", "/").replace(/\.html$/, "")}` }))
  .filter(({ route }) => LOCALES.some((locale) => route === `/${locale}` || route.startsWith(`/${locale}/`)));

if (pages.length !== EXPECTED_PAGES) report(APP_DIR, `${pages.length} halaman, seharusnya ${EXPECTED_PAGES}`);

const alternatesByRoute = new Map();
const titles = new Set();
let origin;

for (const { file, route } of pages) {
  const html = await readFile(file, "utf8");
  const [, locale, ...rest] = route.split("/");
  const suffix = rest.length > 0 ? `/${rest.join("/")}` : "";
  const kind = rest[0] === "projects" ? "project" : rest[0] === "about" ? "about" : "home";

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = metaContent(html, "name", "description");
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0]?.match(/href="([^"]+)"/)?.[1];

  // Keunikan per bahasa: pasangan hreflang boleh berjudul sama bila nama dan perannya sama.
  if (!title) report(file, "tanpa title");
  else if (titles.has(`${locale}:${title}`)) report(file, `title kembar: ${title}`);
  titles.add(`${locale}:${title}`);

  if (!description) report(file, "tanpa meta description");
  else if (description.length < DESCRIPTION_LENGTH.min || description.length > DESCRIPTION_LENGTH.max) {
    report(file, `meta description ${description.length} karakter`);
  }
  if (DASH.test(title ?? "") || DASH.test(description ?? "")) report(file, "metadata memuat em dash atau en dash");

  if (!canonical) {
    report(file, "tanpa canonical");
  } else {
    origin ??= new URL(canonical).origin;
    if (canonical !== `${origin}${route}`) report(file, `canonical salah: ${canonical}`);
  }

  const languages = hreflangs(html);
  alternatesByRoute.set(route, languages);
  for (const code of LOCALES) {
    if (languages[code] !== `${origin}/${code}${suffix}`) report(file, `hreflang ${code} salah: ${languages[code]}`);
  }
  if (languages["x-default"] !== `${origin}/id${suffix}`) report(file, `x-default salah: ${languages["x-default"]}`);

  if (metaContent(html, "property", "og:url") !== `${origin}${route}`) report(file, "og:url salah");
  if (!metaContent(html, "property", "og:title")) report(file, "tanpa og:title");
  if (metaContent(html, "property", "og:locale") !== (locale === "id" ? "id_ID" : "en_US")) report(file, "og:locale salah");
  if (metaContent(html, "name", "twitter:card") !== "summary_large_image") report(file, "twitter:card salah");

  const expectedImage = `${origin}${kind === "project" ? route : `/${locale}`}/opengraph-image`;
  const image = metaContent(html, "property", "og:image");
  if (!image?.startsWith(expectedImage)) report(file, `og:image salah: ${image}`);

  checkJsonLd(file, html, kind);
  checkHeadings(file, html);
}

// hreflang harus timbal balik: setiap target menunjuk balik ke kumpulan yang sama.
for (const [route, languages] of alternatesByRoute) {
  for (const code of LOCALES) {
    const target = alternatesByRoute.get(new URL(languages[code] ?? "http://x/").pathname);
    if (JSON.stringify(target) !== JSON.stringify(languages)) report(route, `hreflang tidak timbal balik dengan ${code}`);
  }
}

const sitemap = await readFile(path.join(APP_DIR, "sitemap.xml.body"), "utf8").catch(() => "");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== EXPECTED_PAGES) report("sitemap.xml", `${sitemapUrls.length} URL, seharusnya ${EXPECTED_PAGES}`);
for (const { route } of pages) {
  if (!sitemapUrls.includes(`${origin}${route}`)) report("sitemap.xml", `tanpa ${route}`);
}
if ((sitemap.match(/<xhtml:link/g) ?? []).length !== EXPECTED_PAGES * 3) report("sitemap.xml", "jumlah hreflang salah");

const robots = await readFile(path.join(APP_DIR, "robots.txt.body"), "utf8").catch(() => "");
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) report("robots.txt", "tanpa Sitemap");
if (/^Disallow: \/\s*$/m.test(robots)) report("robots.txt", "memblokir seluruh situs");

const llms = await readFile(path.join(APP_DIR, "llms.txt.body"), "utf8").catch(() => "");
if (!llms.startsWith("# ")) report("llms.txt", "tidak diawali judul");
if (DASH.test(llms)) report("llms.txt", "memuat em dash atau en dash");

for (const file of await walk(path.join(ROOT, "public"))) {
  const relative = path.relative(path.join(ROOT, "public"), file).replaceAll("\\", "/");
  if (HIDDEN_PHOTO.test(relative)) report(file, "foto yang tidak boleh terbit ada di public");
  if (!relative.startsWith("cv/") && TEXT_FILE.test(file) && PHONE.test(await readFile(file, "utf8"))) {
    report(file, "pola nomor telepon");
  }
}

if (failures.length > 0) {
  console.error(`pnpm check gagal:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`pnpm check lolos: ${htmlFiles.length} halaman HTML dan ${buildFiles.length} file build diperiksa.`);
if (origin?.includes("localhost")) {
  console.warn(`Peringatan: URL situs di build ini ${origin}. Vercel mengisinya otomatis; di tempat lain set NEXT_PUBLIC_SITE_URL.`);
}
