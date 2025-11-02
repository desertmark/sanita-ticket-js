CREATE TABLE IF NOT EXISTS "public"."settings" (
    "key" VARCHAR(100) PRIMARY KEY,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."settings" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert for authenticated" ON "public"."settings" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Select for authenticated" ON "public"."settings" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "update for authenticated" ON "public"."settings" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "delete for admin"
  ON "public"."settings"
  AS PERMISSIVE
  FOR DELETE
  TO "authenticated"
USING ((EXISTS ( SELECT 1
   FROM "public"."user_roles"
  WHERE (("user_roles"."user_id" = auth.uid()) AND ("user_roles"."role" = 'admin'::TEXT)))));