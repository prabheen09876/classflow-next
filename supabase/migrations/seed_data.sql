-- This script seeds the database with initial user data for different roles.
-- It is designed to be idempotent, meaning it can be run multiple times without causing errors.

-- Enable pgcrypto extension for password encryption
create extension if not exists pgcrypto;

do $$
declare
    user_id uuid;
begin
    -------------------
    -- Seed Admin User
    -------------------
    -- Check if user exists and get their ID
    SELECT id INTO user_id FROM auth.users WHERE email = 'codenerds@protonmail.com';

    -- If user does not exist, create them and get their ID
    IF user_id IS NULL THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            '00000000-0000-0000-0000-000000000001',
            'codenerds@protonmail.com',
            crypt('THEULTIMATEPASSX', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        ) RETURNING id INTO user_id;
    END IF;

    -- Insert profile only if it doesn't exist, using the correct user_id
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (user_id, 'Admin User', 'codenerds@protonmail.com', 'admin');
    END IF;


    -------------------
    -- Seed HOS User
    -------------------
    SELECT id INTO user_id FROM auth.users WHERE email = 'hos@example.com';
    IF user_id IS NULL THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            '00000000-0000-0000-0000-000000000002',
            'hos@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        ) RETURNING id INTO user_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (user_id, 'Head of School', 'hos@example.com', 'hos');
    END IF;


    ----------------------
    -- Seed Teacher User
    ----------------------
    SELECT id INTO user_id FROM auth.users WHERE email = 'teacher@example.com';
    IF user_id IS NULL THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            '00000000-0000-0000-0000-000000000003',
            'teacher@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        ) RETURNING id INTO user_id;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        INSERT INTO public.profiles (id, name, email, role)
        VALUES (user_id, 'Jane Teacher', 'teacher@example.com', 'teacher');
    END IF;


    ----------------------
    -- Seed Student User
    ----------------------
    SELECT id INTO user_id FROM auth.users WHERE email = 'student@example.com';
    IF user_id IS NULL THEN
        INSERT INTO auth.users (id, email, encrypted_password, role, aud, instance_id)
        VALUES (
            '00000000-0000-0000-0000-000000000004',
            'student@example.com',
            crypt('password', gen_salt('bf')),
            'authenticated',
            'authenticated',
            '00000000-0000-0000-0000-000000000000'
        ) RETURNING id INTO user_id;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id) THEN
        INSERT INTO public.profiles (id, name, email, role, class)
        VALUES (user_id, 'John Student', 'student@example.com', 'student', 'CS 3A');
    END IF;

end $$;