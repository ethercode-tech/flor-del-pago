"use client";

import { Bell } from "lucide-react";

export function NotificationBell({ count }: { count: number }) {
  return (
    <button
      type="button"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-[var(--sand)] transition hover:border-[var(--gold)]"
      aria-label="Notificaciones"
    >
      <Bell size={16} />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 rounded-full bg-[var(--terracotta)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}
