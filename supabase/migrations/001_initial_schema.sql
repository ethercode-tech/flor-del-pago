create extension if not exists "uuid-ossp";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null check (role in ('admin', 'recepcion', 'chef')),
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null unique,
  email text unique,
  birthday date,
  notes text,
  vip boolean not null default false,
  visit_count int not null default 0,
  total_spent numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tables (
  id uuid primary key default uuid_generate_v4(),
  table_name text not null unique,
  area text not null check (area in ('interior', 'galeria', 'jardin')),
  capacity int not null check (capacity > 0),
  status text not null default 'libre' check (status in ('libre', 'reservada', 'ocupada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  reservation_date date not null,
  reservation_time time not null,
  guests_count int not null check (guests_count between 1 and 16),
  area_preference text check (area_preference in ('interior', 'galeria', 'jardin')),
  occasion_type text,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show')),
  source text not null default 'web' check (source in ('web', 'manual', 'whatsapp')),
  assigned_table_id uuid references public.tables(id),
  confirmation_sent_at timestamptz,
  reminder_sent_at timestamptz,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists reservations_table_slot_unique
on public.reservations(assigned_table_id, reservation_date, reservation_time)
where assigned_table_id is not null and status in ('pending', 'confirmed', 'seated', 'completed');

create index if not exists reservations_date_idx on public.reservations(reservation_date);
create index if not exists reservations_status_idx on public.reservations(status);

create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  review_text text not null,
  rating int not null check (rating between 1 and 5),
  source text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(12,2) not null default 0,
  category text not null,
  image_url text,
  stock int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id),
  total numeric(12,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.tables enable row level security;
alter table public.reservations enable row level security;
alter table public.testimonials enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

create or replace function public.current_user_role()
returns text
language sql
stable
as $$
  select role from public.users where id = auth.uid();
$$;

create policy "staff can read users" on public.users
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "admin can manage users" on public.users
for all using (public.current_user_role() = 'admin');

create policy "staff can read customers" on public.customers
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "staff can write customers" on public.customers
for all using (public.current_user_role() in ('admin', 'recepcion'));

create policy "staff can read tables" on public.tables
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "admin_recepcion write tables" on public.tables
for all using (public.current_user_role() in ('admin', 'recepcion'));

create policy "staff can read reservations" on public.reservations
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "admin_recepcion write reservations" on public.reservations
for all using (public.current_user_role() in ('admin', 'recepcion'));

create policy "public can read testimonials" on public.testimonials
for select using (true);

create policy "staff manage testimonials" on public.testimonials
for all using (public.current_user_role() in ('admin', 'recepcion'));

create policy "public can read products" on public.products
for select using (true);

create policy "admin manages products" on public.products
for all using (public.current_user_role() = 'admin');

create policy "admin manages orders" on public.orders
for all using (public.current_user_role() = 'admin');
