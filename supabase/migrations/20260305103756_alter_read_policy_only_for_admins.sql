-- Drop the existing policy (if applicable)
DROP POLICY IF EXISTS "Select for authenticated" ON products;
-- Create the updated policy
CREATE POLICY "Only admins can read"
ON "public"."devices"
TO authenticated
USING (
  (
    EXISTS (
        SELECT 1 FROM user_roles
        WHERE ((user_roles.user_id = auth.uid()) AND (user_roles.role = 'admin'::text))
        )
    )
);