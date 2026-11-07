export function SkipLink({ label }: { label: string }) {
  return (
    <a
      id="skip-link"
      href="#main"
      className="fixed top-2 left-2 z-skip-link -translate-y-24 bg-ink px-6 py-3 font-medium text-canvas no-underline focus:translate-y-0"
    >
      {label}
    </a>
  );
}
