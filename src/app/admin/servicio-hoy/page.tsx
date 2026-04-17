import { toISODate } from "@/lib/utils";
import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function ServiceTodayPage() {
  const date = toISODate(new Date());
  const service = await getAdminOpsService();
  const reservations = await service.listReservations({ date });

  const byStatus = {
    confirmed: reservations.filter((r) => r.status === "confirmed"),
    seated: reservations.filter((r) => r.status === "seated"),
    completed: reservations.filter((r) => r.status === "completed"),
    pending: reservations.filter((r) => r.status === "pending_review" || r.status === "new_request"),
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Servicio de hoy</h1>
      <AdminNav />
      <div className="grid gap-4 md:grid-cols-4">
        {(Object.keys(byStatus) as Array<keyof typeof byStatus>).map((key) => (
          <article key={key} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-4">
            <h2 className="font-serif text-2xl capitalize">{key}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {byStatus[key].map((r) => (
                <li key={r.id} className="rounded-lg border border-[var(--line)] px-2 py-1">
                  {r.time} - {r.customerName} ({r.partySize})
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
