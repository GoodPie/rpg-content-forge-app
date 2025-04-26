import React from 'react';
import { Variable } from '@/types/variables';

interface VariableCardProps {
  variable: Variable;
  onSelect: (variableName: string) => void;
}

/**
 * Component for displaying a single variable in the variable selector
 */
export function VariableCard({ variable, onSelect }: VariableCardProps) {
  return (
    <div 
      data-testid="variable-card"
      className="p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
      onClick={() => onSelect(variable.name)}
    >
      <div className="font-medium">{variable.name}</div>
      {variable.description && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {variable.description}
        </div>
      )}
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        {variable.values.length} values
      </div>
    </div>
  );
}