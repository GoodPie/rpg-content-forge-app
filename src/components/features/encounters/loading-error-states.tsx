import React from 'react';
import { Loader2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

interface LoadingStateProps {
  message?: string;
}

/**
 * Component for displaying a loading state
 */
export function LoadingState({ message = "Loading variable libraries..." }: LoadingStateProps) {
  return (
    <div className="text-center py-8" data-testid="loading-state">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
      <p>{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
}

/**
 * Component for displaying an error state
 */
export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="text-center py-8" data-testid="error-state">
      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
      <p className="text-destructive">{error}</p>
    </div>
  );
}

/**
 * Component for displaying when no libraries are found
 */
export function NoLibrariesState() {
  return (
    <div className="text-center py-4" data-testid="no-libraries-state">
      No variable libraries found. Create a variable library first.
    </div>
  );
}
