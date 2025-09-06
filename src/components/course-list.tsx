"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourseCard } from "@/components/course-card";
import type { Course, Faculty } from "@/lib/types";

interface CourseListProps {
  courses: Course[];
}

const faculties: Faculty[] = ["Math", "Computer Science", "Engineering", "Arts", "Science"];
const levels = [100, 200, 300, 400, 500, 600];
const availabilities = ["Fall", "Winter", "Spring"];

export function CourseList({ courses }: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchMatch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());
      const facultyMatch =
        selectedFaculty === "all" || course.faculty === selectedFaculty;
      const levelMatch =
        selectedLevel === "all" || course.level === parseInt(selectedLevel);
      const availabilityMatch =
        selectedAvailability === "all" ||
        course.availability.includes(selectedAvailability as "Fall" | "Winter" | "Spring");

      return searchMatch && facultyMatch && levelMatch && availabilityMatch;
    });
  }, [searchTerm, selectedFaculty, selectedLevel, selectedAvailability, courses]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Faculty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Faculties</SelectItem>
            {faculties.map((faculty) => (
              <SelectItem key={faculty} value={faculty}>
                {faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {levels.map((level) => (
              <SelectItem key={level} value={String(level)}>
                {level}-level
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">No courses match your criteria. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
