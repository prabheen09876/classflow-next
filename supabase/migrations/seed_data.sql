-- supabase/migrations/seed_data.sql

-- Enable pgcrypto extension for crypt() function
create extension if not exists pgcrypto;

-- This script seeds the database with initial users for different roles.
-- It's designed to be idempotent, meaning it can be run multiple times without causing errors.

do $$
declare
    admin_uuid uuid := '00000000-0000-0000-0000-000000000001';
    hos_uuid uuid := '00000000-0000-0000-0000-000000000002';
    teacher_uuid uuid := '00000000-0000-0000-0000-000000000003';
    student_uuid uuid := '00000000-0000-0000-0000-000000000004';
begin
    -- Seed Admin User
    -- We use ON CONFLICT DO NOTHING for auth.users because of its complex partial index.
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        admin_uuid,
        'codenerds@protonmail.com',
        crypt('THEULTIMATEPASSX', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    -- For profiles, we can check for existence before inserting.
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = admin_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (admin_uuid, 'Admin User', 'codenerds@protonmail.com', 'admin');
    END IF;

    -- Seed HOS User
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        hos_uuid,
        'hos@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = hos_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (hos_uuid, 'Head of School', 'hos@example.com', 'hos');
    END IF;

    -- Seed Teacher User
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        teacher_uuid,
        'teacher@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = teacher_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (teacher_uuid, 'Jane Teacher', 'teacher@example.com', 'teacher');
    END IF;

    -- Seed Student User
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        student_uuid,
        'student@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = student_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (student_uuid, 'John Student', 'student@example.com', 'student', 'CS 101');
    END IF;

end $$;
