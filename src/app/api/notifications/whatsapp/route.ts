import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";

const schema = z.object({
  to: z.string().min(6),
  message: z.string().min(3),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const { notificationsService } = await getServices();
    await notificationsService.sendWhatsApp({ to: body.to, message: body.message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo enviar WhatsApp" },
      { status: 400 },
    );
  }
}
