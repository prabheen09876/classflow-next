"use client";

import { useState, useEffect } from "react";
import { TimetableEntry, Day } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CalendarIcon, Plus, Video, CalendarPlus, BookOpen, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockTimetable } from "@/lib/placeholder-data";

const timeSlots = Array.from({ length: 15 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getRowSpan = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  return Math.ceil(durationMinutes / 30);
};

const getRowStart = (startTime: string) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const startHour = 8;
  return (hours - startHour) * 2 + (minutes / 30) + 2; 
};

interface TimetableViewProps {
  setIsSidebarOpen?: (isOpen: boolean) => void;
}

export function TimetableView({ setIsSidebarOpen }: TimetableViewProps) {
  const { toast } = useToast();
  const [events, setEvents] = useState<TimetableEntry[]>(mockTimetable);

  const handleAddToCalendar = (event: TimetableEntry) => {
    toast({
      title: "Added to Calendar",
      description: `${event.subject} has been added to your Google Calendar.`,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            <CardTitle className="font-headline text-2xl">Weekly Timetable</CardTitle>
        </div>
        <div className="flex items-center gap-2">
            <Button><Plus className="h-5 w-5 mr-2"/> Add new event</Button>
            {setIsSidebarOpen && (
              <Button variant="outline" onClick={() => setIsSidebarOpen(true)}>
                  <Bot className="h-5 w-5"/>
              </Button>
            )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-auto rounded-lg border">
          <div className="grid grid-cols-[auto_repeat(5,1fr)] min-w-[1200px]">
            {/* Time column header */}
            <div className="sticky left-0 z-10 p-2 text-xs font-medium text-muted-foreground bg-card border-r border-b"></div>

            {/* Day headers */}
            {days.map(day => (
              <div key={day} className="p-3 text-center text-md font-semibold border-b">
                {day}
              </div>
            ))}

            {/* Time slots */}
            <div className="col-start-1 col-end-2 row-start-2 row-end-[33] grid grid-rows-30 sticky left-0 z-10 bg-card border-r">
              {timeSlots.map(time => (
                <div key={time} className="row-span-2 border-t text-xs text-muted-foreground text-right pr-2 pt-1">
                  {time}
                </div>
              ))}
            </div>

            {/* Grid lines */}
            <div className="col-start-2 col-end-7 row-start-2 row-end-[33] grid grid-cols-5 grid-rows-30">
              {Array.from({ length: 150 }).map((_, i) => (
                <div key={i} className={cn("border-r border-t", (i + 1) % 5 === 0 && "border-r-0")}></div>
              ))}
            </div>
            
            {/* Events */}
            {events.map(event => {
              const colIndex = days.indexOf(event.dayOfWeek) + 2;
              const rowStart = getRowStart(event.startTime);
              const rowSpan = getRowSpan(event.startTime, event.endTime);
              
              if (colIndex < 2) return null;

              return (
                <div
                  key={event.id}
                  className="relative p-1 group"
                  style={{
                    gridColumnStart: colIndex,
                    gridRow: `${rowStart} / span ${rowSpan}`,
                  }}
                >
                  <div className={cn("h-full w-full p-3 rounded-lg border-l-4 text-xs flex flex-col justify-between", event.color)}>
                    <div>
                      <p className="font-bold text-sm">{event.subject}</p>
                      <p className="text-muted-foreground">{event.eventType === 'leave' ? event.faculty : `${event.startTime} - ${event.endTime}`}</p>
                      <p className="font-semibold mt-2">{event.eventType === 'online' ? 'Google Meet' : event.room}</p>
                      {event.eventType !== 'leave' && event.eventType !== 'task' && <p>{event.faculty}</p>}
                    </div>
                     <div className="flex items-center justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {event.eventType === 'online' && (
                           <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/50 rounded-full">
                                <Video className="h-4 w-4 text-blue-600" />
                           </Button>
                        )}
                        {event.eventType === 'task' && (
                           <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/50 rounded-full">
                                <BookOpen className="h-4 w-4 text-orange-600" />
                           </Button>
                        )}
                         <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/50 rounded-full" onClick={() => handleAddToCalendar(event)}>
                            <CalendarPlus className="h-4 w-4 text-green-600" />
                        </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
