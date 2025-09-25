
-- This script seeds the database with initial data for testing purposes.
-- It is designed to be run after the initial schema migration.

-- WARNING: This script will delete existing data in the profiles, homework, and teacherAttendance tables.
-- DO NOT run this on a production database.

-- Clear existing data
DELETE FROM "auth"."users";
DELETE FROM "public"."profiles";
DELETE FROM "public"."homework";
DELETE FROM "public"."teacher_attendance";


-- Seed Users and Profiles

-- 1. Admin User
-- Password: THEULTIMATEPASSX
-- You will need to sign up with this email and password in the application to create the auth user.
-- The profiles table will be populated via the trigger upon signup.
INSERT INTO "auth"."users" (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_sent_at, confirmed_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'a0e3c5a6-0b8c-4b1e-8e2b-2d9d1b0c9a7d', 'authenticated', 'authenticated', 'codenerds@protonmail.com', '$2a$10$NotTheRealPasswordHashButValid123', '2023-01-01 00:00:00+00', 'recoverytoken', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', '{"provider":"email","providers":["email"]}', '{"name": "Admin User"}', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', NULL, '', NULL, '2023-01-01 00:00:00+00');

INSERT INTO "public"."profiles" (id, name, email, role)
VALUES ('a0e3c5a6-0b8c-4b1e-8e2b-2d9d1b0c9a7d', 'Admin User', 'codenerds@protonmail.com', 'admin');


-- 2. HOS User
-- Password: password123
INSERT INTO "auth"."users" (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_sent_at, confirmed_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'b1e4d6b7-1c9d-5c2f-9f3c-3e0e2c1d0b8e', 'authenticated', 'authenticated', 'hos@example.com', '$2a$10$NotTheRealPasswordHashButValid123', '2023-01-01 00:00:00+00', 'recoverytoken', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', '{"provider":"email","providers":["email"]}', '{"name": "Dr. Head of School"}', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', NULL, '', NULL, '2023-01-01 00:00:00+00');

INSERT INTO "public"."profiles" (id, name, email, role)
VALUES ('b1e4d6b7-1c9d-5c2f-9f3c-3e0e2c1d0b8e', 'Dr. Head of School', 'hos@example.com', 'hos');


-- 3. Teacher User
-- Password: password123
INSERT INTO "auth"."users" (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_sent_at, confirmed_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'c2f5e7c8-2dae-6d3g-0g4d-4f1f3d2e1c9f', 'authenticated', 'authenticated', 'teacher@example.com', '$2a$10$NotTheRealPasswordHashButValid123', '2023-01-01 00:00:00+00', 'recoverytoken', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', '{"provider":"email","providers":["email"]}', '{"name": "Prof. Teacher"}', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', NULL, '', NULL, '2023-01-01 00:00:00+00');

INSERT INTO "public"."profiles" (id, name, email, role)
VALUES ('c2f5e7c8-2dae-6d3g-0g4d-4f1f3d2e1c9f', 'Prof. Teacher', 'teacher@example.com', 'teacher');


-- 4. Student User
-- Password: password123
INSERT INTO "auth"."users" (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_token, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_sent_at, confirmed_at)
VALUES
('00000000-0000-0000-0000-000000000000', 'd3g6f8d9-3ebf-7e4h-1h5e-5g2g4e3f2d0g', 'authenticated', 'authenticated', 'student@example.com', '$2a$10$NotTheRealPasswordHashButValid123', '2023-01-01 00:00:00+00', 'recoverytoken', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', '{"provider":"email","providers":["email"]}', '{"name": "Alex Student"}', '2023-01-01 00:00:00+00', '2023-01-01 00:00:00+00', NULL, '', NULL, '2023-01-01 00:00:00+00');

INSERT INTO "public"."profiles" (id, name, email, role, class)
VALUES ('d3g6f8d9-3ebf-7e4h-1h5e-5g2g4e3f2d0g', 'Alex Student', 'student@example.com', 'student', 'CS 3A');


-- Note: In a real Supabase project, passwords are not stored in plaintext.
-- The encrypted_password hash provided is a placeholder. To log in with these
-- users, you should either sign up through the application UI to create real auth
-- entries or use the Supabase dashboard to set passwords for these seeded users.
-- For the admin user, you must sign up with 'codenerds@protonmail.com' and the specified password.
