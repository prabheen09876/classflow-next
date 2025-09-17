export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type TimetableEntry = {
  id: string;
  classId: string;
  subject: string;
  faculty: string;
  room: string;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  dayOfWeek: Day;
  color: string;
  eventType?: 'online' | 'in-person' | 'leave' | 'task';
};
