-- "Public can insert submissions" (for insert to public with check (true))
-- doğrulandığında (curl + gerçek @supabase/ssr server client ile, hem REST
-- API üzerinden hem SET ROLE anon ile dogrudan SQL'de) anon rolünden gelen
-- insert'leri "new row violates row-level security policy" ile reddettiği
-- görüldü - policy tanımı (pg_policies) tamamen doğru görünmesine rağmen.
-- Supabase'in kendi dokümantasyonundaki idiom olan, generic "public"
-- pseudo-role yerine "anon" rolünü açıkça hedefleyen policy ile değiştiriliyor.
drop policy if exists "Public can insert submissions" on submissions;
create policy "submissions_anon_insert" on submissions for insert to anon with check (true);
