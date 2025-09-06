import { DegreeMapClient } from "@/components/degree-map-client";
import { mockCourses } from "@/lib/data";

export default function DegreeMapPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline sm:text-4xl">Interactive Degree Map</h1>
          <p className="text-muted-foreground max-w-2xl">
            Drag and drop courses from the sidebar into your term schedule. Get real-time feedback and track your progress towards graduation.
          </p>
        </div>
      </div>
      <DegreeMapClient initialCourses={mockCourses} />
    </div>
  );
}
