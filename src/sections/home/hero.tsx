import { Photo } from "@/components/ui/photo";
import { PrimaryActions } from "@/components/ui/primary-actions";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Lebar foto di layar, termasuk 113% yang membuang sisi kiri foto yang lebih gelap. */
const plateSizes = "(width >= 110rem) 765px, (width >= 80rem) 44vw, (width >= 48rem) 68vw, 79vw";

/**
 * Nama melintasi plate foto. Teks nyata ada di `h1`, tertutup plate; salinan `aria-hidden` di dalam
 * plate berwarna gelap dan dipotong tepi plate, sehingga warnanya berbalik tepat di tepi pada tema
 * gelap. Posisinya murni CSS, jadi tetap segaris tanpa JS. Lihat `.hero-*` di `globals.css`.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { name, role, tagline } = profile;

  return (
    <section className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="hero-name type-name">
        <span className="hero-settle block">{name.first}</span>{" "}
        <span className="hero-settle hero-settle-2 block">{name.last}</span>
      </h1>

      <div className="hero-plate">
        <div data-plate-tilt="" className="hero-plate-tilt">
          <div data-plate-face="" className="hero-plate-face">
            <Photo id="foto-7" locale={locale} priority sizes={plateSizes} className="hero-plate-photo" />
            <span aria-hidden="true" className="hero-name-frame">
              <span data-name-copy="" className="hero-name-copy type-name">
                <span className="hero-settle hero-settle-2 block">{name.last}</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-copy hero-settle hero-settle-3">
        <p className="text-sub font-bold">{role}</p>
        <p className="mt-2 max-w-prose text-lead text-ink-2 md:mt-3">{tagline[locale]}</p>
        <PrimaryActions locale={locale} className="mt-4 md:mt-6" />
      </div>
    </section>
  );
}
