"use client";

import { TimetableView } from "@/components/dashboard/timetable";

export default function TeacherPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Teacher Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <TimetableView />
      </main>
    </div>
  );
}
