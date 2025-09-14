import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Courses</h1>
        </div>
         <Button><Plus className="mr-2 h-4 w-4" /> Add Course</Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>
              A list of all courses offered.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add course list table */}
            <p>Course management functionality coming soon.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
