-- Create news_articles table
create table public.news_articles (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    source text not null,
    summary text not null,
    content text not null,
    url text not null,
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    meta_title text generated always as (
        title || ' | Aesthetic Intelligence News'
    ) stored,
    meta_description text generated always as (
        case 
            when length(summary) <= 160 then summary
            else substring(summary, 1, 157) || '...'
        end
    ) stored
);

-- Create index for faster queries
create index news_articles_published_at_idx on public.news_articles(published_at);

-- Enable RLS but allow public read access
alter table public.news_articles enable row level security;

create policy "Allow public read access"
    on public.news_articles for select
    using (true);

-- Create function to clean old articles (keep last 30 days)
create or replace function clean_old_articles()
returns void as $$
begin
    delete from public.news_articles
    where published_at < (now() - interval '30 days');
end;
$$ language plpgsql security definer;

-- Insert initial sample data
insert into public.news_articles (title, source, summary, content, url, published_at)
values 
    (
        'BCAM Updates Complication Management Protocol',
        'British College of Aesthetic Medicine',
        'New guidelines for managing dermal filler complications with updated vascular occlusion protocols and emergency response procedures.',
        'The British College of Aesthetic Medicine has released comprehensive new guidelines for managing dermal filler complications, with a particular focus on vascular occlusion protocols. The updated guidelines emphasize immediate recognition and treatment, providing practitioners with a detailed step-by-step approach for managing adverse events.',
        'https://bcam.ac.uk',
        now()
    ),
    (
        'New Research on Combination Treatments',
        'Journal of Clinical Aesthetics',
        'Latest research reveals optimal protocols for combining botulinum toxin treatments with dermal fillers, showing enhanced results and patient satisfaction.',
        'A groundbreaking study published in the Journal of Clinical Aesthetics demonstrates the benefits of properly sequenced combination treatments. The research provides evidence-based recommendations for timing and technique when combining different aesthetic procedures.',
        'https://jcadonline.com',
        now() - interval '1 day'
    );