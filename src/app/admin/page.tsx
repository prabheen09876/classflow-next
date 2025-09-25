
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School, Book, Users, Building, UserCheck, UserCog } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Manage Users
              </CardTitle>
              <UserCog className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">All</div>
              <p className="text-xs text-muted-foreground">
                HOS, Teachers, Students
              </p>
            </CardContent>
            <CardContent>
                <Link href="/admin/users">
                    <p className="text-sm font-medium hover:underline">View Users</p>
                </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Manage Courses
              </CardTitle>
              <Book className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last semester
              </p>
            </CardContent>
            <CardContent>
                <Link href="/admin/courses">
                    <p className="text-sm font-medium hover:underline">View Courses</p>
                </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Manage Faculty
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-muted-foreground">
                +5 new hires
              </p>
            </CardContent>
            <CardContent>
                <Link href="/admin/faculty">
                    <p className="text-sm font-medium hover:underline">View Faculty</p>
                </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Manage Rooms</CardTitle>
              <Building className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">
                +3 new labs
              </p>
            </CardContent>
             <CardContent>
                <Link href="/admin/rooms">
                    <p className="text-sm font-medium hover:underline">View Rooms</p>
                </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
