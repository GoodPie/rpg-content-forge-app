import * as React from "react";
import { StepIndicator, StepIndicatorProps } from "@/components/ui/step-indicator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface StepListProps {
  title: string;
  steps: Omit<StepIndicatorProps, 'number'>[];
  className?: string;
}

/**
 * StepList component for displaying a list of numbered steps
 * Used in "Getting Started" sections and tutorials
 */
export const StepList = ({ title, steps, className = "" }: StepListProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <StepIndicator
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
          />
        ))}
      </CardContent>
    </Card>
  );
};