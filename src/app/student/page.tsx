"use client";

import { useState } from "react";
import { TimetableView } from "@/components/dashboard/timetable";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@/components/auth-provider";

export default function StudentPage() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Student Dashboard</h1>
          </div>
        </header>
        <main className="flex flex-1 h-[calc(100vh-60px)]">
          <SidebarInset className="flex-1">
            <div className="p-4 md:p-6">
              <TimetableView setIsSidebarOpen={setIsSidebarOpen} />
            </div>
          </SidebarInset>
          <Sidebar side="right" collapsible="offcanvas">
            <AIChat />
          </Sidebar>
        </main>
      </div>
    </SidebarProvider>
  );
}
