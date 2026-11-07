import { credentials } from "@/content/credentials";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/** Tabel sungguhan, karena tiga kolomnya memang untuk dibandingkan; di ponsel tiap baris menjadi blok. */
export function Credentials({ locale }: { locale: Locale }) {
  const t = ui[locale].credentials;
  const { title, intro, items, program } = credentials;

  return (
    <section className="bg-plate-1 py-section" aria-labelledby="credentials-title">
      <div className="page-grid gap-y-12">
        <div className="col-span-full flex flex-col gap-4">
          <h2 id="credentials-title" data-reveal="" className="type-title">
            {title[locale]}
          </h2>
          <p className="max-w-prose text-lead text-ink-2">{intro[locale]}</p>
        </div>

        <table className="credentials col-span-full">
          <thead>
            <tr>
              <th scope="col">{t.name}</th>
              <th scope="col">{t.issuer}</th>
              <th scope="col">{t.date}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name.id}>
                <th scope="row">{item.name[locale]}</th>
                <td>{typeof item.issuer === "string" ? item.issuer : item.issuer[locale]}</td>
                <td className="type-tech">{item.date[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="col-span-full max-w-prose xl:col-span-7 xl:col-start-6">{program[locale]}</p>
      </div>
    </section>
  );
}
