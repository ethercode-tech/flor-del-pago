import type { NotificationGateway } from "@/infrastructure/repositories/types";

export class NotificationsService {
  constructor(private readonly gateway: NotificationGateway) {}

  async sendWhatsApp(input: { to: string; message: string }): Promise<void> {
    await this.gateway.sendWhatsApp(input);
  }

  async sendEmail(input: { to: string; subject: string; html: string }): Promise<void> {
    await this.gateway.sendEmail(input);
  }

  async sendReservationCreated(input: {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    status: "pending" | "confirmed";
  }): Promise<void> {
    const message =
      input.status === "confirmed"
        ? `Hola ${input.name}, tu reserva en Flor Del Pago para ${input.guests} personas el ${input.date} a las ${input.time} fue confirmada.`
        : `Hola ${input.name}, recibimos tu solicitud de reserva en Flor Del Pago para ${input.guests} personas el ${input.date} a las ${input.time}. Te confirmamos a la brevedad.`;

    await Promise.all([
      this.sendWhatsApp({ to: input.phone, message }),
      this.sendEmail({ to: input.email, subject: "Reserva Flor Del Pago", html: `<p>${message}</p>` }),
    ]);
  }

  async sendReminder(input: { name: string; phone: string; email: string; date: string; time: string }): Promise<void> {
    const message = `Recordatorio: te esperamos mañana en Flor Del Pago (${input.time}). Gracias, ${input.name}.`;
    await Promise.all([
      this.sendWhatsApp({ to: input.phone, message }),
      this.sendEmail({
        to: input.email,
        subject: "Recordatorio de reserva - Flor Del Pago",
        html: `<p>${message}</p>`,
      }),
    ]);
  }
}
