import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export interface InfoCardProps {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * InfoCard component for displaying information with a title and description
 * Used in various sections throughout the application to present information in a consistent way
 */
export const InfoCard = ({ 
  title, 
  description, 
  className = "",
  children
}: InfoCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="text-base">
          {description}
        </CardDescription>
        {children}
      </CardContent>
    </Card>
  );
};