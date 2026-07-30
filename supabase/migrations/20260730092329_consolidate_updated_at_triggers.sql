-- articles/faq/posts/slides each ended up with two BEFORE UPDATE triggers
-- doing the exact same thing: the "set_updated_at" one from the previous
-- migration (function set_updated_at()), plus an older, undocumented
-- "set_updated_at_<table>" one (function handle_updated_at()) whose origin
-- predates local migration history - functionally identical, just runs
-- twice per UPDATE. profiles only ever had the old one. Consolidate all
-- five tables onto a single set_updated_at trigger/function, then drop the
-- now-unused handle_updated_at() (confirmed no other trigger references it).
drop trigger if exists set_updated_at_articles on articles;
drop trigger if exists set_updated_at_faq on faq;
drop trigger if exists set_updated_at_posts on posts;
drop trigger if exists set_updated_at_slides on slides;

drop trigger if exists set_updated_at_profiles on profiles;
create trigger set_updated_at before update on profiles
  for each row execute function set_updated_at();

drop function if exists handle_updated_at();
