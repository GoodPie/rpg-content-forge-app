import * as React from "react";

export interface SectionTitleProps {
  title: string;
  className?: string;
}

/**
 * SectionTitle component for displaying a consistent section title
 * Used throughout the application to provide visual hierarchy
 */
export const SectionTitle = ({ title, className = "" }: SectionTitleProps) => {
  return (
    <h2 className={`text-xl font-semibold text-(--foreground) mb-4 ${className}`}>
      {title}
    </h2>
  );
};