import { CourseList } from "@/components/course-list";
import { mockCourses } from "@/lib/data";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Course Explorer</h1>
        <p className="text-muted-foreground max-w-2xl">
          Search, filter, and discover courses to build your perfect degree plan. Use the filters to narrow down your options based on your needs.
        </p>
      </div>
      <CourseList courses={mockCourses} />
    </div>
  );
}
