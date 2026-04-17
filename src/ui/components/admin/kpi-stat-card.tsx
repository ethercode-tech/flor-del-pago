import type { LucideIcon } from "lucide-react";

export function KPIStatCard({
  label,
  value,
  trend,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number;
  trend: number;
  hint: string;
  icon: LucideIcon;
}) {
  const trendPositive = trend >= 0;

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/95 p-4 shadow-[0_12px_28px_rgba(0,0,0,.22)]">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{label}</p>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)] text-[var(--sand)]">
          <Icon size={14} />
        </span>
      </div>
      <p className="mt-3 font-serif text-4xl leading-none">{value}</p>
      <p className={`mt-2 text-xs ${trendPositive ? "text-emerald-300" : "text-red-300"}`}>
        {trendPositive ? "+" : ""}
        {trend}% vs ayer
      </p>
      <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p>
    </article>
  );
}
