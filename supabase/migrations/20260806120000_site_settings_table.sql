-- Tekil (singleton) site ayarlari satiri. Ilk kullanim alani: Hakkimizda
-- sayfasindaki avukat fotografi, admin panelden degistirilebilsin diye
-- statik /public dosyasi yerine burada tutuluyor.
create table site_settings (
  id smallint primary key default 1,
  attorney_photo_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into site_settings (id, attorney_photo_url) values (1, '/images/eren-oktay.webp');

alter table site_settings enable row level security;
create policy "Admin full access site_settings" on site_settings for all to authenticated using (true) with check (true);
create policy "Public can view site settings" on site_settings for select to public using (true);

create trigger set_updated_at before update on site_settings
  for each row execute function set_updated_at();
