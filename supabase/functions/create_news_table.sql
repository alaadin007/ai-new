create or replace function create_news_table()
returns void
language plpgsql
security definer
as $$
begin
  create table if not exists public.news_articles (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    source text not null,
    summary text not null,
    content text not null,
    url text not null,
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Create index for faster queries if it doesn't exist
  if not exists (
    select 1
    from pg_indexes
    where tablename = 'news_articles'
    and indexname = 'news_articles_published_at_idx'
  ) then
    create index news_articles_published_at_idx on public.news_articles(published_at);
  end if;

  -- Enable RLS but allow public read access
  alter table public.news_articles enable row level security;

  -- Create policy if it doesn't exist
  if not exists (
    select 1
    from pg_policies
    where tablename = 'news_articles'
    and policyname = 'Allow public read access'
  ) then
    create policy "Allow public read access"
      on public.news_articles for select
      using (true);
  end if;
end;
$$;