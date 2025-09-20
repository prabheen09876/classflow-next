
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { format, parse, isSameDay } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { XCircle, Plus, BookOpen, UserMinus } from "lucide-react";

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'leave' | 'homework' | 'event';
  color: string;
}

export default function CalendarPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const unsubHomework = onSnapshot(collection(db, "homework"), (snapshot) => {
        const homeworkEvents: CalendarEvent[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            homeworkEvents.push({
                id: `hw-${doc.id}`,
                date: parse(data.dueDate, "yyyy-MM-dd", new Date()),
                title: `Due: ${data.title}`,
                type: 'homework',
                color: 'bg-orange-500'
            });
        });
        setEvents(currentEvents => [...currentEvents.filter(e => e.type !== 'homework'), ...homeworkEvents]);
    });

    const unsubLeave = onSnapshot(collection(db, "teacherAttendance"), (snapshot) => {
        const leaveEvents: CalendarEvent[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            leaveEvents.push({
                id: `leave-${doc.id}`,
                date: parse(data.date, "yyyy-MM-dd", new Date()),
                title: `${data.name || 'Teacher'} on Leave`,
                type: 'leave',
                color: 'bg-red-500'
            });
        });
       setEvents(currentEvents => [...currentEvents.filter(e => e.type !== 'leave'), ...leaveEvents]);
    });

    return () => {
        unsubHomework();
        unsubLeave();
    };
}, []);

  const handleMarkLeave = async () => {
    if (user && date) {
      try {
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
  
  const DayCell = ({ date, children }: { date: Date, children: React.ReactNode }) => {
    const dayEvents = events.filter(event => isSameDay(event.date, date));
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        {children}
        {dayEvents.length > 0 && (
          <div className="absolute bottom-1 flex space-x-1">
            {dayEvents.map(event => (
              <Badge key={event.id} variant="default" className={`${event.color} h-2 w-2 p-0`} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const selectedDayEvents = date ? events.filter(event => isSameDay(event.date, date)) : [];


  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Master Calendar</h1>
           <p className="text-sm text-muted-foreground">
            A unified view of all events, deadlines, and leaves.
          </p>
        </div>
         <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><XCircle className="h-5 w-5 mr-2"/> Mark Leave</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
              <div className="p-4 border-t">
                <Button onClick={handleMarkLeave} disabled={!date} className="w-full">
                  Confirm Leave
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button><Plus className="mr-2 h-4 w-4" /> Add Event</Button>
      </header>
       <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6">
        <div className="md:col-span-2">
            <Card>
                <CardContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0 w-full"
                     components={{
                        Day: ({ date }) => <DayCell date={date}>{format(date, "d")}</DayCell>,
                    }}
                    classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-4",
                        month: "space-y-4 w-full",
                        table: "w-full border-collapse",
                        head_row: "flex",
                        head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: "h-20 w-full text-center text-sm p-1 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-full w-full p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    }}
                />
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Events for {date ? format(date, "PPP") : "Today"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {selectedDayEvents.length > 0 ? (
                        selectedDayEvents.map(event => (
                            <div key={event.id} className="flex items-center gap-3">
                                <div className={`h-4 w-4 rounded-full ${event.color}`} />
                                <p className="font-medium">{event.title}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No events scheduled for this day.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
