import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface EmptyStateAction {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export interface EmptyStateProps {
  title?: string;
  message: string;
  submessage?: string;
  actions?: EmptyStateAction[];
  className?: string;
}

/**
 * EmptyState component for displaying a message when no data is available
 * Used in various sections throughout the application
 */
export const EmptyState = ({ 
  title, 
  message, 
  submessage, 
  actions = [],
  className = ""
}: EmptyStateProps) => {
  return (
    <div className={`text-(--muted-foreground) text-center py-8 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-(--foreground) mb-2">{title}</h3>
      )}
      <p>{message}</p>
      {submessage && <p className="mt-2">{submessage}</p>}
      {actions.length > 0 && (
        <div className="mt-4 flex justify-center space-x-4">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              asChild 
              variant={action.variant || "default"}
            >
              <Link href={action.href}>
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};