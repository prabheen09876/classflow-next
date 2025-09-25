-- Create the profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  role VARCHAR(50) DEFAULT 'student',
  class VARCHAR(50)
);

-- Create the homework table
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description TEXT,
  class VARCHAR(50),
  "dueDate" DATE
);

-- Create the teacher attendance table
CREATE TABLE IF NOT EXISTS teacherAttendance (
    id VARCHAR(255) PRIMARY KEY,
    uid UUID,
    name VARCHAR(255),
    date DATE,
    status VARCHAR(50) -- e.g., 'present', 'absent'
);


-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table homework enable row level security;
alter table teacherAttendance enable row level security;

-- Policies will need to be created based on specific app requirements.
