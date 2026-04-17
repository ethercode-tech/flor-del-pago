import { toISODate } from "@/lib/utils";
import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function AdminReportsPage() {
  const service = await getAdminOpsService();
  const [summary, reservations] = await Promise.all([
    service.summaryByDate(toISODate(new Date())),
    service.listReservations(),
  ]);

  const byTime = reservations.reduce<Record<string, number>>((acc, reservation) => {
    acc[reservation.time] = (acc[reservation.time] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Reportes</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5">
        <h2 className="font-serif text-2xl">KPIs del dia</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4 text-sm">
          <p>Total: {summary.total}</p>
          <p>Confirmadas: {summary.confirmed}</p>
          <p>Canceladas: {summary.cancelled}</p>
          <p>No show: {summary.noShow}</p>
        </div>
      </article>

      <article className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5">
        <h2 className="font-serif text-2xl">Reservas por horario</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
          {Object.entries(byTime).map(([time, count]) => (
            <li key={time}>
              {time}: {count}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
