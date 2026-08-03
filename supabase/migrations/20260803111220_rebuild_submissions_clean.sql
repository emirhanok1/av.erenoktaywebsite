-- Tanı sürecinde submissions tablosunda tekrar tekrar policy
-- create/drop yapıldı; policy tanımları pg_catalog'da tamamen doğru
-- görünmesine rağmen (to anon, to public, for insert, for all - hepsi
-- denendi) anon insert'leri sürekli reddedildi, aynı yapı faq üzerinde
-- ANINDA çalıştı. Yapısal olarak (relkind, inheritance, trigger, rule,
-- event trigger) hiçbir fark bulunamadı - muhtemelen bu tabloya özel,
-- connection pooler/plan cache seviyesinde bir tutarsızlık. Sadece test
-- verisi içerdiği için tablo sıfırdan temiz yeniden oluşturuluyor.

-- Tani icin faq'a eklenmis gecici policy'yi temizle
drop policy if exists "diag_faq_anon_insert" on faq;

drop table if exists submissions;

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
create policy "submissions_anon_insert" on submissions for insert to anon with check (true);
create policy "submissions_authenticated_all" on submissions for all to authenticated using (true) with check (true);
