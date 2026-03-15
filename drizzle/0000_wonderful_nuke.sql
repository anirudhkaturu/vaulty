CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"company_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Function: create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;


-- Trigger: run function after a new auth user is created
create or replace trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();