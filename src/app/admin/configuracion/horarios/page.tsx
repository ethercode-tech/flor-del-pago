import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function ConfigHorariosPage() {
  const settings = await (await getAdminOpsService()).getSettings();
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion: Horarios</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6 text-sm">
        <p>Almuerzo: {settings.lunchStartTime} - {settings.lunchEndTime}</p>
        <p>Cena: {settings.dinnerStartTime} - {settings.dinnerEndTime}</p>
      </article>
    </section>
  );
}
