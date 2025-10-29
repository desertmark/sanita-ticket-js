alter table "public"."products" enable row level security;

create policy "Enable read access for all users"
on "public"."products"
as permissive
for select
to authenticated
using (true);



