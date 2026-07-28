-- Baseline schema snapshot, captured 2026-07-28.
-- Reconstructed from the live database to establish local migration
-- tracking; the original faz-1/faz-6b/6c/6d migrations that created this
-- schema were never committed to the repo. This file documents the exact
-- state as it existed on 2026-07-28 (including the since-removed
-- duplicate slides policies, cleaned up in the next migration).

-- === articles ===
create table articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  content text not null,
  excerpt text,
  cover_image text,
  category text,
  read_time integer,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_archived boolean not null default false
);
alter table articles add constraint articles_slug_key unique (slug);
create index idx_articles_published on articles using btree (is_published, is_archived);
create index idx_articles_slug on articles using btree (slug);

alter table articles enable row level security;
create policy "Admin full access articles" on articles for all to authenticated using (true) with check (true);
create policy "Public can view published articles" on articles for select to public using (is_published = true and is_archived = false);

-- === faq ===
create table faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_archived boolean not null default false
);
create index idx_faq_published on faq using btree (is_published, is_archived);

alter table faq enable row level security;
create policy "Admin full access faq" on faq for all to authenticated using (true) with check (true);
create policy "Public can view published faq" on faq for select to public using (is_published = true and is_archived = false);

-- === posts ===
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  content text not null,
  excerpt text,
  cover_image text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_archived boolean not null default false
);
alter table posts add constraint posts_slug_key unique (slug);
create index idx_posts_published on posts using btree (is_published, is_archived);
create index idx_posts_slug on posts using btree (slug);

alter table posts enable row level security;
create policy "Admin full access posts" on posts for all to authenticated using (true) with check (true);
create policy "Public can view published posts" on posts for select to public using (is_published = true and is_archived = false);

-- === profiles ===
-- Not currently queried anywhere in application code (auth is handled
-- directly via Supabase Auth / auth.users; this is a single-admin site).
-- Kept for historical accuracy rather than dropped silently - see rules.md.
create table profiles (
  id uuid primary key,
  full_name text not null,
  role text not null default 'admin',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_archived boolean not null default false
);

alter table profiles enable row level security;
create policy "Admin can view own profile" on profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Admin can update own profile" on profiles for update to authenticated using ((select auth.uid()) = id);

-- === slides ===
create table slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  link text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_archived boolean not null default false
);
create index idx_slides_active on slides using btree (is_active, sort_order);

alter table slides enable row level security;
create policy "Admin full access slides" on slides for all to authenticated using (true) with check (true);
create policy "Public can view active slides" on slides for select to public using (is_active = true and is_archived = false);
-- Duplicate policies from an earlier pass; removed in 20260728074447_cleanup_and_triggers.sql
create policy "slides_admin_write" on slides for all to authenticated using (true) with check (true);
create policy "slides_public_read" on slides for select to public using (is_active = true);
