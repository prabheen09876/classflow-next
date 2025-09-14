'use server';

/**
 * @fileOverview Automatically adjusts the timetable for faculty absences and room unavailability.
 *
 * - adjustTimetable - A function that handles the dynamic timetable adjustment process.
 * - AdjustTimetableInput - The input type for the adjustTimetable function.
 * - AdjustTimetableOutput - The return type for the adjustTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustTimetableInputSchema = z.object({
  reason: z
    .string()
    .describe(
      'The reason for the timetable adjustment (e.g., faculty absence, room unavailability).' 
    ),
  affectedClasses: z.array(z.string()).describe('List of affected classes.'),
  currentTimetable: z.string().describe('The current timetable data.'),
  constraints: z.string().describe('The constraints for timetable generation.'),
});
export type AdjustTimetableInput = z.infer<typeof AdjustTimetableInputSchema>;

const AdjustTimetableOutputSchema = z.object({
  newTimetable: z.string().describe('The adjusted timetable data.'),
  summary: z.string().describe('A summary of the changes made.'),
});
export type AdjustTimetableOutput = z.infer<typeof AdjustTimetableOutputSchema>;

export async function adjustTimetable(
  input: AdjustTimetableInput
): Promise<AdjustTimetableOutput> {
  return adjustTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustTimetablePrompt',
  input: {schema: AdjustTimetableInputSchema},
  output: {schema: AdjustTimetableOutputSchema},
  prompt: `You are an AI assistant specialized in dynamically adjusting timetables for educational institutions.

  Given the following reason for adjustment, affected classes, current timetable, and constraints, generate a new timetable that minimizes disruption.

  Reason: {{{reason}}}
  Affected Classes: {{#each affectedClasses}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Current Timetable: {{{currentTimetable}}}
  Constraints: {{{constraints}}}

  Provide the new timetable in a structured format and a summary of the changes made.
  Ensure that the generated timetable adheres to all constraints.
  If a faculty is absent try to reassign the class to another faculty if it is possible, and if a room is not avaiable try to reassign the class to another room if it is possible.
  Consider reassigning online Google Meet session as an alternative to the reassignment of the faculties or classrooms.
  Output the new timetable and a summary of the changes.
  `,
});

const adjustTimetableFlow = ai.defineFlow(
  {
    name: 'adjustTimetableFlow',
    inputSchema: AdjustTimetableInputSchema,
    outputSchema: AdjustTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
