// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

Deno.serve(async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = tomorrow.toISOString().split("T")[0];

  const { data: reservations, error } = await supabase
    .from("reservations")
    .select("id, customer_phone, customer_email, customer_name, reservation_time, status")
    .eq("reservation_date", date)
    .eq("status", "confirmed")
    .is("reminder_sent_at", null);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  for (const reservation of reservations ?? []) {
    await fetch(`${Deno.env.get("APP_URL")}/api/notifications/reminders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${Deno.env.get("CRON_SECRET")}` },
    });

    await supabase
      .from("reservations")
      .update({ reminder_sent_at: new Date().toISOString() })
      .eq("id", reservation.id);
  }

  return new Response(JSON.stringify({ sent: reservations?.length ?? 0 }), { status: 200 });
});
