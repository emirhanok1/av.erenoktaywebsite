-- Tanı amaçlı: "for insert to anon with check(true)" policy tanımı doğru
-- görünmesine rağmen gerçek insert'leri reddediyordu. Çalıştığı doğrulanmış
-- "Admin full access submissions" policy'siyle birebir aynı yapı (for all,
-- using + with check) denenerek "for insert"-scoped policy'lerin bu ortamda
-- bir sorunu olup olmadığı test ediliyor.
drop policy if exists "submissions_anon_insert" on submissions;
create policy "submissions_anon_insert_v2" on submissions for all to anon using (false) with check (true);
