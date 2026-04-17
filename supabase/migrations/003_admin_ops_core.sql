create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

do $$ begin
  create type ops_staff_role as enum ('admin','recepcion','chef');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_reservation_status as enum (
    'new_request','pending_review','awaiting_customer_response',
    'confirmed','seated','completed',
    'cancelled_by_guest','cancelled_by_restaurant','no_show'
  );
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_area_type as enum ('interior','galeria','jardin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_service_period as enum ('lunch','dinner');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_notification_channel as enum ('email','whatsapp');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_notification_status as enum ('queued','sent','failed');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_waitlist_status as enum ('waiting','contacted','accepted','expired','cancelled');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_reservation_source as enum ('web','whatsapp','manual','phone','instagram');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_occasion_type as enum ('none','birthday','anniversary','romantic','family','business','private_event');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_table_status as enum ('libre','reservada','ocupada','bloqueada','fuera_servicio');
exception when duplicate_object then null; end $$;
do $$ begin
  create type ops_outdoor_exposure as enum ('low','medium','high');
exception when duplicate_object then null; end $$;

create table if not exists public.ops_staff_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role ops_staff_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ops_restaurant_settings (
  id uuid primary key default gen_random_uuid(),
  lunch_start_time time not null default '12:30',
  lunch_end_time time not null default '15:30',
  dinner_start_time time not null default '20:00',
  dinner_end_time time not null default '23:30',
  max_party_size_online int not null default 10,
  max_booking_days_in_advance int not null default 45,
  reservation_cutoff_minutes int not null default 120,
  reminder_hours_before int not null default 24,
  cancellation_window_hours int not null default 6,
  whatsapp_number text not null default '+543885134101',
  reservation_auto_confirm_enabled boolean not null default true,
  auto_confirm_max_party_size int not null default 6,
  buffer_minutes_between_reservations int not null default 15,
  late_arrival_tolerance_minutes int not null default 20,
  holiday_closures jsonb not null default '[]'::jsonb,
  same_day_reminder_enabled boolean not null default true,
  weather_sensitive_garden_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ops_customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null unique,
  email text,
  birthday date,
  notes text,
  allergies text,
  vip_flag boolean not null default false,
  visit_count int not null default 0,
  no_show_count int not null default 0,
  reliability_score int not null default 100,
  preferred_area ops_area_type,
  preferred_occasion text,
  last_visit_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.ops_customer_notes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.ops_customers(id),
  note text not null,
  created_by uuid references public.ops_staff_users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.ops_customer_tags (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.ops_customers(id),
  tag text not null,
  created_at timestamptz not null default now(),
  unique(customer_id, tag)
);

create table if not exists public.ops_restaurant_areas (
  id uuid primary key default gen_random_uuid(),
  code ops_area_type unique not null,
  name text not null,
  is_enabled boolean not null default true,
  weather_sensitive boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ops_restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  area_id uuid references public.ops_restaurant_areas(id),
  area_code ops_area_type not null,
  capacity_min int not null check (capacity_min > 0),
  capacity_max int not null check (capacity_max >= capacity_min),
  status ops_table_status not null default 'libre',
  is_romantic boolean not null default false,
  is_accessible boolean not null default false,
  is_premium boolean not null default false,
  near_window_flag boolean not null default false,
  outdoor_exposure_level ops_outdoor_exposure not null default 'medium',
  active_service_periods ops_service_period[] not null default array['lunch','dinner']::ops_service_period[],
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.ops_table_combinations (
  id uuid primary key default gen_random_uuid(),
  table_a_id uuid not null references public.ops_restaurant_tables(id),
  table_b_id uuid not null references public.ops_restaurant_tables(id),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(table_a_id, table_b_id),
  check (table_a_id <> table_b_id)
);

create table if not exists public.ops_service_slots (
  id uuid primary key default gen_random_uuid(),
  service_date date not null,
  service_period ops_service_period not null,
  area_id uuid not null references public.ops_restaurant_areas(id),
  start_time time not null,
  end_time time not null,
  total_tables_available int not null,
  total_covers_reserved int not null default 0,
  total_covers_remaining int not null,
  is_closed boolean not null default false,
  closure_reason text,
  manual_override_by uuid references public.ops_staff_users(id),
  reservation_cutoff_minutes int not null default 120,
  weather_sensitive_flag boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(service_date, service_period, area_id, start_time)
);

create table if not exists public.ops_reservations (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null default gen_random_uuid() unique,
  customer_id uuid not null references public.ops_customers(id),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  reservation_date date not null,
  reservation_time time not null,
  reservation_datetime timestamptz,
  party_size int not null check (party_size > 0),
  area_preference ops_area_type,
  occasion ops_occasion_type not null default 'none',
  source ops_reservation_source not null default 'web',
  status ops_reservation_status not null default 'new_request',
  estimated_duration_minutes int not null,
  assigned_table_id uuid references public.ops_restaurant_tables(id),
  assigned_table_group text[] not null default array[]::text[],
  internal_notes text,
  customer_notes text,
  cancellation_reason text,
  confirmation_sent_at timestamptz,
  reminder_24h_sent_at timestamptz,
  reminder_same_day_sent_at timestamptz,
  cancelled_at timestamptz,
  created_by uuid references public.ops_staff_users(id),
  updated_by uuid references public.ops_staff_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.ops_reservation_table_assignments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.ops_reservations(id),
  table_id uuid not null references public.ops_restaurant_tables(id),
  assigned_at timestamptz not null default now(),
  assigned_by uuid references public.ops_staff_users(id),
  unassigned_at timestamptz
);

create table if not exists public.ops_reservation_events (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.ops_reservations(id),
  event_type text not null,
  old_value jsonb,
  new_value jsonb,
  actor_role text not null,
  actor_user_id uuid references public.ops_staff_users(id),
  actor_channel text not null default 'api',
  created_at timestamptz not null default now()
);

create table if not exists public.ops_waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.ops_customers(id),
  service_date date not null,
  service_period ops_service_period not null,
  party_size int not null,
  area_preference ops_area_type,
  priority_score int not null default 0,
  status ops_waitlist_status not null default 'waiting',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ops_notification_templates (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  channel ops_notification_channel not null,
  subject text,
  body text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ops_notification_logs (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid references public.ops_reservations(id),
  customer_id uuid references public.ops_customers(id),
  template_id uuid references public.ops_notification_templates(id),
  template_key text not null,
  channel ops_notification_channel not null,
  delivery_status ops_notification_status not null,
  delivery_attempts int not null default 1,
  last_attempt_at timestamptz not null default now(),
  failure_reason text,
  external_message_id text,
  provider_response jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.ops_reports_cache (
  id uuid primary key default gen_random_uuid(),
  report_key text not null,
  report_date date not null,
  payload jsonb not null,
  generated_at timestamptz not null default now(),
  unique(report_key, report_date)
);

create table if not exists public.ops_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.ops_staff_users(id),
  actor_role text,
  action_type text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.ops_holidays (
  id uuid primary key default gen_random_uuid(),
  holiday_date date unique not null,
  reason text,
  is_closed boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ops_faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

