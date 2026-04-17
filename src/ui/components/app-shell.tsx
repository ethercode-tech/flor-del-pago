"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/ui/components/site-header";
import { SiteFooter } from "@/ui/components/site-footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
