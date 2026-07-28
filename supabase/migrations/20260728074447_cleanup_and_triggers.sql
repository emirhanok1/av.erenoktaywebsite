-- Remove duplicate/redundant slides policies. "slides_public_read" was
-- looser than "Public can view active slides" (it never excluded archived
-- rows), so an archived-but-still-active slide was technically readable
-- by anyone querying the public API directly. The app's own service layer
-- always filtered both flags, so this never surfaced as a visible bug -
-- it was a gap between the RLS policy and the app's actual intent.
drop policy if exists "slides_admin_write" on slides;
drop policy if exists "slides_public_read" on slides;

-- Keep updated_at meaningful. It previously had a default of now() at
-- insert time but nothing ever touched it again on UPDATE, so every row
-- silently reported updated_at == created_at forever regardless of edits.
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on posts
  for each row execute function set_updated_at();
create trigger set_updated_at before update on articles
  for each row execute function set_updated_at();
create trigger set_updated_at before update on faq
  for each row execute function set_updated_at();
create trigger set_updated_at before update on slides
  for each row execute function set_updated_at();
