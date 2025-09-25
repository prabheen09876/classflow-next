-- supabase/migrations/seed_data.sql

-- Enable pgcrypto extension for crypt() function
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
    admin_uuid uuid := '00000000-0000-0000-0000-000000000001';
    hos_uuid uuid := '00000000-0000-0000-0000-000000000002';
    teacher_uuid uuid := '00000000-0000-0000-0000-000000000003';
    student_uuid uuid := '00000000-0000-0000-0000-000000000004';
BEGIN
    -- Seed Admin User
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'codenerds@protonmail.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            admin_uuid,
            'codenerds@protonmail.com',
            crypt('THEULTIMATEPASSX', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = admin_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (admin_uuid, 'Admin User', 'codenerds@protonmail.com', 'admin');
    END IF;

    -- Seed HOS User
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'hos@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            hos_uuid,
            'hos@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = hos_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (hos_uuid, 'HOS User', 'hos@example.com', 'hos');
    END IF;

    -- Seed Teacher User
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            teacher_uuid,
            'teacher@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = teacher_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (teacher_uuid, 'Teacher User', 'teacher@example.com', 'teacher', 'CS 3A');
    END IF;
    
    -- Seed Student User
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            student_uuid,
            'student@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = student_uuid) THEN
        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (student_uuid, 'Student User', 'student@example.com', 'student', 'CS 3A');
    END IF;

END $$;
