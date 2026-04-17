import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getAdminOpsService();
  const customers = await service.listCustomers();
  const customer = customers.find((item) => item.id === id);

  if (!customer) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="font-serif text-3xl">Cliente no encontrado</h1>
        <AdminNav />
      </section>
    );
  }

  const reservations = await service.listReservations();
  const history = reservations.filter((item) => item.customerId === customer.id);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Perfil de cliente</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6">
        <h2 className="font-serif text-3xl">{customer.fullName}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Telefono: {customer.phone}</p>
        <p className="text-sm text-[var(--muted)]">Email: {customer.email ?? "-"}</p>
        <p className="text-sm text-[var(--muted)]">VIP: {customer.vip ? "Si" : "No"}</p>
      </article>
      <article className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6">
        <h3 className="font-serif text-2xl">Historial de reservas</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {history.map((reservation) => (
            <li key={reservation.id} className="rounded-lg border border-[var(--line)] px-3 py-2">
              {reservation.date} {reservation.time} - {reservation.status} ({reservation.partySize} pax)
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
