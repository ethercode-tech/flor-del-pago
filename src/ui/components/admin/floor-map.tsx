type FloorTable = {
  id: string;
  code: string;
  area: string;
  status: string;
};

const tones: Record<string, string> = {
  libre: "border-emerald-400/45 bg-emerald-500/10 text-emerald-200",
  reservada: "border-amber-400/45 bg-amber-500/12 text-amber-200",
  ocupada: "border-sky-400/45 bg-sky-500/12 text-sky-200",
  bloqueada: "border-red-400/45 bg-red-500/12 text-red-200",
  fuera_de_servicio: "border-zinc-400/45 bg-zinc-500/12 text-zinc-200",
};

export function FloorMap({ tables }: { tables: FloorTable[] }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Mapa de mesas</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Estado en tiempo real del salón.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {tables.map((table) => (
          <article key={table.id} className={`rounded-xl border p-3 text-sm ${tones[table.status] ?? "border-[var(--line)] text-[var(--sand)]"}`}>
            <p className="font-semibold">Mesa {table.code}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.1em]">{table.area}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.1em]">{table.status.replaceAll("_", " ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
