import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Nada per lapisan: fondasi paling kontras, makin ke atas makin dekat ke alas. */
const tones = ["layer-tone-ink", "layer-tone-3", "layer-tone-2", "layer-tone-1"];

/**
 * Susun Lapis. Tanpa JS dan saat reduced motion ini daftar statis biasa; animasinya di
 * `motion/structure-motion.tsx`. Teks tiap lapisan selalu datar dan bisa dipilih, sedangkan plate
 * hanya nada dan label besar (`aria-hidden`) yang boleh dimiringkan.
 */
export function Structure({ locale }: { locale: Locale }) {
  const { principle, layers } = profile;

  return (
    <section id="structure" className="structure" aria-labelledby="structure-title">
      <div className="structure-stage page-grid">
        <div data-structure-intro="" className="structure-intro">
          <h2 id="structure-title" data-reveal="" className="type-title">
            {principle.title[locale]}
          </h2>
          <p data-structure-sentence="" className="mt-4 max-w-prose text-lead md:mt-6">
            {principle.body[locale]}
          </p>
        </div>

        <ol className="structure-layers">
          {layers[locale].map((layer, index) => (
            <li
              key={layer.label}
              className={`layer ${tones[index]}`}
              style={{ "--layer-index": index } as CSSProperties}
            >
              <div data-layer-plate="" className="layer-plate" aria-hidden="true">
                <div data-layer-face="" className="layer-face">
                  <span data-layer-label="" className="layer-face-label type-title">
                    {layer.label}
                  </span>
                </div>
              </div>
              <div data-layer-text="" className="layer-text">
                <h3 className="layer-title">{layer.label}</h3>
                <p className="type-tech">{layer.technologies.join(", ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
