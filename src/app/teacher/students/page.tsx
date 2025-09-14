import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TeacherStudentsPage() {
  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Students</h1>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Student</Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>
              A list of all students in your classes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add student list table */}
            <p>Student management functionality coming soon.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
