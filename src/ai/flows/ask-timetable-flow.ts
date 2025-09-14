'use server';

/**
 * @fileOverview An AI agent that answers questions about a timetable.
 *
 * - askTimetable - A function that handles questions about the timetable.
 * - AskTimetableInput - The input type for the askTimetable function.
 * - AskTimetableOutput - The return type for the askTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskTimetableInputSchema = z.object({
  question: z.string().describe('The user\'s question about the timetable.'),
  timetable: z.string().describe('The timetable data in JSON format.'),
});
export type AskTimetableInput = z.infer<typeof AskTimetableInputSchema>;

const AskTimetableOutputSchema = z.object({
  answer: z.string().describe('The AI\'s answer to the question.'),
});
export type AskTimetableOutput = z.infer<typeof AskTimetableOutputSchema>;

export async function askTimetable(
  input: AskTimetableInput
): Promise<AskTimetableOutput> {
  return askTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askTimetablePrompt',
  input: {schema: AskTimetableInputSchema},
  output: {schema: AskTimetableOutputSchema},
  prompt: `You are an AI assistant for a university timetable. Your role is to answer questions based on the provided timetable data. Be concise and helpful.

  Timetable Data (JSON):
  {{{timetable}}}

  User's Question:
  {{{question}}}

  Based on the data, provide a clear and accurate answer to the user's question.
  If the information is not in the timetable, say so.
  `,
});

const askTimetableFlow = ai.defineFlow(
  {
    name: 'askTimetableFlow',
    inputSchema: AskTimetableInputSchema,
    outputSchema: AskTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
