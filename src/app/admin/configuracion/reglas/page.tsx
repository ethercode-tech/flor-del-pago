import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function ConfigReglasPage() {
  const settings = await (await getAdminOpsService()).getSettings();
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion: Reglas</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6 text-sm">
        <p>Max party online: {settings.maxPartySizeOnline}</p>
        <p>Cutoff: {settings.reservationCutoffMinutes} min</p>
        <p>Buffer: {settings.bufferMinutesBetweenReservations} min</p>
        <p>Auto confirm: {settings.reservationAutoConfirmEnabled ? "Si" : "No"}</p>
      </article>
    </section>
  );
}
