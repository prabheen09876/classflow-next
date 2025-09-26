
"use client"

import { useState } from "react";
import { TimetableView } from "@/components/dashboard/timetable";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";


export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex h-[calc(100vh-80px)]">
        <SidebarInset className="flex-1">
          <div className="h-full">
            <TimetableView setIsSidebarOpen={setIsSidebarOpen}/>
          </div>
        </SidebarInset>
        <Sidebar side="right" collapsible="offcanvas" className="w-[400px]">
          <AIChat />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
//page.stx