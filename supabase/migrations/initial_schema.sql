-- This script sets up the initial database schema for the application.

-- Profiles Table
-- Stores user profile information, including their role.
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL PRIMARY KEY,
    updated_at timestamp with time zone,
    name character varying,
    email character varying UNIQUE,
    role character varying,
    class character varying,
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Homework Table
-- Stores homework assignments created by teachers.
CREATE TABLE IF NOT EXISTS public.homework (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    title character varying NOT NULL,
    description text,
    "class" character varying,
    due_date date
);
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

-- Teacher Attendance Table
-- Stores teacher attendance records, specifically for marking leave.
CREATE TABLE IF NOT EXISTS public.teacher_attendance (
    id text NOT NULL PRIMARY KEY,
    date date NOT NULL,
    status text NOT NULL,
    name text,
    uid uuid
);
ALTER TABLE public.teacher_attendance ENABLE ROW LEVEL SECURITY;

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'role');
  return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS policies
-- You will need to define specific policies for each table based on your app's security requirements.
-- Example: allow authenticated users to read all profiles
-- create policy "Authenticated users can view profiles" on profiles for select using ( auth.role() = 'authenticated' );
