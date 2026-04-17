export function ServiceStatusBadge({
  pending,
  waitingTables,
}: {
  pending: number;
  waitingTables: number;
}) {
  const tone =
    pending > 5 || waitingTables > 3
      ? "border-amber-400/50 bg-amber-500/12 text-amber-200"
      : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";

  return (
    <div className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.12em] ${tone}`}>
      Servicio activo · {pending} pendientes · {waitingTables} mesas sin asignar
    </div>
  );
}
