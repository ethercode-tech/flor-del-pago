type Insight = {
  label: string;
  value: number;
  note: string;
};

export function CustomerInsightsPanel({ insights }: { insights: Insight[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Customer insights</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => (
          <article key={insight.label} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{insight.label}</p>
            <p className="mt-2 text-3xl font-semibold">{insight.value}</p>
            <p className="mt-1 text-xs text-[var(--sand)]/85">{insight.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
