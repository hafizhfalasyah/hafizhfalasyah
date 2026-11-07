import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/json-ld";
import { seoText } from "@/content/seo";
import { isLocale } from "@/lib/i18n";
import { aboutJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { Credentials } from "@/sections/about/credentials";
import { Education } from "@/sections/about/education";
import { Intro } from "@/sections/about/intro";
import { Languages } from "@/sections/about/languages";
import { Principles } from "@/sections/about/principles";
import { RecognitionSection } from "@/sections/about/recognition";
import { SoftSkills } from "@/sections/about/soft-skills";

type AboutParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: AboutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/about",
    title: seoText.about.title[locale],
    description: seoText.about.description[locale],
    type: "profile",
    inheritLocaleImage: true,
  });
}

export default async function AboutPage({ params }: AboutParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <JsonLd data={aboutJsonLd(locale)} />
      <Intro locale={locale} />
      <Principles locale={locale} />
      <SoftSkills locale={locale} />
      <Education locale={locale} />
      <RecognitionSection locale={locale} />
      <Credentials locale={locale} />
      <Languages locale={locale} />
    </>
  );
}
