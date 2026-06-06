-- Ejecuta este script en Supabase → SQL Editor
-- Sincroniza el progreso de ejercicios entre dispositivos por usuario

create table if not exists public.learning_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  level_id text not null,
  topic_id text not null,
  exercise_id text not null,
  completed_at timestamptz default now() not null,
  unique (user_id, level_id, topic_id, exercise_id)
);

create index if not exists learning_progress_user_id_idx
  on public.learning_progress (user_id);

alter table public.learning_progress enable row level security;

drop policy if exists "learning_progress_select_own" on public.learning_progress;
create policy "learning_progress_select_own"
  on public.learning_progress for select
  using (auth.uid() = user_id);

drop policy if exists "learning_progress_insert_own" on public.learning_progress;
create policy "learning_progress_insert_own"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "learning_progress_update_own" on public.learning_progress;
create policy "learning_progress_update_own"
  on public.learning_progress for update
  using (auth.uid() = user_id);

drop policy if exists "learning_progress_delete_own" on public.learning_progress;
create policy "learning_progress_delete_own"
  on public.learning_progress for delete
  using (auth.uid() = user_id);
