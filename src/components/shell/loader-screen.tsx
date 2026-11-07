import { loaderScript } from "@/lib/loader";

export function LoaderScript() {
  return <script dangerouslySetInnerHTML={{ __html: loaderScript }} />;
}

type LoaderScreenProps = {
  skipLabel: string;
  steps: readonly string[];
};

/**
 * Empat plate naik dari bawah saat pekerjaan nyatanya selesai, lalu terangkat dan hero yang sudah
 * ter-render terlihat. Sepenuhnya CSS dan skrip inline, supaya GSAP tidak masuk chunk kritis.
 * Tombol hanya penanda: `loaderScript` menangani klik apa pun dan tombol keyboard apa pun.
 */
export function LoaderScreen({ skipLabel, steps }: LoaderScreenProps) {
  return (
    <div className="loader" data-nosnippet="">
      <ol className="loader-stack" aria-hidden="true">
        {steps.map((step) => (
          <li key={step} className="loader-plate">
            <span className="type-meta">{step}</span>
          </li>
        ))}
      </ol>
      <button type="button" className="loader-skip type-meta">
        {skipLabel}
      </button>
    </div>
  );
}
