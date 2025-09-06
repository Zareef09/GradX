import { cn } from "@/lib/utils";

export const ScienceIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-flask-conical", className)}
  >
    <path d="M10.2 2.2c-.3-.2-.5-.5-.5-.8 0-.6.4-1 1-1h2.6c.6 0 1 .4 1 1 0 .3-.2.6-.5.8L12 4" />
    <path d="m10 4 1.8 15.6c.1.5.6.9 1.2.9h.1c.5 0 1-.3 1.1-.8L16 4" />
    <path d="M8.8 4h6.4" />
  </svg>
);
