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

export default function StudentPage() {
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
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
             <Button className="w-full max-w-xs" variant="outline"><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Present</Button>
             <Button className="w-full max-w-xs" variant="outline"><XCircle className="mr-2 h-4 w-4 text-red-500" /> Absent</Button>
          </CardContent>
        </Card>
        <TimetableView events={mockTimetable} />
      </main>
    </div>
  );
}
