"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { AdminHeader } from "@/ui/components/admin/admin-header";
import { SidebarNavigation } from "@/ui/components/admin/sidebar-navigation";

export function AdminChrome({
  role,
  alerts,
  pending,
  waitingTables,
  currentDateLabel,
  children,
}: {
  role: "admin" | "recepcion" | "chef";
  alerts: number;
  pending: number;
  waitingTables: number;
  currentDateLabel: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin/login")) {
    return <div className="min-h-screen bg-[#0f0f0e] text-[var(--ink)]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#0f0f0e] text-[var(--ink)]">
      <SidebarNavigation role={role} className="hidden lg:flex lg:flex-col" />

      {open ? (
        <div className="fixed inset-0 z-40 bg-black/55 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-0"
            onClick={(event) => event.stopPropagation()}
          >
            <SidebarNavigation role={role} className="flex flex-col" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)] text-[var(--sand)]"
              aria-label="Cerrar navegación"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <AdminHeader
          alerts={alerts}
          pending={pending}
          waitingTables={waitingTables}
          currentDateLabel={currentDateLabel}
          onMenuClick={() => setOpen(true)}
        />
        <div className="px-0 py-0">{children}</div>
      </div>
    </div>
  );
}
