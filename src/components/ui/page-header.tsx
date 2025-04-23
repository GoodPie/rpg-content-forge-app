import * as React from "react";

export interface PageHeaderProps {
  title: string;
  description: string;
}

/**
 * PageHeader component for displaying a consistent page title and description
 * Used at the top of each page in the application
 */
export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-(--foreground) mb-2">{title}</h1>
      <p className="text-lg text-(--muted-foreground)">{description}</p>
    </div>
  );
};