SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '73463064-91d2-4393-bd73-a1a5c810b0ef', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"fer.guitar.ln@gmail.com","user_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","user_phone":""}}', '2024-06-07 11:13:00.852593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a52c65c9-eedb-4dba-96fd-d8bc3861dd08', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 12:53:55.333671+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df210c2a-4f40-4c7f-97fb-3ca4b96fb45d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 12:55:54.513268+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7065002-3a56-4e7e-9011-6a42a2eee0cf', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 13:30:06.515263+00', ''),
	('00000000-0000-0000-0000-000000000000', '62d6c13b-4027-4f76-8186-4cc43900903f', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-07 13:33:20.492999+00', ''),
	('00000000-0000-0000-0000-000000000000', '02e74495-4331-4b14-923a-1dfacf22bdb7', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 13:36:17.5097+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bd123b8-2eaf-4cd3-bfd3-6b73c56b83e1', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-07 13:36:23.917074+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c876e37-18a8-4711-b4c7-ebd0e7e17e40', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 13:37:07.887916+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1bf58e2-c5d7-4e1f-8021-2354d387174d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 13:37:08.095965+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fba58aed-0b75-4b11-9334-456e378fa4eb', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-07 13:37:27.262004+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c309be50-9723-4204-99c5-32d2409ba35d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 14:51:38.891477+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fa62ad4-40f6-4c93-8d6b-e88674910375', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 14:51:38.909165+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe67036a-1124-4e89-bfe6-6c3b87873d24', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 14:56:32.796461+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdd55d59-1d2a-4d96-913b-52aebfc3e708', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 14:56:32.8149+00', ''),
	('00000000-0000-0000-0000-000000000000', '803ca799-6fdf-4b64-afef-8d5ef55355a3', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 14:56:32.887266+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adc3a345-5c65-472e-b762-0b6c0218963c', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:11:50.859957+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f17876e2-a2e9-4316-8726-c75304b6338c', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:11:50.914011+00', ''),
	('00000000-0000-0000-0000-000000000000', '85d3d7ca-616d-4bab-9ff7-a4b92f34975d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:12:24.64585+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c2faaf1-3267-4ac6-a243-aacd60431776', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:12:24.651413+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aaf88db7-5721-49b7-962a-389e323820fa', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:14:44.250096+00', ''),
	('00000000-0000-0000-0000-000000000000', '3de3f4ac-30f9-4535-a4f0-f00618e5fb97', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:14:44.257644+00', ''),
	('00000000-0000-0000-0000-000000000000', '36f4a8c9-c64c-4115-b131-560f89725f3a', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 15:19:06.528128+00', ''),
	('00000000-0000-0000-0000-000000000000', '833d6b7d-8660-4ea8-990e-410f70e3b45e', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 16:17:07.293207+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f11e5e1-dffd-4147-ae90-ad33a025de33', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 16:17:07.294379+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ddefa70-1bdb-44dc-8cb2-0ff66bc5c162', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 17:17:53.734428+00', ''),
	('00000000-0000-0000-0000-000000000000', '5f457350-d95a-4ff3-b398-a3323860116e', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 17:17:53.735284+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7d83683-ad87-45fc-8015-2b133f9be030', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 18:16:03.263815+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd35e39d8-ea8b-4eca-8fe2-5a6f8dcc9563', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-07 18:16:03.264833+00', ''),
	('00000000-0000-0000-0000-000000000000', '95b1869f-fb7f-4a37-b827-a7b7e0d8472a', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:36:01.886009+00', ''),
	('00000000-0000-0000-0000-000000000000', '054844d5-ed9b-4b3a-a7bc-a93afa811e5a', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:36:01.913105+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd1caf87-d5af-4b67-bcf5-ca134e73b250', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:43:06.636417+00', ''),
	('00000000-0000-0000-0000-000000000000', '05d5e983-a072-4d9c-8022-d2070cc8db2c', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:43:06.63829+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb1a59e4-6af0-4214-8858-d0e687e90e5f', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:44:40.899401+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c28eae21-ca18-4ffb-83fc-861cea68a12d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:44:40.912043+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6d1a5bc-1a5b-450f-999b-a0f347c78f03', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-07 18:47:58.383217+00', ''),
	('00000000-0000-0000-0000-000000000000', '16f120f2-7b08-4c2d-b6e4-766984a5e76b', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 19:26:43.425366+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd687b055-4345-44c5-8393-671d888773a2', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 19:26:43.426899+00', ''),
	('00000000-0000-0000-0000-000000000000', '061e55ad-1325-4357-966d-91b93a00b55d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 19:50:42.472148+00', ''),
	('00000000-0000-0000-0000-000000000000', '70f6442a-7e30-4309-b5a4-ca167f3881be', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 19:50:42.491415+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ed0e91e-d944-49bf-abf9-6ec9e3f4bdb1', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 19:58:22.269327+00', ''),
	('00000000-0000-0000-0000-000000000000', '88a346e7-eeb2-426e-a7ac-18a9c38a0a53', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-17 19:58:25.786176+00', ''),
	('00000000-0000-0000-0000-000000000000', '305836e2-a070-4b76-92f6-8df90f26e80e', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-17 22:12:14.633463+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c56140d4-c131-42f0-a532-db689a82bd97', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 09:58:33.252628+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b08c642-46b2-4f57-ba98-8731534103ab', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 09:58:33.258278+00', ''),
	('00000000-0000-0000-0000-000000000000', '37419393-bd5b-434d-9898-b4e66c4a385e', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:21:09.047172+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c1a73ce-611d-4446-acd5-2035cce1ce84', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:21:09.075584+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb695fa6-67e0-46ed-be7b-34caa324ff61', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:21:35.587612+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b382706-6725-4910-8b0f-15172ca17005', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:21:35.633718+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd1b16d0c-258c-4475-8274-b5a164742d86', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:22:35.382051+00', ''),
	('00000000-0000-0000-0000-000000000000', '1fbeadc9-f24b-44f1-8e02-6005827838c0', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:22:35.417506+00', ''),
	('00000000-0000-0000-0000-000000000000', '38d63102-5e1b-42f6-8f52-22ea1ac8a762', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:23:25.215914+00', ''),
	('00000000-0000-0000-0000-000000000000', '071de6f4-b494-4bc1-b099-475ef4b0c6fc', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:23:25.283954+00', ''),
	('00000000-0000-0000-0000-000000000000', '3be222c3-8620-4e2a-8132-62a4c42fd5d1', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:23:54.435097+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b94b016e-b029-40b6-a8d0-da3a4a139bf1', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 10:24:11.604001+00', ''),
	('00000000-0000-0000-0000-000000000000', '2bf76f25-3db0-4cf9-ba1d-dcc4cc82c83c', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-18 10:24:13.462362+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fcd98be-2787-4ec9-aaf4-e9f621b5a355', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 12:49:38.752236+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adcb0a1d-12d4-474b-9486-e91ed7cbdd13', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 14:31:00.18734+00', ''),
	('00000000-0000-0000-0000-000000000000', '2324ad3f-fd66-442d-adc0-9139338f6d15', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 14:31:00.189823+00', ''),
	('00000000-0000-0000-0000-000000000000', '60b52887-b170-4a39-8143-ca292f02629f', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 14:31:23.249217+00', ''),
	('00000000-0000-0000-0000-000000000000', '25c91515-7a16-489e-8078-66ea7e3a787d', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 14:31:23.314299+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a70d2917-8a22-4f61-af36-623ce0802bbd', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 14:32:11.288452+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3054e36-4881-4077-b784-81db85831e34', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-18 14:40:40.520497+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2942311-22e1-4a2a-b464-a7c3cc37e7bf', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 14:45:53.287983+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f0713ab-d488-4a1e-baa9-8c4b3599098c', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-18 14:45:53.327157+00', ''),
	('00000000-0000-0000-0000-000000000000', '71618d97-67f9-4ae0-a43a-52200274ee71', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 15:45:52.578301+00', ''),
	('00000000-0000-0000-0000-000000000000', '159cdd8d-753f-4d90-8cb7-d2cccc6f78c0', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 15:45:52.578907+00', ''),
	('00000000-0000-0000-0000-000000000000', '985eb863-da0a-41a7-ad12-5c3c30babd2b', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 16:45:51.593406+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b31e2898-fe92-429d-a1f8-390044cfbec5', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 16:45:51.595445+00', ''),
	('00000000-0000-0000-0000-000000000000', '465a96db-6c53-4472-8c76-747866d9ffe7', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 17:45:50.613041+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b86b0a90-6bf8-460a-8732-02f5d25fdd5f', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 17:45:50.614444+00', ''),
	('00000000-0000-0000-0000-000000000000', '73228403-83d6-4924-92db-f6558cc68893', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 18:45:49.492215+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af59711e-9620-4f3b-b918-998011b31288', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 18:45:49.492822+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3e03877-dc3d-45ac-b549-3d2ac7bd5f6b', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 19:45:48.569386+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e69630a1-217d-4043-8e7d-63e4a8880b70', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 19:45:48.570464+00', ''),
	('00000000-0000-0000-0000-000000000000', '87a3608b-a16e-40d4-8ba9-e562e3b2c198', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 20:44:09.894195+00', ''),
	('00000000-0000-0000-0000-000000000000', '1dfdf553-16d2-4cec-bcea-a7923fc66d4d', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 20:44:09.898304+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e2689235-b745-40d2-a758-2d29d0c208e3', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 21:45:34.015762+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5ab1fbe-bb55-4fe9-aa3a-93da9e7f14fb', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-18 21:45:34.019667+00', ''),
	('00000000-0000-0000-0000-000000000000', '596ac382-aad1-4400-8c2e-a9c0d057b41e', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-18 22:17:50.962842+00', ''),
	('00000000-0000-0000-0000-000000000000', '608035e6-4fb1-414b-87d9-4e6db8063495', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-19 07:14:07.440843+00', ''),
	('00000000-0000-0000-0000-000000000000', '3379e0c5-c352-4130-8f00-99d120b7bdfe', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-19 07:14:07.435882+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b28aae5f-1f4e-4a6f-b113-c21a58515c62', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 08:12:24.019619+00', ''),
	('00000000-0000-0000-0000-000000000000', '9b5dc8c3-2108-493f-ba10-51d4715ee50d', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 08:12:24.021647+00', ''),
	('00000000-0000-0000-0000-000000000000', '12eb09e8-6483-40d6-865d-1648eac5c395', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 09:10:24.055952+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da1152e1-f6e0-4e2c-a68e-54a0c31f24cf', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 09:10:24.056999+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ab0addd-ea6e-424d-8c6b-fe809a26ff78', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 10:08:24.14948+00', ''),
	('00000000-0000-0000-0000-000000000000', '09a62156-6803-4a2e-ba66-949962c77212', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 10:08:24.152144+00', ''),
	('00000000-0000-0000-0000-000000000000', '082853d0-7a87-45fe-9793-50fb4015d49c', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 11:06:24.238497+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ec72aae-ea0d-474c-8601-f24545a9d0e9', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 11:06:24.239321+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ab27858-aaac-460c-a79a-843a6b020b4a', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 12:04:24.092196+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c589a17c-7d78-4d78-a4cc-d442fed077f6', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 12:04:24.093652+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dea90611-92cc-49bf-8088-1c98f1b9564f', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 13:02:24.20094+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac00f2a1-b489-482c-97a9-f59be410b32b', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 13:02:24.202287+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6598234-85ca-4270-9696-d6a779c4bb17', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 14:00:24.11677+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a8e0350-a01c-403a-9d9e-f5285f8a4f8d', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 14:00:24.118268+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c88b4f0-73bf-4bad-83de-0ec20da1c879', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 14:58:23.876984+00', ''),
	('00000000-0000-0000-0000-000000000000', '289a4542-9c1a-405d-b53d-65b1074b5d34', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-19 14:58:23.880037+00', ''),
	('00000000-0000-0000-0000-000000000000', '937ce079-54c0-4028-b603-f854678e83da', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 08:07:45.091108+00', ''),
	('00000000-0000-0000-0000-000000000000', '31cf32aa-e650-4c38-9e34-a83b179c99ca', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 08:07:45.10002+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d06826c-6af8-42f8-9018-01e2c910c1b8', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 08:22:53.441889+00', ''),
	('00000000-0000-0000-0000-000000000000', '86dd70e3-e1a6-4b24-90d0-f7da2f8ee802', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"ventas@sanita.com","user_id":"041679c9-b951-4054-a1ba-681a291e3699","user_phone":""}}', '2024-06-21 08:44:20.619307+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ee3c497-a539-47cc-bb03-5df9965f95a5', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 08:44:50.502294+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dbb767a-4500-4b09-9771-b27367a0eabc', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 08:44:59.171652+00', ''),
	('00000000-0000-0000-0000-000000000000', 'debbfe4b-61b7-4818-871a-ff36c652125d', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:17:40.493355+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dcc99505-8b3c-46b5-a85f-f56eba6dc0d8', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:17:40.503103+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ba7c003-65a9-431e-8f59-d586ef6b480c', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 09:21:51.546851+00', ''),
	('00000000-0000-0000-0000-000000000000', '366c20a4-bd24-494a-9538-6d3d432c5924', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:22:02.147191+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e7aa2d0-de49-404c-8f8e-1dc624c9bc39', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:22:02.158544+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ce43757-e368-4e19-914f-2152ca25a7de', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 09:22:03.719433+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1c9b514-0520-4466-be93-ac7c97303a02', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:23:39.454242+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e08613d-4d17-410c-8152-57996358f21b', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 09:23:39.465346+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ab9f0ab-d69c-4048-8522-89dd43a29c7f', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"fer.guitar.ln@gmail.com","user_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","user_phone":""}}', '2024-06-21 10:19:56.80296+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d66b433-fefc-4fbe-a156-feddded4f757', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"fer.guitar.ln@gmail.com","user_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","user_phone":""}}', '2024-06-21 10:21:21.844323+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de095dd1-440b-4c9e-ac7f-371590f0b8db', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 10:23:35.806511+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ed424d8-7f0c-4be7-99b5-4e9f1be15fa5', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 10:23:35.807446+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f34bd391-235f-4c98-a8a3-eb8f42b3361e', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 10:27:36.088308+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b045937f-6a36-49d1-bc21-14c7e09d840c', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:38:34.510468+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad98504e-20f1-4b80-93bf-166d359997c4', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:38:34.516033+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2403c18-8d87-48c5-8a16-e90909f80d7d', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 10:40:31.254658+00', ''),
	('00000000-0000-0000-0000-000000000000', '77d85a40-5f63-43fa-bfb9-1c9d6ef64e46', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:40:38.904635+00', ''),
	('00000000-0000-0000-0000-000000000000', '2896a699-ccb3-455d-801f-771d739102ec', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:40:38.92187+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1ff76ec-200c-4d98-baa2-9c1187a1904d', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 10:45:33.351311+00', ''),
	('00000000-0000-0000-0000-000000000000', '713e1005-2c85-45a4-ada7-28382ac11793', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:45:40.725789+00', ''),
	('00000000-0000-0000-0000-000000000000', '47486a6b-69ac-408a-8165-627e0cbb5aa3', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 10:45:40.733438+00', ''),
	('00000000-0000-0000-0000-000000000000', '60c68c6d-9529-4680-834f-f901e88bc56a', '{"action":"token_refreshed","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 12:45:32.968245+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a3738e5-8dd0-4ab1-99c2-82b5adb50560', '{"action":"token_revoked","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-06-21 12:45:32.970063+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eff0b513-650d-4219-bad0-11608fb015e0', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 13:38:17.012325+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bef061b8-7996-4860-95c8-c1dc7073e82b', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:38:24.607658+00', ''),
	('00000000-0000-0000-0000-000000000000', '449e4cc4-c438-4f12-bfcb-9ca8873bb220', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:38:24.662571+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af9d0707-b511-48d6-81e8-9b9095068205', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 13:46:38.279482+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cddc7bcb-4b5a-4120-ad23-3f2bd4f9dc2e', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:46:54.739489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c1c122ed-6363-4b44-8726-e1622f3aef9e', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 13:54:23.949704+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4c44474-f037-4f69-9560-76a099b86eed', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:54:35.67219+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ecfb5056-2734-4f9f-a13f-8a877e18036e', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:54:35.763625+00', ''),
	('00000000-0000-0000-0000-000000000000', '89973cfa-6742-46dd-a7ab-d80ff3934cf3', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 13:54:39.754566+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1d51f11-6c73-4587-9d7d-3e421c8f7d03', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 13:57:35.759931+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd16fb03-5b63-40f2-8eea-24f30ac22eae', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:04:22.245096+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd37232b1-fe88-4d94-afd1-2fb875e6b4c2', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:04:46.235878+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a204ed47-7a45-4656-b219-ad9dc0267978', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:04:46.283093+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e0d7112-ebf4-47c8-a25b-a6ef75fb4709', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:05:15.369991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e29a28f3-eebc-4a6f-84d8-ab23576a851f', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:05:21.632761+00', ''),
	('00000000-0000-0000-0000-000000000000', '9475dd0b-cb9f-480f-bf87-29d69ca53415', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:05:21.68808+00', ''),
	('00000000-0000-0000-0000-000000000000', '53977fc7-ada8-4c67-b5f8-4f4bcb41927f', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:06:41.418155+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e4bc1b6-b709-4d91-8c5b-7b91f884579b', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:06:52.169707+00', ''),
	('00000000-0000-0000-0000-000000000000', '27dce73e-0d6e-422a-b3e2-e6a314ea63d8', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:06:52.234722+00', ''),
	('00000000-0000-0000-0000-000000000000', '14d3ecd1-a43f-48ce-8ec0-b81289f24343', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:07:02.436499+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c05d73f-e824-488a-b15d-bba50e54e421', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:07:09.838708+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd19e2f50-d56d-4a24-8941-80fe5ac93184', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:07:09.851984+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7ac7351-ee8f-4f7d-827d-67f9b255e2e6', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:07:41.657804+00', ''),
	('00000000-0000-0000-0000-000000000000', '18b783ae-a7df-4941-a189-b218fb15d420', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:07:51.683755+00', ''),
	('00000000-0000-0000-0000-000000000000', '98893af5-70c0-43b8-9bbd-a5135eb02e74', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:07:51.694076+00', ''),
	('00000000-0000-0000-0000-000000000000', '84bad74d-5ea2-43fc-b5aa-1b331845000d', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:13:00.586348+00', ''),
	('00000000-0000-0000-0000-000000000000', '155c0510-c0fe-4007-93a0-1e5827d0d825', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:13:15.570358+00', ''),
	('00000000-0000-0000-0000-000000000000', '6749c2af-51df-4505-8794-05ff8d984adf', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:13:15.627208+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cf730362-3ec0-468e-801b-485964560e4f', '{"action":"logout","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:22:06.454646+00', ''),
	('00000000-0000-0000-0000-000000000000', '44329504-1991-4637-92e0-edd640eaef98', '{"action":"login","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:22:20.3966+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd840ea1f-bf0b-430c-a8fa-c6694d9348bd', '{"action":"logout","actor_id":"f583fd6d-64a0-4498-919a-d552b3bfe123","actor_username":"fer.guitar.ln@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-06-21 14:35:17.888159+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e582c81-0abe-4fb7-83f3-fe1feb54377f', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:35:25.043963+00', ''),
	('00000000-0000-0000-0000-000000000000', '99018bbc-948e-4f20-92e7-b60ca2be24aa', '{"action":"login","actor_id":"041679c9-b951-4054-a1ba-681a291e3699","actor_username":"ventas@sanita.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-06-21 14:35:25.0551+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



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
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('51d602b6-a3e1-4f96-8b32-021721d4c3ad', '041679c9-b951-4054-a1ba-681a291e3699', '2024-06-21 14:35:25.044768+00', '2024-06-21 14:35:25.044768+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) sanita-ticket-js/1.0.0 Chrome/108.0.5359.215 Electron/22.3.27 Safari/537.36', '46.6.39.68', NULL),
	('aa90d973-35f8-4ff3-b2c7-3dfe08dd734a', '041679c9-b951-4054-a1ba-681a291e3699', '2024-06-21 14:35:25.056994+00', '2024-06-21 14:35:25.056994+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) sanita-ticket-js/1.0.0 Chrome/108.0.5359.215 Electron/22.3.27 Safari/537.36', '46.6.39.68', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('51d602b6-a3e1-4f96-8b32-021721d4c3ad', '2024-06-21 14:35:25.049956+00', '2024-06-21 14:35:25.049956+00', 'password', '63c3ae55-4e3b-4198-a075-2c09645400ea'),
	('aa90d973-35f8-4ff3-b2c7-3dfe08dd734a', '2024-06-21 14:35:25.061922+00', '2024-06-21 14:35:25.061922+00', 'password', 'f6814d8b-ca48-4413-8281-eada84d7c87c');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 105, 'Y6PyeHXgScI_JuwGpoVmfA', '041679c9-b951-4054-a1ba-681a291e3699', false, '2024-06-21 14:35:25.046915+00', '2024-06-21 14:35:25.046915+00', NULL, '51d602b6-a3e1-4f96-8b32-021721d4c3ad'),
	('00000000-0000-0000-0000-000000000000', 106, 'E5U02a69UksSzJIe4d7SFg', '041679c9-b951-4054-a1ba-681a291e3699', false, '2024-06-21 14:35:25.059141+00', '2024-06-21 14:35:25.059141+00', NULL, 'aa90d973-35f8-4ff3-b2c7-3dfe08dd734a');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."settings" ("id", "ticketnumber", "settings") VALUES
	(1, 6, '{"ticketNumber": 15}');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_roles" ("user_id", "role") VALUES
	('f583fd6d-64a0-4498-919a-d552b3bfe123', 'admin');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 106, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."settings_id_seq"', 2, true);


--
-- Name: tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tickets_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
