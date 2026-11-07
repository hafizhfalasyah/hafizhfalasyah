import { Photo } from "@/components/ui/photo";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

const linkClass = "flex min-h-12 items-center font-medium underline";

/**
 * Penutup halaman: fondasi tinta naik dari footer menutupi sisi dinding foto. Tidak ada teks di atas
 * foto, sehingga kontras tetap terjamin di kedua tema.
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { email, linkedin, github, location, cvHref } = profile;

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact-photo">
        <Photo
          id="foto-6"
          locale={locale}
          parallax
          frameClassName="contact-frame"
          sizes="(width >= 80rem) 57vw, (width >= 48rem) 72vw, 100vw"
        />
      </div>

      <div className="contact-plate on-ink">
        <h2 id="contact-title" data-reveal="" className="type-title">
          {t.connect}
        </h2>
        <p className="mt-4 max-w-prose text-lead">{profile.contact[locale]}</p>

        <a href={`mailto:${email}`} className="contact-email mt-8">
          {email}
        </a>

        <ul className="mt-4 flex flex-wrap items-center gap-x-8">
          <li>
            <a href={linkedin.href} target="_blank" rel="noreferrer" className={linkClass}>
              {linkedin.label}
            </a>
          </li>
          <li>
            <a href={github.href} target="_blank" rel="noreferrer" className={linkClass}>
              {github.label}
            </a>
          </li>
          <li>
            <a
              href={cvHref}
              download
              data-magnetic=""
              className="flex min-h-12 items-center bg-canvas px-6 font-medium whitespace-nowrap text-ink no-underline hover:bg-plate-2 active:translate-y-px"
            >
              {t.downloadCv}
            </a>
          </li>
        </ul>

        <p className="mt-4">{location[locale]}</p>
      </div>
    </section>
  );
}
