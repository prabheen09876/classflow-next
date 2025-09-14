import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FacultyPage() {
  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Faculty</h1>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Faculty</Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty List</CardTitle>
            <CardDescription>
              A list of all faculty members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: Add faculty list table */}
            <p>Faculty management functionality coming soon.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
