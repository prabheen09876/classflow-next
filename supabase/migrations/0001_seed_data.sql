-- Seed data for users and profiles

-- Note: Passwords are hashed using bcrypt.
-- The password for all users is 'password123'
-- The password for the admin is 'THEULTIMATEPASSX'

-- To clear existing data (optional, be careful in production)
-- TRUNCATE TABLE public.profiles RESTART IDENTITY CASCADE;
-- TRUNCATE TABLE auth.users RESTART IDENTITY CASCADE;

-- Admin User
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id, raw_app_meta_data, raw_user_meta_data, app_metadata, user_metadata)
VALUES (
    '8c5a947c-7243-40a2-9f3c-835b1a4c49c1',
    'codenerds@protonmail.com',
    '$2a$10$f/3n.9rT.rA3n.lqZ.dGq.R/5S.F/S.f/S.F/S.F/S.F/S.F', -- This is a placeholder bcrypt hash for 'THEULTIMATEPASSX'
    'authenticated',
    'authenticated',
    '00000000-0000-0000-0000-000000000000',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    '{"provider": "email", "providers": ["email"]}',
    '{}'
);

INSERT INTO public.profiles (id, name, email, role)
VALUES ('8c5a947c-7243-40a2-9f3c-835b1a4c49c1', 'Admin User', 'codenerds@protonmail.com', 'admin');

-- HOS User
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id, raw_app_meta_data, raw_user_meta_data, app_metadata, user_metadata)
VALUES (
    '9b6a3e4d-8241-41b2-8f4c-935b2b5d59d2',
    'hos@example.com',
    '$2a$10$9.dGq.R/5S.F/S.f/S.F/S.F/S.F/S.F/S.F/S.F/S.f', -- This is a placeholder bcrypt hash for 'password123'
    'authenticated',
    'authenticated',
    '00000000-0000-0000-0000-000000000000',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    '{"provider": "email", "providers": ["email"]}',
    '{}'
);

INSERT INTO public.profiles (id, name, email, role)
VALUES ('9b6a3e4d-8241-41b2-8f4c-935b2b5d59d2', 'Dr. Head of School', 'hos@example.com', 'hos');

-- Teacher User
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id, raw_app_meta_data, raw_user_meta_data, app_metadata, user_metadata)
VALUES (
    '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    'teacher@example.com',
    '$2a$10$9.dGq.R/5S.F/S.f/S.F/S.F/S.F/S.F/S.F/S.F/S.f', -- This is a placeholder bcrypt hash for 'password123'
    'authenticated',
    'authenticated',
    '00000000-0000-0000-0000-000000000000',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    '{"provider": "email", "providers": ["email"]}',
    '{}'
);

INSERT INTO public.profiles (id, name, email, role)
VALUES ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Prof. Instructor', 'teacher@example.com', 'teacher');

-- Student User
INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id, raw_app_meta_data, raw_user_meta_data, app_metadata, user_metadata)
VALUES (
    '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    'student@example.com',
    '$2a$10$9.dGq.R/5S.F/S.f/S.F/S.F/S.F/S.F/S.F/S.F/S.f', -- This is a placeholder bcrypt hash for 'password123'
    'authenticated',
    'authenticated',
    '00000000-0000-0000-0000-000000000000',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    '{"provider": "email", "providers": ["email"]}',
    '{}'
);

INSERT INTO public.profiles (id, name, email, role, class)
VALUES ('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'John Doe', 'student@example.com', 'student', 'CS 3A');
