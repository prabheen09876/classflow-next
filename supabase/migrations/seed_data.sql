-- This script seeds the database with initial user data for different roles.

-- Enable pgcrypto extension for password encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
    admin_uuid uuid := '00000000-0000-0000-0000-000000000001';
    hos_uuid uuid := '00000000-0000-0000-0000-000000000002';
    teacher_uuid uuid := '00000000-0000-0000-0000-000000000003';
    student_uuid uuid := '00000000-0000-0000-0000-000000000004';
BEGIN

    -- Create Admin User in auth.users
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        admin_uuid,
        'codenerds@protonmail.com',
        crypt('THEULTIMATEPASSX', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;
    
    -- Create HOS User in auth.users
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        hos_uuid,
        'hos@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    -- Create Teacher User in auth.users
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        teacher_uuid,
        'teacher@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    -- Create Student User in auth.users
    INSERT INTO auth.users (id, email, encrypted_password, role, aud)
    VALUES (
        student_uuid,
        'student@example.com',
        crypt('password', gen_salt('bf')),
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;

    -- Create corresponding profiles in public.profiles
    INSERT INTO public.profiles (id, name, email, role)
    VALUES (
        admin_uuid,
        'Admin User',
        'codenerds@protonmail.com',
        'admin'
    ) ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.profiles (id, name, email, role)
    VALUES (
        hos_uuid,
        'Dr. Head of School',
        'hos@example.com',
        'hos'
    ) ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.profiles (id, name, email, role)
    VALUES (
        teacher_uuid,
        'Prof. Teacher',
        'teacher@example.com',
        'teacher'
    ) ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.profiles (id, name, email, role, class)
    VALUES (
        student_uuid,
        'Student User',
        'student@example.com',
        'student',
        'CS 101'
    ) ON CONFLICT (id) DO NOTHING;

END $$;
