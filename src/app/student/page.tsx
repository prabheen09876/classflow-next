"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { TimetableView } from "@/components/dashboard/timetable";
import { mockTimetable } from "@/lib/placeholder-data";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";

export default function StudentPage() {
  const [attendance, setAttendance] = useState<"present" | "absent" | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAttendance = async (status: "present" | "absent") => {
    if (user) {
      try {
        await setDoc(doc(db, "studentAttendance", user.uid), {
          status,
          date: new Date().toISOString().split('T')[0],
          name: user.displayName || user.email,
        });
        setAttendance(status);
        toast({
          title: "Attendance Marked",
          description: `You have been marked as ${status}.`,
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
          <h1 className="font-semibold text-lg">Student Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Mark Your Attendance</CardTitle>
            <CardDescription>
              Mark yourself present or absent for today's classes.
              {attendance && <p className="mt-2 font-semibold">Today you are marked as: <span className={attendance === 'present' ? 'text-green-500' : 'text-red-500'}>{attendance.toUpperCase()}</span></p>}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
             <Button className="w-full max-w-xs" variant="outline" onClick={() => handleAttendance("present")} disabled={attendance === "present"}><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Present</Button>
             <Button className="w-full max-w-xs" variant="outline" onClick={() => handleAttendance("absent")} disabled={attendance === "absent"}><XCircle className="mr-2 h-4 w-4 text-red-500" /> Absent</Button>
          </CardContent>
        </Card>
        <TimetableView events={mockTimetable} />
      </main>
    </div>
  );
}
