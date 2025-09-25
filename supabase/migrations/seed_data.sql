-- supabase/migrations/seed_data.sql

-- Enable pgcrypto extension for password encryption if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Seed Admin User
-- This user will have the 'admin' role in the public.profiles table.
DO $$
DECLARE
    admin_uuid uuid := 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
BEGIN
    -- Check if user already exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = admin_uuid) THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            admin_uuid,
            'codenerds@protonmail.com',
            crypt('THEULTIMATEPASSX', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );
    END IF;

    -- Check if profile already exists in public.profiles
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = admin_uuid) THEN
        INSERT INTO public.profiles (id, email, name, role)
        VALUES (
            admin_uuid,
            'codenerds@protonmail.com',
            'Admin User',
            'admin'
        );
    END IF;
END $$;


-- Seed HOS User
-- This user will have the 'hos' role.
DO $$
DECLARE
    hos_uuid uuid := 'b1c2d3e4-f5g6-7890-1234-567890abcdef';
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = hos_uuid) THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            hos_uuid,
            'hos@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = hos_uuid) THEN
        INSERT INTO public.profiles (id, email, name, role)
        VALUES (
            hos_uuid,
            'hos@example.com',
            'Dr. Head of School',
            'hos'
        );
    END IF;
END $$;


-- Seed Teacher User
-- This user will have the 'teacher' role.
DO $$
DECLARE
    teacher_uuid uuid := 'c1d2e3f4-g5h6-7890-1234-567890abcdef';
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = teacher_uuid) THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            teacher_uuid,
            'teacher@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = teacher_uuid) THEN
        INSERT INTO public.profiles (id, email, name, role)
        VALUES (
            teacher_uuid,
            'teacher@example.com',
            'Prof. Teacher',
            'teacher'
        );
    END IF;
END $$;


-- Seed Student User
-- This user will have the 'student' role.
DO $$
DECLARE
    student_uuid uuid := 'd1e2f3g4-h5i6-7890-1234-567890abcdef';
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = student_uuid) THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            student_uuid,
            'student@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = student_uuid) THEN
        INSERT INTO public.profiles (id, email, name, role)
        VALUES (
            student_uuid,
            'student@example.com',
            'Student User',
            'student'
        );
    END IF;
END $$;
