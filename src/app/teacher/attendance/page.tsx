
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StudentAttendance {
  id: string;
  name: string;
  date: string;
  status: "present" | "absent";
}

export default function TeacherAttendancePage() {
  const [attendanceList, setAttendanceList] = useState<StudentAttendance[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "studentAttendance"), (snapshot) => {
      const newAttendanceList: StudentAttendance[] = [];
      snapshot.forEach((doc) => {
        newAttendanceList.push({ id: doc.id, ...doc.data() } as StudentAttendance);
      });
      setAttendanceList(newAttendanceList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Student Attendance</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
              A list of student attendance for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceList.filter(att => att.date === new Date().toISOString().split('T')[0]).length > 0 ? (
                  attendanceList.filter(att => att.date === new Date().toISOString().split('T')[0]).map((attendance) => (
                    <TableRow key={attendance.id}>
                      <TableCell>{attendance.name}</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>
                        <span className={attendance.status === 'present' ? 'text-green-500' : 'text-red-500'}>
                          {attendance.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No attendance marked for today yet.
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
