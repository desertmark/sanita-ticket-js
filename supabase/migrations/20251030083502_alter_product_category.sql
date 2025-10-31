--- Alter product table to increase category field length
ALTER TABLE "public"."products"
ALTER COLUMN "category" TYPE VARCHAR(255);