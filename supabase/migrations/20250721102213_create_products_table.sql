CREATE TABLE IF NOT EXISTS "public"."products" (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    code_number BIGINT,
    description VARCHAR(255),
    price DECIMAL(15,2), -- PRICES
    discount_percentage DECIMAL(5,2), -- PERCENTAGES
    discount_percentage_2 DECIMAL(5,2), -- PERCENTAGE
    cash_discount_1 DECIMAL(5,2), -- PERCENTAGES
    cash_discount_2 DECIMAL(5,2), -- PERCENTAGES
    cost DECIMAL(15,2), -- PRICES
    profit DECIMAL(5,2), -- PERCENTAGE multiplier 1,3 = 30% profit
    list_price DECIMAL(15,2), -- PRICES
    tax DECIMAL(5,2), -- PERCENTAGES
    dollar DECIMAL(15,2), -- PRICES
    freight DECIMAL(5,2), -- PERCENTAGES
    category VARCHAR(100),
    card DECIMAL(5,2), -- PERCENTAGES
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);