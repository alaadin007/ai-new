-- Create user_usage table
create table public.user_usage (
    user_id uuid references auth.users(id) on delete cascade primary key,
    subscription_tier text not null default 'free',
    queries_used integer not null default 0,
    words_used integer not null default 0,
    last_reset_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create function to increment usage
create or replace function increment_usage(p_user_id uuid, p_word_count integer)
returns void as $$
begin
    insert into public.user_usage (user_id, queries_used, words_used)
    values (p_user_id, 1, p_word_count)
    on conflict (user_id) do update
    set queries_used = user_usage.queries_used + 1,
        words_used = user_usage.words_used + p_word_count;
end;
$$ language plpgsql security definer;

-- Set up RLS
alter table public.user_usage enable row level security;

create policy "Users can view their own usage"
    on public.user_usage for select
    using (auth.uid() = user_id);

-- Create monthly usage reset function
create or replace function reset_monthly_usage()
returns void as $$
begin
    update public.user_usage
    set words_used = 0,
        last_reset_at = timezone('utc'::text, now())
    where subscription_tier = 'silver'
    and last_reset_at < date_trunc('month', now());
end;
$$ language plpgsql security definer;