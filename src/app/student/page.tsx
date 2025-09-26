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
      <div className="flex h-full">
        <SidebarInset className="flex-1">
          <div className="p-4 md:p-6 h-full">
            <TimetableView setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        </SidebarInset>
        <Sidebar side="right" collapsible="offcanvas" className="w-[400px]">
          <AIChat />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
