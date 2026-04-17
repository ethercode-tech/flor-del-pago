import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";

const schema = z.object({
  to: z.string().email(),
  subject: z.string().min(3).max(160),
  html: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const { notificationsService } = await getServices();
    await notificationsService.sendEmail(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo enviar email" },
      { status: 400 },
    );
  }
}
