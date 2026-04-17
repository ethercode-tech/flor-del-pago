import { test, expect } from "@playwright/test";

test("user can open reservation page and see form", async ({ page }) => {
  await page.goto("/reservas");
  await expect(page.getByRole("heading", { name: "Reservar Mesa" })).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeVisible();
  await expect(page.getByRole("button", { name: "Confirmar reserva" })).toBeVisible();
});
