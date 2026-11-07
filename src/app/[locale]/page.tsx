import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/json-ld";
import { seoText } from "@/content/seo";
import { isLocale } from "@/lib/i18n";
import { homeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/sections/home/contact";
import { Experience } from "@/sections/home/experience";
import { Hero } from "@/sections/home/hero";
import { Projects } from "@/sections/home/projects";
import { Skills } from "@/sections/home/skills";
import { Structure } from "@/sections/home/structure";

type HomeParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: HomeParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "",
    title: seoText.home.title[locale],
    description: seoText.home.description[locale],
    type: "profile",
  });
}

export default async function HomePage({ params }: HomeParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <JsonLd data={homeJsonLd(locale)} />
      {/* Satu wadah: plate hero tetap sticky sampai Susun Lapis selesai. */}
      <div id="maket" className="maket">
        <Hero locale={locale} />
        <Structure locale={locale} />
      </div>
      <Projects locale={locale} />
      <Experience locale={locale} />
      <Skills locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
