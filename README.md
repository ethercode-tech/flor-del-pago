# Flor Del Pago — MVP Landing + Reservas + Dashboard

Aplicación Next.js (App Router) con foco en conversión y operación:
- Landing premium (marca + experiencia + SEO)
- Motor real de reservas
- Dashboard interno para operación diaria
- Base preparada para escalar a productos/gift cards/eventos

## Stack
- Next.js 16 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (PostgreSQL, Auth, RLS, Functions)
- Resend (email transaccional)
- Vitest + Playwright

## Arquitectura
Estructura por capas en `src/`:
- `domain/`: reglas de negocio puras (validación, disponibilidad, KPIs)
- `application/`: orquestación de casos de uso
- `infrastructure/`: repositorios y gateways (Supabase / in-memory)
- `ui/`: componentes presentacionales reutilizables
- `app/`: rutas Next.js públicas, privadas y APIs

## Rutas
Públicas:
- `/`
- `/menu`
- `/experiencia`
- `/chef`
- `/reservas`
- `/contacto`

Privadas:
- `/admin`
- `/admin/reservas`
- `/admin/mesas`
- `/admin/clientes`
- `/admin/reportes`

## APIs principales
- `POST /api/reservations`
- `GET /api/reservations/availability`
- `PATCH /api/admin/reservations/:id`
- `GET /api/admin/dashboard/summary`
- `POST /api/notifications/whatsapp`
- `POST /api/notifications/email`
- `POST /api/notifications/reminders`

## Variables de entorno
Copiar `.env.example` y completar:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CRON_SECRET`

Sin variables de Supabase, la app corre en modo in-memory para desarrollo.

## Base de datos (Supabase)
Migración inicial:
- `supabase/migrations/001_initial_schema.sql`

Incluye tablas:
- `users`, `customers`, `tables`, `reservations`, `testimonials`
- `products`, `orders` (listo para fase 2)

También incluye RLS por rol (`admin`, `recepcion`, `chef`) e índice para evitar doble reserva por mesa/franja.

## Comandos
```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run test:e2e
```

## Nota operacional
Para habilitar recordatorios 24h con Supabase Functions:
1. Desplegar `supabase/functions/send-reminders/index.ts`
2. Programar cron diario en el proyecto Supabase
3. Configurar `APP_URL`, `CRON_SECRET` y claves de Supabase/Resend
# flor-del-pago
