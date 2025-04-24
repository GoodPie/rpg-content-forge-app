'use client';

import { Button } from '@/components/ui/button';
import { VariableValueFormData } from '@/hooks';

interface VariableValuesListProps {
  values: VariableValueFormData[];
  handleStartEditValue: (index: number) => void;
  handleRemoveValue: (index: number) => void;
}

/**
 * Component for displaying a list of variable values
 * 
 * This component displays a list of variable values with options to edit or remove each value.
 * If no values are present, it displays a message encouraging the user to add values.
 */
export function VariableValuesList({
  values,
  handleStartEditValue,
  handleRemoveValue
}: Readonly<VariableValuesListProps>) {
  return (
    <div className="space-y-2 mb-4">
      {values?.length > 0 ? (
        values.map((value, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-background">
            <div className="flex-1">
              <p className="font-medium">{value.text}</p>
              {value.condition && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Condition:</span> {value.condition}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Weight:</span> {value.weight}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleStartEditValue(index)}
              >
                Edit
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                onClick={() => handleRemoveValue(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-muted-foreground py-4">
          No values added yet. Add values to make this variable useful.
        </p>
      )}
    </div>
  );
}
