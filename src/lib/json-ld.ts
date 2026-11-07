import { credentials } from "@/content/credentials";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { seoText } from "@/content/seo";
import { skillGroups } from "@/content/skills";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { type Locale, locales } from "./i18n";
import { absoluteUrl, siteName, siteUrl } from "./seo";

type Node = Record<string, unknown>;
export type JsonLdGraph = { "@context": "https://schema.org"; "@graph": Node[] };

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

function graph(nodes: Node[]): JsonLdGraph {
  return { "@context": "https://schema.org", "@graph": nodes };
}

function person(locale: Locale): Node {
  const [city, region] = profile.location[locale].split(", ");
  return {
    "@type": "Person",
    "@id": personId,
    name: siteName,
    givenName: profile.name.first,
    familyName: profile.name.last,
    jobTitle: profile.role,
    description: profile.about.subHeadline[locale],
    url: absoluteUrl(`/${locale}`),
    image: absoluteUrl("/photos/foto-1-331.webp"),
    email: profile.email,
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "ID" },
    sameAs: [profile.linkedin.href, profile.github.href],
    knowsAbout: skillGroups.flatMap((group) => group.items.map((item) => item.label[locale])),
    knowsLanguage: [...locales],
    alumniOf: education.map((entry) => ({ "@type": entry.schemaType, name: entry.school })),
    hasCredential: credentials.items.map((item) => ({
      "@type": "EducationalOccupationalCredential",
      name: item.name[locale],
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: typeof item.issuer === "string" ? item.issuer : item.issuer[locale],
      },
    })),
    // Teks penghargaan menyebut "bersama tim", sesuai profil.
    award: projects.flatMap((project) => (project.award ? [project.award[locale]] : [])),
  };
}

function website(locale: Locale): Node {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: seoText.home.description[locale],
    inLanguage: [...locales],
    publisher: { "@id": personId },
  };
}

function breadcrumbs(locale: Locale, url: string, current: string): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui[locale].home, item: absoluteUrl(`/${locale}`) },
      { "@type": "ListItem", position: 2, name: current, item: url },
    ],
  };
}

function profilePage(locale: Locale, url: string, title: string, description: string, breadcrumbId?: string): Node {
  return {
    "@type": "ProfilePage",
    "@id": `${url}#page`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}

export function homeJsonLd(locale: Locale): JsonLdGraph {
  const url = absoluteUrl(`/${locale}`);
  return graph([
    person(locale),
    website(locale),
    profilePage(locale, url, seoText.home.title[locale], seoText.home.description[locale]),
  ]);
}

export function aboutJsonLd(locale: Locale): JsonLdGraph {
  const url = absoluteUrl(`/${locale}/about`);
  const trail = breadcrumbs(locale, url, profile.about.title[locale]);
  return graph([
    person(locale),
    website(locale),
    profilePage(locale, url, seoText.about.title[locale], seoText.about.description[locale], `${url}#breadcrumb`),
    trail,
  ]);
}

export function projectJsonLd(locale: Locale, project: Project): JsonLdGraph {
  const url = absoluteUrl(`/${locale}/projects/${project.slug}`);
  return graph([
    person(locale),
    website(locale),
    {
      "@type": "CreativeWork",
      "@id": `${url}#work`,
      url,
      name: project.name,
      description: project.brief[locale],
      abstract: project.approach[locale],
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      // Bukan `creator`: sebagian proyek dikerjakan bersama tim, dan peran sebenarnya ada di `creditText`.
      contributor: { "@id": personId },
      creditText: project.role[locale],
      temporalCoverage: `${project.dates.start}/${project.dates.end}`,
      keywords: project.technologies,
      ...(project.links.length > 0 ? { sameAs: project.links.map((link) => link.href) } : {}),
      ...(project.award ? { award: project.award[locale] } : {}),
    },
    breadcrumbs(locale, url, project.name),
  ]);
}
