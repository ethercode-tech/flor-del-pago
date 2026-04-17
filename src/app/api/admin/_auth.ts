import { cookies } from "next/headers";

export type StaffRole = "admin" | "recepcion" | "chef";

export async function requireStaffRole(allowed: StaffRole[]): Promise<StaffRole> {
  const cookieStore = await cookies();
  const role = cookieStore.get("fdp_role")?.value as StaffRole | undefined;
  if (!role || !allowed.includes(role)) {
    throw new Error("FORBIDDEN");
  }
  return role;
}
