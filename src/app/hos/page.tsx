"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserCheck, BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HosPage() {
  const [teachers, setTeachers] = useState(0);
  const [teachersPresent, setTeachersPresent] = useState(0);
  const [students, setStudents] = useState(0);
  const [studentsPresent, setStudentsPresent] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const unsubTeachers = onSnapshot(collection(db, "teachers"), (snapshot) => {
      setTeachers(snapshot.size);
    });

    const unsubStudents = onSnapshot(collection(db, "students"), (snapshot) => {
      setStudents(snapshot.size);
    });

    const unsubTeacherAttendance = onSnapshot(collection(db, "teacherAttendance"), (snapshot) => {
      let presentCount = 0;
      snapshot.forEach(doc => {
        if (doc.data().date === today && doc.data().status === 'present') {
          presentCount++;
        }
      });
      setTeachersPresent(presentCount);
    });
    
    const unsubStudentAttendance = onSnapshot(collection(db, "studentAttendance"), (snapshot) => {
      let presentCount = 0;
      snapshot.forEach(doc => {
        if (doc.data().date === today && doc.data().status === 'present') {
          presentCount++;
        }
      });
      setStudentsPresent(presentCount);
    });

    return () => {
      unsubTeachers();
      unsubStudents();
      unsubTeacherAttendance();
      unsubStudentAttendance();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">HOS Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Teachers Present
              </CardTitle>
              <UserCheck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teachersPresent} / {teachers}</div>
              <p className="text-xs text-muted-foreground">
                {teachers > 0 ? ((teachersPresent/teachers) * 100).toFixed(0) : 0}% attendance today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Students Present
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentsPresent} / {students}</div>
              <p className="text-xs text-muted-foreground">
                 {students > 0 ? ((studentsPresent/students) * 100).toFixed(0) : 0}% attendance today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Report
              </CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <Link href="/hos/reports">
                    <p className="text-sm font-medium hover:underline">View Reports</p>
                </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div >
              <CardTitle>Manage Teachers</CardTitle>
              <CardDescription>
                Add, remove, or edit teacher profiles.
              </CardDescription>
            </div>
             <Button asChild>
                <Link href="/hos/teachers"><Plus className="mr-2 h-4 w-4" /> Go to Teachers</Link>
            </Button>
          </CardHeader>
          <CardContent>
             <p>Click the button above to manage teachers.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
