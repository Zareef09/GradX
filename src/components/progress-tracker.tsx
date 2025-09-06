"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface ProgressTrackerProps {
  currentCredits: number;
  totalCredits: number;
}

export function ProgressTracker({ currentCredits, totalCredits }: ProgressTrackerProps) {
  const percentage = Math.min((currentCredits / totalCredits) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex justify-between items-center">
          <span>Degree Progress</span>
          <span className="text-lg font-medium text-muted-foreground">
            <span className="text-foreground font-bold">{currentCredits.toFixed(1)}</span> / {totalCredits.toFixed(1)} credits
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="h-4" />
        <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-muted-foreground">{percentage.toFixed(0)}% complete</p>
            {percentage >= 100 && <p className="text-sm font-bold text-primary">Congratulations! Requirements met!</p>}
        </div>
      </CardContent>
    </Card>
  );
}
