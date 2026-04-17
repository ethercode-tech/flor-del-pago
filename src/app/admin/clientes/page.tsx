import Link from "next/link";
import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function AdminCustomersPage() {
  const customers = await (await getAdminOpsService()).listCustomers();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Clientes</h1>
      <AdminNav />
      <div className="grid gap-4 md:grid-cols-2">
        {customers.map((customer) => (
          <article key={customer.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5">
            <h2 className="font-serif text-2xl">{customer.fullName}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Telefono: {customer.phone}</p>
            <p className="text-sm text-[var(--muted)]">Visitas: {customer.visits}</p>
            <p className="text-sm text-[var(--muted)]">No show: {customer.noShows}</p>
            <p className="text-sm text-[var(--muted)]">Score: {customer.reliabilityScore}</p>
            <div className="mt-3">
              <Link href={`/admin/clientes/${customer.id}`} className="text-sm text-[var(--terracotta)] hover:underline">
                Ver perfil
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
