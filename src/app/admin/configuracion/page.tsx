import Link from "next/link";
import { AdminNav } from "@/ui/components/admin-nav";
import { AdminMenuManager } from "@/ui/components/admin-menu-manager";
import { getDataAccess } from "@/infrastructure/repositories/factory";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function AdminConfigurationPage() {
  const data = await getDataAccess();
  const service = await getAdminOpsService();
  const [initialCategories, initialItems, settings] = await Promise.all([
    data.menu.listCategories(),
    data.menu.listItems(),
    service.getSettings(),
  ]);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion</h1>
      <p className="mt-2 text-[var(--muted)]">Reglas operativas, horarios, usuarios y menu.</p>
      <AdminNav />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Link href="/admin/configuracion/horarios" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-4">Horarios</Link>
        <Link href="/admin/configuracion/reglas" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-4">Reglas</Link>
        <Link href="/admin/configuracion/areas" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-4">Areas</Link>
        <Link href="/admin/configuracion/usuarios" className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-4">Usuarios</Link>
      </div>

      <article className="mb-6 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5 text-sm">
        <p>Cutoff: {settings.reservationCutoffMinutes} min</p>
        <p>Buffer: {settings.bufferMinutesBetweenReservations} min</p>
        <p>Auto-confirm hasta: {settings.autoConfirmMaxPartySize} pax</p>
      </article>

      <AdminMenuManager initialCategories={initialCategories} initialItems={initialItems} />
    </section>
  );
}
