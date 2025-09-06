export type Faculty = "Math" | "Computer Science" | "Engineering" | "Arts" | "Science";

export type Course = {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  prerequisites: string[];
  faculty: Faculty;
  level: 100 | 200 | 300 | 400 | 500 | 600;
  availability: ("Fall" | "Winter" | "Spring")[];
};

export type Term = {
  id: string;
  name: string;
  courses: Course[];
};
