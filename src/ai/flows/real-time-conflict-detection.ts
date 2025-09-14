'use server';

/**
 * @fileOverview This file defines a Genkit flow for real-time conflict detection in a timetable schedule.
 *
 * - detectTimetableConflicts - A function that takes timetable data as input and returns a list of detected conflicts with suggested alternatives.
 * - DetectTimetableConflictsInput - The input type for the detectTimetableConflicts function.
 * - DetectTimetableConflictsOutput - The return type for the detectTimetableConflicts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TimetableEntrySchema = z.object({
  classId: z.string().describe('Unique identifier for the class.'),
  subject: z.string().describe('Name of the subject.'),
  faculty: z.string().describe('Name of the faculty member.'),
  room: z.string().describe('Room number where the class is held.'),
  startTime: z.string().describe('Start time of the class (e.g., 09:00).'),
  endTime: z.string().describe('End time of the class (e.g., 10:00).'),
  dayOfWeek: z.string().describe('Day of the week the class is held (e.g., Monday).'),
});

const DetectTimetableConflictsInputSchema = z.object({
  timetable: z.array(TimetableEntrySchema).describe('Array of timetable entries to check for conflicts.'),
});
export type DetectTimetableConflictsInput = z.infer<typeof DetectTimetableConflictsInputSchema>;

const ConflictSchema = z.object({
  classId1: z.string().describe('ID of the first conflicting class.'),
  classId2: z.string().describe('ID of the second conflicting class.'),
  conflictType: z.string().describe('Type of conflict (e.g., faculty conflict, room conflict, time conflict).'),
  message: z.string().describe('Description of the conflict.'),
  suggestedAlternative1: z.string().optional().describe('Suggested alternative arrangement for the first class.'),
  suggestedAlternative2: z.string().optional().describe('Suggested alternative arrangement for the second class.'),
});

const DetectTimetableConflictsOutputSchema = z.object({
  conflicts: z.array(ConflictSchema).describe('Array of detected conflicts in the timetable.'),
});
export type DetectTimetableConflictsOutput = z.infer<typeof DetectTimetableConflictsOutputSchema>;

export async function detectTimetableConflicts(input: DetectTimetableConflictsInput): Promise<DetectTimetableConflictsOutput> {
  return detectTimetableConflictsFlow(input);
}

const detectTimetableConflictsPrompt = ai.definePrompt({
  name: 'detectTimetableConflictsPrompt',
  input: {schema: DetectTimetableConflictsInputSchema},
  output: {schema: DetectTimetableConflictsOutputSchema},
  prompt: `You are an AI assistant specialized in detecting conflicts within a timetable and suggesting resolutions.

  Analyze the provided timetable data and identify any conflicts, such as:
  - Faculty conflicts (same faculty member scheduled for two classes at the same time)
  - Room conflicts (same room scheduled for two classes at the same time)
  - Time conflicts (overlapping class schedules)

  For each detected conflict, provide a detailed message describing the conflict and suggest alternative arrangements.

  Timetable Data:
  {{#each timetable}}
  - Class ID: {{this.classId}}, Subject: {{this.subject}}, Faculty: {{this.faculty}}, Room: {{this.room}}, Time: {{this.dayOfWeek}} {{this.startTime}} - {{this.endTime}}
  {{/each}}

  Output the detected conflicts in the following JSON format:
  {
    "conflicts": [
      {
        "classId1": "ID of the first conflicting class",
        "classId2": "ID of the second conflicting class",
        "conflictType": "Type of conflict (e.g., faculty conflict, room conflict, time conflict)",
        "message": "Description of the conflict",
        "suggestedAlternative1": "Suggested alternative arrangement for the first class (optional)",
        "suggestedAlternative2": "Suggested alternative arrangement for the second class (optional)"
      }
    ]
  }
  `,
});

const detectTimetableConflictsFlow = ai.defineFlow(
  {
    name: 'detectTimetableConflictsFlow',
    inputSchema: DetectTimetableConflictsInputSchema,
    outputSchema: DetectTimetableConflictsOutputSchema,
  },
  async input => {
    const {output} = await detectTimetableConflictsPrompt(input);
    return output!;
  }
);
