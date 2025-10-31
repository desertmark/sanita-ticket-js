ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
ON "public"."products"
AS PERMISSIVE
FOR SELECT
TO AUTHENTICATED
USING (true);



