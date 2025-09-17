"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimetableView } from "@/components/dashboard/timetable";
import { mockTimetable } from "@/lib/placeholder-data";
import { useAuth } from "@/components/auth-provider";

export default function StudentPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Student Dashboard</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.displayName || user?.email || "Student"}</CardTitle>
            <CardDescription>
              Here is your timetable for the week.
            </CardDescription>
          </CardHeader>
        </Card>
        <TimetableView events={mockTimetable} />
      </main>
    </div>
  );
}
