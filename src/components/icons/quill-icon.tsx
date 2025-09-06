import { cn } from "@/lib/utils";

export const QuillIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-quill-pen", className)}
  >
    <path d="M12 22a2 2 0 0 0 2-2V8l-6-6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8z" />
    <path d="M18 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M14 8h6" />
  </svg>
);
