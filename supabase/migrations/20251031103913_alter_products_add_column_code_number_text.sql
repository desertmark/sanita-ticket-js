--- Alter product table to add a column to store the code withot the dots:i.e 01.01.01.01 --> 01010101
ALTER TABLE "public"."products"
ADD COLUMN "code_number_text" VARCHAR(20);