import { toISODate } from "@/lib/utils";
import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function WaitlistPage() {
  const date = toISODate(new Date());
  const waitlist = await (await getAdminOpsService()).listWaitlist(date);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="font-serif text-4xl">Lista de espera</h1>
      <AdminNav />
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5">
        <ul className="space-y-2 text-sm">
          {waitlist.map((item) => (
            <li key={item.id} className="rounded-lg border border-[var(--line)] px-3 py-2">
              {item.requestedDate} {item.requestedPeriod} - {item.partySize} pax - prioridad {item.priority} - {item.status}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
