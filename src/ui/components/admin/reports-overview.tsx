type ReportMetric = {
  label: string;
  value: string;
  progress: number;
};

export function ReportsOverview({ metrics }: { metrics: ReportMetric[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Snapshot de reportes</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
            <div className="mt-3 h-2 rounded-full bg-black/35">
              <div
                className="h-2 rounded-full bg-[linear-gradient(90deg,var(--gold),var(--olive-light))]"
                style={{ width: `${Math.max(4, Math.min(100, metric.progress))}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
