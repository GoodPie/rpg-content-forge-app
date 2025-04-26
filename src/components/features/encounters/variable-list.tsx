import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/ui/empty-state";
import { VariableCard } from './variable-card';
import { Variable } from '@/types/variables';

interface VariableListProps {
  variables: Variable[];
  filteredVariables: Variable[];
  onSelectVariable: (variableName: string) => void;
  searchTerm: string;
}

/**
 * Component for displaying a list of variables with scrolling and empty states
 */
export function VariableList({ 
  variables, 
  filteredVariables, 
  onSelectVariable,
  searchTerm
}: VariableListProps) {
  return (
    <ScrollArea className="h-[300px] pr-4" data-testid="variable-list">
      {variables.length === 0 ? (
        <EmptyState
          message="No variables in this library."
          submessage="Add variables to use them."
          data-testid="empty-variables"
        />
      ) : filteredVariables.length === 0 ? (
        <EmptyState
          message="No variables match your search."
          data-testid="no-search-results"
        />
      ) : (
        <div className="space-y-2">
          {filteredVariables.map((variable) => (
            <VariableCard
              key={variable.id}
              variable={variable}
              onSelect={onSelectVariable}
            />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}