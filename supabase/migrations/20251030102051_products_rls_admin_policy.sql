CREATE POLICY "Enable all operations for admin"
  ON "public"."products"
  AS PERMISSIVE
  FOR ALL
  TO AUTHENTICATED
USING ((EXISTS ( SELECT 1
   FROM "public"."user_roles"
  WHERE (("user_roles"."user_id" = auth.uid()) AND ("user_roles"."role" = 'admin'::TEXT)))))
WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_roles"
  WHERE (("user_roles"."user_id" = auth.uid()) AND ("user_roles"."role" = 'admin'::TEXT)))));



