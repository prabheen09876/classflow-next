"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, BookOpen, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";


export default function TeacherPage() {
  const [attendance, setAttendance] = useState<"present" | "absent" | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAttendance = async (status: "present" | "absent") => {
    if (user) {
      try {
        await setDoc(doc(db, "teacherAttendance", user.uid), {
          status,
          date: new Date().toISOString().split('T')[0],
          name: user.displayName || user.email,
        });
        setAttendance(status);
        toast({
          title: "Attendance Marked",
          description: `You have marked yourself as ${status} for today.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to mark attendance.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Teacher Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Mark Your Attendance</CardTitle>
              <CardDescription>
                Mark yourself present or absent for today.
                 {attendance && <p className="mt-2 font-semibold">You are marked as: <span className={attendance === 'present' ? 'text-green-500' : 'text-red-500'}>{attendance.toUpperCase()}</span></p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button className="w-full" variant="outline" onClick={() => handleAttendance('present')} disabled={attendance === 'present'}><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Present</Button>
              <Button className="w-full" variant="outline" onClick={() => handleAttendance('absent')} disabled={attendance === 'absent'}><XCircle className="mr-2 h-4 w-4 text-red-500" /> Absent</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>
                View attendance for your classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/teacher/attendance">
                    <p className="text-sm font-medium hover:underline">View Student Attendance</p>
                </Link>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Assign Homework</CardTitle>
              <CardDescription>
                Assign and track homework for your students.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/teacher/homework">
                    <p className="text-sm font-medium hover:underline flex items-center"><BookOpen className="mr-2 h-4 w-4" /> View Assignments</p>
                </Link>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Students</CardTitle>
              <CardDescription>
                Add or remove students from your classes.
              </CardDescription>
            </div>
            <Button asChild>
                <Link href="/teacher/students"><Plus className="mr-2 h-4 w-4" /> Manage Students</Link>
            </Button>
          </CardHeader>
          <CardContent>
             <p>Click the button above to manage students in your classes.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
