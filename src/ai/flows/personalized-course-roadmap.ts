'use server';

/**
 * @fileOverview Personalized course roadmap generation flow.
 *
 * - generateCourseRoadmap - A function that generates a personalized course roadmap.
 * - GenerateCourseRoadmapInput - The input type for the generateCourseRoadmap function.
 * - GenerateCourseRoadmapOutput - The return type for the generateCourseRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCourseRoadmapInputSchema = z.object({
  program: z.string().describe('The student`s declared program (e.g., Computer Science, Mathematics).'),
  graduationTimeline: z.string().describe('The desired graduation timeline (e.g., 4 years, 5 years).'),
  courseAvailability: z.string().describe('Information about course availability (e.g., Fall, Winter, Spring).'),
  transferCredits: z.string().optional().describe('Previously taken courses at other institutions, if any.'),
  additionalRequirements: z.string().optional().describe('Any additional requirements the student has'),
});
export type GenerateCourseRoadmapInput = z.infer<typeof GenerateCourseRoadmapInputSchema>;

const GenerateCourseRoadmapOutputSchema = z.object({
  courseRoadmap: z.string().describe('A personalized course roadmap based on the input parameters.'),
});
export type GenerateCourseRoadmapOutput = z.infer<typeof GenerateCourseRoadmapOutputSchema>;

export async function generateCourseRoadmap(input: GenerateCourseRoadmapInput): Promise<GenerateCourseRoadmapOutput> {
  return generateCourseRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCourseRoadmapPrompt',
  input: {schema: GenerateCourseRoadmapInputSchema},
  output: {schema: GenerateCourseRoadmapOutputSchema},
  prompt: `You are an academic advisor at the University of Waterloo. Generate a personalized course roadmap for a student based on the following information:

Program: {{{program}}}
Graduation Timeline: {{{graduationTimeline}}}
Course Availability: {{{courseAvailability}}}
Transfer Credits: {{{transferCredits}}}
Additional Requirements: {{{additionalRequirements}}}

Consider prerequisites, antirequisites, and degree requirements when generating the roadmap. The roadmap should provide a term by term listing of courses, taking into account course availability.

Output the course roadmap in a readable format. Make sure to take into account the student's transfer credits, if any, to avoid suggesting courses they have already taken.
`,
});

const generateCourseRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCourseRoadmapFlow',
    inputSchema: GenerateCourseRoadmapInputSchema,
    outputSchema: GenerateCourseRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
