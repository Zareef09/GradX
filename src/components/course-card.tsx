import type { Course } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { CalculatorIcon } from "./icons/calculator-icon";
import { QuillIcon } from "./icons/quill-icon";
import { EngineeringIcon } from "./icons/engineering-icon";
import { ScienceIcon } from "./icons/science-icon";
import { ComputerIcon } from "lucide-react";

interface CourseCardProps {
  course: Course;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, courseId: string) => void;
}

const facultyIcons: { [key: string]: React.ReactNode } = {
  "Math": <CalculatorIcon className="w-5 h-5" />,
  "Arts": <QuillIcon className="w-5 h-5" />,
  "Engineering": <EngineeringIcon className="w-5 h-5" />,
  "Science": <ScienceIcon className="w-5 h-5" />,
  "Computer Science": <ComputerIcon className="w-5 h-5" />,
};

export function CourseCard({ course, isDraggable = false, onDragStart }: CourseCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart?.(e, course.id);
  };

  return (
    <Card 
      className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300" 
      draggable={isDraggable}
      onDragStart={handleDragStart}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg font-headline">{course.title}</CardTitle>
                <CardDescription>{course.code}</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground" title={course.faculty}>
                {facultyIcons[course.faculty]}
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex justify-between w-full">
            <div className="flex flex-wrap gap-2">
            {course.availability.map((term) => (
                <Badge key={term} variant="secondary">{term}</Badge>
            ))}
            </div>
             <Badge variant="outline">{course.credits} credits</Badge>
        </div>
        <Button variant="outline" size="sm" className="w-full">
            <CirclePlus className="mr-2 h-4 w-4" />
            Add to Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
