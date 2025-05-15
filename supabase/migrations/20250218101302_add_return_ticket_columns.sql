ALTER TABLE public.tickets 
    ADD COLUMN return_ticket_id integer,
    ADD COLUMN return_products json,
    ADD COLUMN return_total_amount real;