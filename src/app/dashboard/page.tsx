
"use client"

import { useState } from "react";
import { TimetableView } from "@/components/dashboard/timetable";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";


export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="flex">
         <SidebarInset>
            <div className="p-4">
                <TimetableView setIsSidebarOpen={setIsSidebarOpen}/>
            </div>
        </SidebarInset>
        <Sidebar side="right" collapsible="offcanvas">
          <AIChat />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
