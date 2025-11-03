CREATE TABLE IF NOT EXISTS "public"."devices" (
    "id" VARCHAR(255) PRIMARY KEY,
    "name" TEXT,
    "hostname" TEXT,
    "username" TEXT, -- this is the machine's OS user not the platform user.
    "arch" TEXT,
    "platform" TEXT,
    "release" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."devices" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert for authenticated" ON "public"."devices" FOR INSERT TO "authenticated" WITH CHECK (true);
CREATE POLICY "Select for authenticated" ON "public"."devices" FOR SELECT TO "authenticated" USING (true);
CREATE POLICY "update for authenticated" ON "public"."devices" FOR UPDATE TO "authenticated" USING (true);
CREATE POLICY "delete for admin"
  ON "public"."devices"
  AS PERMISSIVE
  FOR DELETE
  TO "authenticated"
USING ((EXISTS ( SELECT 1
   FROM "public"."user_roles"
  WHERE (("user_roles"."user_id" = auth.uid()) AND ("user_roles"."role" = 'admin'::TEXT)))));