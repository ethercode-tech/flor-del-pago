import { AdminNav } from "@/ui/components/admin-nav";
import { getAdminOpsService } from "@/app/admin/_lib";

export default async function NotificationsPage() {
  const logs = await (await getAdminOpsService()).listNotificationLogs(100);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Notificaciones</h1>
      <AdminNav />
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-2)]">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Template</th>
              <th className="px-4 py-3">Canal</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Intentos</th>
              <th className="px-4 py-3">Fallo</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3">{log.createdAt}</td>
                <td className="px-4 py-3">{log.templateKey}</td>
                <td className="px-4 py-3">{log.channel}</td>
                <td className="px-4 py-3">{log.status}</td>
                <td className="px-4 py-3">{log.deliveryAttempts}</td>
                <td className="px-4 py-3">{log.failureReason ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
