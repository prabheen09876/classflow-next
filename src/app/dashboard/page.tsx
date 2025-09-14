"use client"

import { TimetableView } from "@/components/dashboard/timetable";
import { mockTimetable } from "@/lib/placeholder-data";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

function DashboardContent() {
  const { open, toggleSidebar } = useSidebar();
  
  return (
    <SidebarInset>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Timetable</h1>
        </div>
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {open ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
          <span className="sr-only">Toggle AI Chat</span>
        </Button>
      </header>
      <div className="p-4">
        <TimetableView events={mockTimetable} />
      </div>
    </SidebarInset>
  );
}


export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen={true} onOpenChange={() => {}}>
      <div className="flex">
        <DashboardContent />
        <Sidebar side="right" collapsible="offcanvas">
          <AIChat />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}