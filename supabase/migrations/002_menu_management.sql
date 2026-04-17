create table if not exists public.menu_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  description text,
  display_order int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.menu_categories(id) on delete cascade,
  name text not null,
  description text not null,
  price_label text,
  image_url text,
  tags text[] not null default '{}',
  is_signature boolean not null default false,
  is_available boolean not null default true,
  display_order int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_categories_order_idx on public.menu_categories(display_order);
create index if not exists menu_items_category_order_idx on public.menu_items(category_id, display_order);

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;

create policy "public can read active menu categories" on public.menu_categories
for select using (is_active = true);

create policy "public can read available menu items" on public.menu_items
for select using (is_available = true);

create policy "staff can read menu categories" on public.menu_categories
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "admin_recepcion manage menu categories" on public.menu_categories
for all using (public.current_user_role() in ('admin', 'recepcion'));

create policy "staff can read menu items" on public.menu_items
for select using (public.current_user_role() in ('admin', 'recepcion', 'chef'));

create policy "admin_recepcion manage menu items" on public.menu_items
for all using (public.current_user_role() in ('admin', 'recepcion'));
