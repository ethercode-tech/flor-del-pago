import { AdminNav } from "@/ui/components/admin-nav";

export default function AdminTablesConfigPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion de mesas</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6">
        <p className="text-sm text-[var(--muted)]">
          Gestion de combinaciones, flags premium, accesibilidad y orden visual por area.
        </p>
        <ul className="mt-4 list-disc pl-6 text-sm text-[var(--muted)]">
          <li>Definir mesas combinables por relacion explicita.</li>
          <li>Bloquear mesas fuera de servicio temporalmente.</li>
          <li>Configurar prioridad de mesas romanticas y premium.</li>
        </ul>
      </article>
    </section>
  );
}
