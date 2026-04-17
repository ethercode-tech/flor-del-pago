import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function AuditPage() {
  const logs = await (await getAdminOpsService()).listAuditLogs(200);
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Auditoria</h1>
      <AdminNav />
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)]">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Accion</th>
              <th className="px-4 py-3">Entidad</th>
              <th className="px-4 py-3">Actor</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{log.createdAt}</td>
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3">{log.entityType}:{log.entityId}</td>
                <td className="px-4 py-3">{log.actorRole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
