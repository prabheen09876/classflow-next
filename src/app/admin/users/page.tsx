
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HosManager } from "@/components/admin/hos-manager";
import { TeacherManager } from "@/components/admin/teacher-manager";
import { StudentManager } from "@/components/admin/student-manager";

export default function UsersPage() {
  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Users</h1>
          <p className="text-sm text-muted-foreground">A centralized place to manage all users in the system.</p>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Tabs defaultValue="hos">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hos">Heads of School (HOS)</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          <TabsContent value="hos">
            <Card>
              <CardHeader>
                <CardTitle>Manage HOS</CardTitle>
                <CardDescription>Add, view, and manage Heads of School.</CardDescription>
              </CardHeader>
              <CardContent>
                <HosManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Manage Teachers</CardTitle>
                <CardDescription>Add, view, and manage Teachers.</CardDescription>
              </CardHeader>
              <CardContent>
                <TeacherManager />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Manage Students</CardTitle>
                <CardDescription>Add, view, and manage Students.</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
