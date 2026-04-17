type TimelineItem = {
  id: string;
  time: string;
  customerName: string;
  partySize: number;
  status: string;
  table: string;
  notes: string;
};

const statusTone: Record<string, string> = {
  confirmed: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
  seated: "bg-sky-500/15 text-sky-200 border-sky-400/40",
  pending_review: "bg-amber-500/15 text-amber-200 border-amber-400/40",
  pending: "bg-amber-500/15 text-amber-200 border-amber-400/40",
};

export function ReservationTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Timeline de reservas</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Servicio de hoy por franja horaria.</p>

      <div className="mt-4 max-h-[440px] space-y-3 overflow-auto pr-1">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-lg border border-[var(--line)] bg-black/25 px-2 py-1 text-xs uppercase tracking-[0.12em] text-[var(--sand)]">
                  {item.time}
                </span>
                <p className="font-medium">{item.customerName}</p>
              </div>
              <span
                className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${statusTone[item.status] ?? "border-[var(--line)] text-[var(--sand)]"}`}
              >
                {item.status.replaceAll("_", " ")}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {item.partySize} pax · Mesa {item.table}
            </p>
            {item.notes ? <p className="mt-1 text-xs text-[var(--sand)]/85">{item.notes}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
