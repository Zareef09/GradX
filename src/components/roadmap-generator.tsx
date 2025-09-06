"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { generateCourseRoadmap } from "@/ai/flows/personalized-course-roadmap";
import { suggestElectiveCourses } from "@/ai/flows/elective-course-suggestions";
import { Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  program: z.string().min(2, { message: "Program must be at least 2 characters." }),
  graduationTimeline: z.string().min(1, { message: "Please specify a timeline." }),
  interests: z.string().min(2, { message: "Please list some interests." }),
  transferCredits: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RoadmapGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [electives, setElectives] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      graduationTimeline: "4 years",
      interests: "",
      transferCredits: "",
      additionalRequirements: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRoadmap(null);
    setElectives(null);
    setError(null);

    try {
      const roadmapPromise = generateCourseRoadmap({
        ...data,
        courseAvailability: "Fall, Winter, Spring",
      });
      const electivesPromise = suggestElectiveCourses({
        program: data.program,
        interests: data.interests,
        numSuggestions: 3,
      });

      const [roadmapResult, electivesResult] = await Promise.all([roadmapPromise, electivesPromise]);

      setRoadmap(roadmapResult.courseRoadmap);
      setElectives(electivesResult.electiveCourses);
    } catch (e) {
      setError("An error occurred while generating your roadmap. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Academic Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Graduation Timeline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 4 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AI, Web Development, Data Science" {...field} />
                    </FormControl>
                    <FormDescription>
                      List some topics you're interested in for elective suggestions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transferCredits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Credits (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List any transfer credits, e.g., MATH 101, PHYS 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Co-op requirements, minors, specializations" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate Roadmap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-4 text-muted-foreground">Generating your personalized plan...</p>
        </div>
      )}

      {error && <p className="text-destructive">{error}</p>}
      
      {roadmap && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Personalized Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans text-sm bg-secondary p-4 rounded-md">{roadmap}</pre>
          </CardContent>
        </Card>
      )}

      {electives && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Elective Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {electives.map((elective, index) => (
                <li key={index} className="text-sm">{elective}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
