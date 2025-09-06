'use server';

/**
 * @fileOverview A flow for suggesting elective courses based on the student's program and interests.
 *
 * - suggestElectiveCourses - A function that suggests elective courses.
 * - SuggestElectiveCoursesInput - The input type for the suggestElectiveCourses function.
 * - SuggestElectiveCoursesOutput - The return type for the suggestElectiveCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestElectiveCoursesInputSchema = z.object({
  program: z
    .string()
    .describe('The student program (e.g., Computer Science, Engineering).'),
  interests: z
    .string()
    .describe('The student interests (e.g., AI, Web Development, Data Science).'),
  numSuggestions: z.number().default(3).describe('Number of elective courses to suggest'),
});
export type SuggestElectiveCoursesInput = z.infer<
  typeof SuggestElectiveCoursesInputSchema
>;

const SuggestElectiveCoursesOutputSchema = z.object({
  electiveCourses: z
    .array(z.string())
    .describe('A list of elective course suggestions.'),
});
export type SuggestElectiveCoursesOutput = z.infer<
  typeof SuggestElectiveCoursesOutputSchema
>;

export async function suggestElectiveCourses(
  input: SuggestElectiveCoursesInput
): Promise<SuggestElectiveCoursesOutput> {
  return suggestElectiveCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestElectiveCoursesPrompt',
  input: {schema: SuggestElectiveCoursesInputSchema},
  output: {schema: SuggestElectiveCoursesOutputSchema},
  prompt: `You are a university academic advisor. A student in the {{program}} program is interested in {{interests}}.  Suggest {{numSuggestions}} elective courses that would be a good fit for them, and briefly justify each suggestion.

Output the elective course suggestions as a JSON array of strings.`,
});

const suggestElectiveCoursesFlow = ai.defineFlow(
  {
    name: 'suggestElectiveCoursesFlow',
    inputSchema: SuggestElectiveCoursesInputSchema,
    outputSchema: SuggestElectiveCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
