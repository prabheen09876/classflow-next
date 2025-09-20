"use client"

import { TimetableView } from "@/components/dashboard/timetable";
import { AIChat } from "@/components/dashboard/ai-chat";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";


export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen={true} onOpenChange={() => {}}>
      <div className="flex">
         <SidebarInset>
            <div className="p-4">
                <TimetableView />
            </div>
        </SidebarInset>
        <Sidebar side="right" collapsible="offcanvas">
          <AIChat />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
