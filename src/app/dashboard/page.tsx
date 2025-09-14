import { TimetableView } from "@/components/dashboard/timetable";
import { mockTimetable } from "@/lib/placeholder-data";
import { AIChat } from "@/components/dashboard/ai-chat";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 h-full">
        <TimetableView events={mockTimetable} />
      </div>
      <div className="lg:col-span-1 h-full">
        <AIChat />
      </div>
    </div>
  );
}
