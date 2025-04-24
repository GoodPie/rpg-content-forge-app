'use client';

import { UseFormReturn } from 'react-hook-form';

interface VariableUsageInfoProps {
  form: UseFormReturn<any>;
}

/**
 * Component for displaying variable usage information
 * 
 * This component shows how to use the variable in templates.
 */
export function VariableUsageInfo({ form }: Readonly<VariableUsageInfoProps>) {
  return (
    <div className="bg-muted p-4 rounded-md">
      <h3 className="text-sm font-medium mb-2">Variable Usage</h3>
      <p className="text-sm text-muted-foreground">
        In templates, use this variable with: <code
        className="bg-background px-1 py-0.5 rounded">{"{{"}{form.watch('name') || 'variable_name'}{"}}"}</code>
      </p>
    </div>
  );
}