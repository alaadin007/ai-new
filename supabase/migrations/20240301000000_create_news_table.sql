-- Create news_articles table
create table if not exists public.news_articles (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    source text not null,
    summary text not null,
    content text not null,
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster queries
create index if not exists news_articles_published_at_idx on public.news_articles(published_at);

-- Enable RLS but allow public read access
alter table public.news_articles enable row level security;

create policy "Allow public read access"
    on public.news_articles for select
    using (true);

-- Insert initial sample data
insert into public.news_articles (title, source, summary, content, published_at)
values 
    (
        'BCAM Updates Complication Management Protocol',
        'British College of Aesthetic Medicine',
        'New guidelines for managing dermal filler complications with updated vascular occlusion protocols and emergency response procedures.',
        E'The British College of Aesthetic Medicine has released comprehensive new guidelines for managing dermal filler complications, with a particular focus on vascular occlusion protocols.\n\nKey Updates:\n\n• Immediate recognition protocols with detailed visual assessment guidelines\n• Step-by-step emergency response procedures\n• Updated hyaluronidase dosing recommendations\n• Post-complication monitoring requirements\n\nThe guidelines emphasize the importance of practitioner preparedness and early intervention in cases of vascular compromise. They include specific recommendations for different anatomical areas and various types of dermal fillers.\n\nClinical Implications:\n\n• Enhanced safety protocols for high-risk areas\n• Standardized emergency kit requirements\n• Clear documentation procedures\n• Regular team training recommendations',
        now()
    ),
    (
        'New Research on Combination Treatments',
        'Journal of Clinical Aesthetics',
        'Latest research reveals optimal protocols for combining botulinum toxin treatments with dermal fillers, showing enhanced results and patient satisfaction.',
        E'A groundbreaking study published in the Journal of Clinical Aesthetics demonstrates the benefits of properly sequenced combination treatments.\n\nKey Findings:\n\n• Optimal timing between toxin and filler treatments\n• Synergistic effects in specific facial areas\n• Patient satisfaction metrics\n• Long-term results analysis\n\nThe research provides evidence-based recommendations for timing and technique when combining different aesthetic procedures, with a particular focus on patient outcomes and safety.\n\nClinical Applications:\n\n• Treatment sequencing guidelines\n• Product selection criteria\n• Technical considerations\n• Patient assessment protocols',
        now() - interval '1 day'
    );