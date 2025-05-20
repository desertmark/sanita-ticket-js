ALTER TABLE tickets
ALTER COLUMN return_products
TYPE jsonb USING return_products::jsonb