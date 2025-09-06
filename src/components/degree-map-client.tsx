"use client";

import { useState, useEffect } from "react";
import type { Course, Term } from "@/lib/types";
import { CourseCard } from "./course-card";
import { ProgressTracker } from "./progress-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";

interface DegreeMapClientProps {
  initialCourses: Course[];
}

const initialTerms: Term[] = Array.from({ length: 8 }, (_, i) => ({
  id: `term-${i + 1}`,
  name: `Year ${Math.floor(i / 2) + 1} - Term ${i % 2 === 0 ? "A" : "B"}`,
  courses: [],
}));

const TOTAL_CREDITS_REQUIRED = 20.0;

export function DegreeMapClient({ initialCourses }: DegreeMapClientProps) {
  const [availableCourses, setAvailableCourses] = useState<Course[]>(initialCourses);
  const [terms, setTerms] = useState<Term[]>(initialTerms);
  const [totalCredits, setTotalCredits] = useState(0);

  useEffect(() => {
    const newTotalCredits = terms.reduce((acc, term) => acc + term.courses.reduce((termAcc, course) => termAcc + course.credits, 0), 0);
    setTotalCredits(newTotalCredits);

    if (newTotalCredits >= TOTAL_CREDITS_REQUIRED) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

  }, [terms]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, courseId: string) => {
    e.dataTransfer.setData("courseId", courseId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, termId: string) => {
    e.preventDefault();
    const courseId = e.dataTransfer.getData("courseId");
    const courseToAdd = availableCourses.find((c) => c.id === courseId);

    if (courseToAdd && !terms.some(term => term.courses.some(c => c.id === courseId))) {
      setTerms(prevTerms =>
        prevTerms.map(term =>
          term.id === termId
            ? { ...term, courses: [...term.courses, courseToAdd] }
            : term
        )
      );
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemoveCourse = (courseId: string, termId: string) => {
    setTerms(prevTerms =>
      prevTerms.map(term =>
        term.id === termId
          ? { ...term, courses: term.courses.filter(c => c.id !== courseId) }
          : term
      )
    );
  }

  const isCoursePlaced = (courseId: string) => {
    return terms.some(term => term.courses.some(c => c.id === courseId));
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 container mx-auto px-4 md:px-6 pb-8">
      {/* Course Sidebar */}
      <aside className="w-full md:w-1/3 lg:w-1/4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Available Courses</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[70vh]">
                    <div className="space-y-4 pr-4">
                        {availableCourses.map((course) => (
                           <div key={course.id} className={isCoursePlaced(course.id) ? 'opacity-50' : ''}>
                             <CourseCard
                                course={course}
                                isDraggable={!isCoursePlaced(course.id)}
                                onDragStart={handleDragStart}
                             />
                           </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
      </aside>

      {/* Degree Map */}
      <main className="w-full md:w-2/3 lg:w-3/4">
        <div className="sticky top-14 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 mb-4">
          <ProgressTracker currentCredits={totalCredits} totalCredits={TOTAL_CREDITS_REQUIRED} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {terms.map((term) => (
            <Card
              key={term.id}
              className="min-h-[200px] border-dashed border-2 hover:border-primary transition-colors"
              onDrop={(e) => handleDrop(e, term.id)}
              onDragOver={handleDragOver}
            >
              <CardHeader>
                <CardTitle className="text-base">{term.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {term.courses.length > 0 ? term.courses.map((course) => (
                  <div key={course.id} className="bg-secondary p-2 rounded-md flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold">{course.code}</p>
                      <p className="text-muted-foreground">{course.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {course.prerequisites.length > 0 && !course.prerequisites.every(prereq => 
                            terms.slice(0, terms.findIndex(t => t.id === term.id))
                                 .some(prevTerm => prevTerm.courses.some(c => c.id === prereq.toLowerCase().replace(/\s/g, '')))
                        ) && (
                            <AlertCircle className="w-5 h-5 text-destructive" title={`Missing prerequisite: ${course.prerequisites.join(', ')}`} />
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleRemoveCourse(course.id, term.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                  </div>
                )) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>Drop courses here</p>
                    </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
