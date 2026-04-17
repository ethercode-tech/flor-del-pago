function readBooleanFlag(value: string | undefined, defaultValue: boolean): boolean {
  if (!value) return defaultValue;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

export const featureFlags = {
  adminOpsV2: readBooleanFlag(process.env.FF_ADMIN_OPS_V2, true),
  reservationEngineV2: readBooleanFlag(process.env.FF_RESERVATION_ENGINE_V2, true),
};

