import { AdminNav } from "@/ui/components/admin-nav";

export default function ConfigAreasPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion: Areas</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6 text-sm">
        <p>Interior, galeria y jardin con restricciones operativas y clima.</p>
      </article>
    </section>
  );
}
