import type { Spec } from "@/data/products";

/** Mirrors the two-column spec sheet printed in the source PDF. */
export function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <dl className="border-t border-gold/40">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline px-4 py-3.5 ${
            index % 2 === 0 ? "bg-ivory" : "bg-surface"
          }`}
        >
          <dt className="text-sm text-ink-muted">{spec.label}</dt>
          <dd className="text-sm font-medium text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
