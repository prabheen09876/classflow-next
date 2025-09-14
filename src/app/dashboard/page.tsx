import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableView } from "@/components/dashboard/timetable";
import { mockTimetable } from "@/lib/placeholder-data";
import { CalendarPlus, ShieldAlert, Cpu } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Timetable Dashboard</h2>
          <p className="text-muted-foreground">
            Manage schedules, resolve conflicts, and view your classes.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><ShieldAlert className="mr-2 h-4 w-4" />Check Conflicts</Button>
          <Button><Cpu className="mr-2 h-4 w-4" />Generate with AI</Button>
        </div>
      </div>
      <Tabs defaultValue="full-timetable" className="space-y-4">
        <TabsList>
          <TabsTrigger value="full-timetable">Full Timetable</TabsTrigger>
          <TabsTrigger value="my-schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
        </TabsList>
        <TabsContent value="full-timetable" className="space-y-4">
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                An overview of all classes scheduled for the week.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <TimetableView events={mockTimetable} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-schedule" className="space-y-4">
           <Card>
            <CardHeader>
              <CardTitle>My Schedule</CardTitle>
              <CardDescription>
                Your personal schedule for the week.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <TimetableView events={mockTimetable.filter(e => e.faculty === "Dr. Smith")} />
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="adjustments" className="space-y-4">
           <Card>
            <CardHeader>
              <CardTitle>Dynamic Timetable Adjustment</CardTitle>
              <CardDescription>
                Make real-time adjustments to the schedule for unexpected events.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Select a class or faculty to make adjustments.</p>
                    <Button><CalendarPlus className="mr-2 h-4 w-4" />Suggest Reschedule</Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
