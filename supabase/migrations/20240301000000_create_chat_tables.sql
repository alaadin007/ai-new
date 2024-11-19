-- Create chat_sessions table
create table public.chat_sessions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_message_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create chat_messages table
create table public.chat_messages (
    id uuid default gen_random_uuid() primary key,
    session_id uuid references public.chat_sessions(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    content text not null,
    is_ai boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index chat_sessions_user_id_idx on public.chat_sessions(user_id);
create index chat_sessions_last_message_at_idx on public.chat_sessions(last_message_at);
create index chat_messages_session_id_idx on public.chat_messages(session_id);

-- Set up row level security (RLS)
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;

-- Create policies
create policy "Users can view their own chat sessions"
    on public.chat_sessions for select
    using (auth.uid() = user_id);

create policy "Users can insert their own chat sessions"
    on public.chat_sessions for insert
    with check (auth.uid() = user_id);

create policy "Users can delete their own chat sessions"
    on public.chat_sessions for delete
    using (auth.uid() = user_id);

create policy "Users can view messages from their chat sessions"
    on public.chat_messages for select
    using (
        exists (
            select 1 from public.chat_sessions
            where id = chat_messages.session_id
            and user_id = auth.uid()
        )
    );

create policy "Users can insert messages to their chat sessions"
    on public.chat_messages for insert
    with check (
        exists (
            select 1 from public.chat_sessions
            where id = chat_messages.session_id
            and user_id = auth.uid()
        )
    );