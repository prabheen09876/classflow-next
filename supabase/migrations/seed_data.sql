-- This script seeds the database with initial user data for different roles.
-- It's designed to be idempotent, meaning it can be run multiple times without causing errors.

DO $$
DECLARE
    admin_uuid uuid := '00000000-0000-0000-0000-000000000001';
    hos_uuid uuid := '00000000-0000-0000-0000-000000000002';
    teacher_uuid_1 uuid := '00000000-0000-0000-0000-000000000003';
    teacher_uuid_2 uuid := '00000000-0000-0000-0000-000000000004';
    student_uuid_1 uuid := '00000000-0000-0000-0000-000000000005';
    student_uuid_2 uuid := '00000000-0000-0000-0000-000000000006';
BEGIN
    -- Enable the pgcrypto extension if not already enabled
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    -- Seed Admin User
    -- We check if the user exists before inserting. If they don't, we insert into both auth.users and public.profiles.
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'codenerds@protonmail.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            admin_uuid,
            'codenerds@protonmail.com',
            crypt('THEULTIMATEPASSX', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public.profiles (id, name, email, role)
        VALUES (admin_uuid, 'Admin User', 'codenerds@protonmail.com', 'admin');
    END IF;

    -- Seed HOS User
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'hos@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            hos_uuid,
            'hos@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public.profiles (id, name, email, role)
        VALUES (hos_uuid, 'Head of School', 'hos@example.com', 'hos');
    END IF;

    -- Seed Teacher 1
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher1@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            teacher_uuid_1,
            'teacher1@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public.profiles (id, name, email, role)
        VALUES (teacher_uuid_1, 'Jane Smith', 'teacher1@example.com', 'teacher');
    END IF;
    
    -- Seed Teacher 2
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'teacher2@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            teacher_uuid_2,
            'teacher2@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public_profiles (id, name, email, role)
        VALUES (teacher_uuid_2, 'John Davis', 'teacher2@example.com', 'teacher');
    END IF;


    -- Seed Student 1
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student1@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            student_uuid_1,
            'student1@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (student_uuid_1, 'Alice Wonderland', 'student1@example.com', 'student', 'CS 3A');
    END IF;

    -- Seed Student 2
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'student2@example.com') THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud)
        VALUES (
            student_uuid_2,
            'student2@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated'
        );

        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (student_uuid_2, 'Bob Builder', 'student2@example.com', 'student', 'CS 1B');
    END IF;

END $$;
