import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getAdminOpsService();
  const detail = await service.getReservationDetail(id);

  if (!detail.reservation) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="font-serif text-3xl">Reserva no encontrada</h1>
        <AdminNav />
      </section>
    );
  }

  const reservation = detail.reservation;
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Detalle de reserva</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6">
        <p className="text-sm text-[var(--muted)]">{reservation.id}</p>
        <h2 className="mt-1 font-serif text-3xl">{reservation.customerName}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
          <p>Fecha: {reservation.date}</p>
          <p>Hora: {reservation.time}</p>
          <p>Pax: {reservation.partySize}</p>
          <p>Estado: {reservation.status}</p>
          <p>Mesa: {reservation.assignedTableId ?? "-"}</p>
          <p>Area: {reservation.areaPreference ?? "-"}</p>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">Notas: {reservation.specialNotes ?? "-"}</p>
      </article>
      <article className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6">
        <h3 className="font-serif text-2xl">Historial</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {detail.events.map((event) => (
            <li key={event.id} className="rounded-xl border border-[var(--line)] px-3 py-2">
              {event.createdAt} - {event.eventType} ({event.actorRole})
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
