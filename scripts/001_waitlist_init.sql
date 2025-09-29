-- Enable useful extensions (safe if already enabled)
create extension if not exists pgcrypto;
create extension if not exists citext;

-- Table for waitlist signups
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  created_at timestamptz not null default now(),
  ip inet,
  user_agent text,
  referrer text
);

-- Enable RLS and allow anonymous inserts, block reads/updates/deletes by default
alter table public.waitlist_signups enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'waitlist_signups'
      and policyname = 'Allow inserts for anonymous'
  ) then
    create policy "Allow inserts for anonymous"
      on public.waitlist_signups
      for insert
      to anon
      with check (true);
  end if;
end
$$;
