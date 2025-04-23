import * as React from "react";

export interface StepIndicatorProps {
  number: number;
  title: string;
  description: string;
}

/**
 * StepIndicator component for displaying a numbered step with title and description
 * Used in "Getting Started" sections and tutorials
 */
export const StepIndicator = ({ number, title, description }: StepIndicatorProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-(--primary) flex items-center justify-center text-(--primary-foreground) font-bold">
        {number}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-(--foreground)">{title}</h3>
        <p className="text-(--muted-foreground)">{description}</p>
      </div>
    </div>
  );
};