"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { XCircle, BookOpen, Plus, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { cn } from "@/lib/utils";

export default function TeacherPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { user } = useAuth();

  const handleMarkLeave = async () => {
    if (user && date) {
      try {
        // Use a composite key for the document ID to allow multiple entries per user
        const docId = `${user.uid}_${format(date, "yyyy-MM-dd")}`;
        await setDoc(doc(db, "teacherAttendance", docId), {
          status: "absent",
          date: format(date, "yyyy-MM-dd"),
          name: user.displayName || user.email,
          uid: user.uid,
        });
        toast({
          title: "Leave Marked",
          description: `You have marked yourself on leave for ${format(date, "PPP")}.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to mark leave.",
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mark Your Leave</CardTitle>
              <CardDescription>
                Select a date to mark yourself on leave. The HOS will be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4 items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleMarkLeave} disabled={!date}>
                <XCircle className="mr-2 h-4 w-4" /> Mark as on Leave
              </Button>
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
