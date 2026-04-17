type WaitlistItem = {
  id: string;
  name: string;
  pax: number;
  period: string;
  priority: number;
};

export function WaitlistPanel({ items }: { items: WaitlistItem[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Waitlist activa</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Clientes listos para ocupar vacantes.</p>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{item.name}</p>
              <span className="rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]">
                Prioridad {item.priority}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {item.pax} pax · {item.period}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
