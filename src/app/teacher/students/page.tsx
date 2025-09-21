
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
}

export default function TeacherStudentsPage() {
  const supabase = createClient();
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, class')
        .eq('role', 'student');
      
      if (data) {
        setStudentList(data as Student[]);
      }
    };
    fetchStudents();
  }, [supabase]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName && studentEmail && studentClass) {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name: studentName, email: studentEmail, role: 'student', class: studentClass }])
        .select();

      if (data) {
        setStudentList([...studentList, ...data as Student[]]);
      }
      setStudentName("");
      setStudentEmail("");
      setStudentClass("");
    }
  };

  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Students</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStudent} className="grid gap-4 md:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="student-name">Name</Label>
                <Input
                  id="student-name"
                  placeholder="Alice Wonderland"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student-email">Email</Label>
                <Input
                  id="student-email"
                  type="email"
                  placeholder="student@example.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="student-class">Class</Label>
                <Input
                  id="student-class"
                  placeholder="CS 3A"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add Student</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>
              A list of all students in your classes.
            </CardDescription>
          </Header>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList.length > 0 ? (
                  studentList.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                       <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No students added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
