'use server';

/**
 * @fileOverview Smart Timetable Generation AI agent.
 *
 * - smartTimetableGeneration - A function that handles the timetable generation process.
 * - SmartTimetableGenerationInput - The input type for the smartTimetableGeneration function.
 * - SmartTimetableGenerationOutput - The return type for the smartTimetableGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartTimetableGenerationInputSchema = z.object({
  courseList: z.string().describe('List of courses for the semester.'),
  facultyAvailability: z.string().describe('Faculty availability schedules.'),
  roomCapacities: z.string().describe('Room and lab capacities.'),
  weeklyExtracurricularSlots: z.string().describe('Weekly extracurricular and club activity slots.'),
  guestLectureTimings: z.string().describe('Guest lecture and workshop timings.'),
  holidayCalendar: z.string().describe('Holiday/festival calendar.'),
  constraints: z.string().describe('Constraints such as max classes per day and room availability.'),
  studentPreferences: z.string().describe('Student preferences for electives.'),
});
export type SmartTimetableGenerationInput = z.infer<typeof SmartTimetableGenerationInputSchema>;

const SmartTimetableGenerationOutputSchema = z.object({
  timetable: z.string().describe('The generated timetable.'),
});
export type SmartTimetableGenerationOutput = z.infer<typeof SmartTimetableGenerationOutputSchema>;

export async function smartTimetableGeneration(input: SmartTimetableGenerationInput): Promise<SmartTimetableGenerationOutput> {
  return smartTimetableGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTimetableGenerationPrompt',
  input: {schema: SmartTimetableGenerationInputSchema},
  output: {schema: SmartTimetableGenerationOutputSchema},
  prompt: `You are an AI timetable generator. You will receive data about courses, faculty availability, room capacities, extracurricular activities, guest lectures, holidays, constraints, and student preferences.

Generate an optimized timetable that minimizes conflicts and maximizes resource utilization, while respecting all constraints and preferences.

Consider the following information:

Course List: {{{courseList}}}
Faculty Availability: {{{facultyAvailability}}}
Room Capacities: {{{roomCapacities}}}
Weekly Extracurricular Slots: {{{weeklyExtracurricularSlots}}}
Guest Lecture Timings: {{{guestLectureTimings}}}
Holiday Calendar: {{{holidayCalendar}}}
Constraints: {{{constraints}}}
Student Preferences: {{{studentPreferences}}}

Output the timetable in a clear, readable format.
`,
});

const smartTimetableGenerationFlow = ai.defineFlow(
  {
    name: 'smartTimetableGenerationFlow',
    inputSchema: SmartTimetableGenerationInputSchema,
    outputSchema: SmartTimetableGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
