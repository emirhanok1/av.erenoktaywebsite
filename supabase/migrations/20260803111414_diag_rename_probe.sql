-- Tani: "submissions" isminin kendisiyle mi ilgili bir sorun var?
create table diag_probe_table (
  id uuid primary key default gen_random_uuid(),
  note text
);
alter table diag_probe_table enable row level security;
create policy "diag_probe_anon_insert" on diag_probe_table for insert to anon with check (true);
