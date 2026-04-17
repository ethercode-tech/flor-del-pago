type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

export function RecentActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Actividad reciente</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-3">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{item.detail}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]/75">{item.time}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
