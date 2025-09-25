
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Teacher {
  id: string;
  name: string;
  email: string;
}

export function TeacherManager() {
  const supabase = createClient();
  const [teacherList, setTeacherList] = useState<Teacher[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  useEffect(() => {
     const fetchTeachers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email')
        .eq('role', 'teacher');
      
      if (data) {
        setTeacherList(data);
      }
    };
    fetchTeachers();
  }, [supabase]);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherName && teacherEmail) {
       const { data, error } = await supabase
        .from('profiles')
        .insert([{ name: teacherName, email: teacherEmail, role: 'teacher' }])
        .select();
      
      if (data) {
         setTeacherList([...teacherList, ...data as Teacher[]]);
      }
      setTeacherName("");
      setTeacherEmail("");
    }
  };

  return (
    <div className="space-y-8">
       <div>
         <form onSubmit={handleAddTeacher} className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="teacher-name">Name</Label>
              <Input
                id="teacher-name"
                placeholder="Jane Smith"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="teacher-email">Email</Label>
              <Input
                id="teacher-email"
                type="email"
                placeholder="teacher@example.com"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add Teacher</Button>
            </div>
          </form>
       </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherList.length > 0 ? (
            teacherList.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No teachers added yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
