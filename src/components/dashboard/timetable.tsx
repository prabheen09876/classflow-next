"use client";

import { TimetableEntry, Day } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

const timeSlots = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getRowSpan = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  return Math.ceil(durationMinutes / 30);
};

const getRowStart = (startTime: string) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  // Grid starts at 8:00 AM, each hour has 2 rows (for 30-min slots)
  const startHour = 8;
  return (hours - startHour) * 2 + (minutes / 30) + 2; // +2 for header row and 1-based index
};

interface TimetableViewProps {
  events: TimetableEntry[];
}

export function TimetableView({ events }: TimetableViewProps) {
  return (
    <div className="relative overflow-auto rounded-lg border">
      <div className="grid grid-cols-[auto_repeat(5,1fr)] min-w-[800px]">
        {/* Time column header */}
        <div className="sticky left-0 z-10 p-2 text-xs font-medium text-muted-foreground bg-muted/50 border-r border-b">Time</div>
        
        {/* Day headers */}
        {days.map(day => (
          <div key={day} className="p-2 text-center text-sm font-semibold border-b">
            {day}
          </div>
        ))}

        {/* Time slots */}
        <div className="col-start-1 col-end-2 row-start-2 row-end-[23] grid grid-rows-20 sticky left-0 z-10 bg-muted/50 border-r">
          {timeSlots.map(time => (
            <div key={time} className="row-span-2 border-t text-xs text-muted-foreground text-center pt-1">
              {time}
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="col-start-2 col-end-7 row-start-2 row-end-[23] grid grid-cols-5 grid-rows-20">
          {Array.from({ length: 100 }).map((_, i) => (
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
              className="relative p-2 rounded-lg m-px transition-all hover:z-20 hover:scale-[1.02] hover:shadow-lg"
              style={{
                gridColumnStart: colIndex,
                gridRow: `${rowStart} / span ${rowSpan}`,
              }}
            >
              <div className={cn("h-full w-full p-2 rounded-md border text-xs", event.color)}>
                  <p className="font-bold">{event.subject}</p>
                  <p>{event.faculty}</p>
                  <p className="font-semibold">{event.room}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
