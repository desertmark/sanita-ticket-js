--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'f583fd6d-64a0-4498-919a-d552b3bfe123', 'authenticated', 'authenticated', 'fer.guitar.ln@gmail.com', '$2a$10$atXZEy6218LoYfLXB1VWH.MWXDvhn5PV7EYsd9VKyZkbZyXgGtukS', '2024-06-07 11:13:00.856811+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-06-21 14:22:20.397916+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-06-07 11:13:00.845669+00', '2024-06-21 14:22:20.401361+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '041679c9-b951-4054-a1ba-681a291e3699', 'authenticated', 'authenticated', 'ventas@sanita.com', '$2a$10$gIsnw0e4FInuBwUZqgc37.q5mhi8NijQvZJAkzb.R1t.CQ/ZSU1NO', '2024-06-21 08:44:20.622179+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-06-21 14:35:25.056907+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-06-21 08:44:20.610292+00', '2024-06-21 14:35:25.061155+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('f583fd6d-64a0-4498-919a-d552b3bfe123', 'f583fd6d-64a0-4498-919a-d552b3bfe123', '{"sub": "f583fd6d-64a0-4498-919a-d552b3bfe123", "email": "fer.guitar.ln@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-06-07 11:13:00.851374+00', '2024-06-07 11:13:00.851433+00', '2024-06-07 11:13:00.851433+00', 'ebad566e-32de-4fba-bf38-5f952f10490a'),
	('041679c9-b951-4054-a1ba-681a291e3699', '041679c9-b951-4054-a1ba-681a291e3699', '{"sub": "041679c9-b951-4054-a1ba-681a291e3699", "email": "ventas@sanita.com", "email_verified": false, "phone_verified": false}', 'email', '2024-06-21 08:44:20.616118+00', '2024-06-21 08:44:20.616188+00', '2024-06-21 08:44:20.616188+00', '3a099815-dda1-4f99-a724-c907af9fec3e');

--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_roles" ("user_id", "role") VALUES
	('f583fd6d-64a0-4498-919a-d552b3bfe123', 'admin');

--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tickets_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
