import Link from "next/link";
import { getReservations } from "@/app/admin/_lib";
import { AdminNav } from "@/ui/components/admin-nav";

function getField<T>(obj: Record<string, unknown>, keys: string[], fallback: T): T {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null) return obj[key] as T;
  }
  return fallback;
}

export default async function AdminReservationsPage() {
  const reservations = (await getReservations()) as unknown as Record<string, unknown>[];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Gestion de reservas</h1>
      <AdminNav />
      <div className="mb-4 flex justify-end">
        <Link href="/admin/reservas/nueva" className="rounded-full bg-[var(--terracotta)] px-4 py-2 text-sm text-white">
          Crear reserva
        </Link>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)]">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Hora</th>
              <th className="px-4 py-3">Pax</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Mesa</th>
              <th className="px-4 py-3">Accion</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              const id = String(getField(reservation, ["id"], ""));
              return (
                <tr key={id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">{String(getField(reservation, ["customerName", "customer_name"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["date", "reservationDate"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["time", "reservationTime"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["partySize", "guestsCount"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["areaPreference"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["status"], "-"))}</td>
                  <td className="px-4 py-3">{String(getField(reservation, ["assignedTableId"], "-"))}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/reservas/${id}`} className="text-[var(--terracotta)] hover:underline">
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
