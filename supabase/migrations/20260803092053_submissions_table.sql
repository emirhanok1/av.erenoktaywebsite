-- Hesaplama araçları / formlar özelliği: değer kaybı ve bedeni hasar
-- formlarından gelen kayıtları tutar. Kıdem/ihbar hesaplayıcısı hiçbir
-- şey kaydetmez (saf client-side hesaplama), bu tabloya yazmaz.
create table submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('deger_kaybi', 'bedeni_hasar')),
  full_name text not null,
  phone text not null,
  email text not null,
  payload jsonb not null default '{}',
  is_read boolean not null default false,
  is_archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index idx_submissions_type on submissions using btree (type, is_archived);
create index idx_submissions_read on submissions using btree (is_read, is_archived);

alter table submissions enable row level security;
create policy "Public can insert submissions" on submissions for insert to public with check (true);
create policy "Admin full access submissions" on submissions for all to authenticated using (true) with check (true);
