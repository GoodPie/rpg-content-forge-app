'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { VariableValueFormData } from '@/hooks';

interface VariableValueFormSectionProps {
  newValue: VariableValueFormData;
  setNewValue: (value: VariableValueFormData) => void;
  editingIndex: number | null;
  handleSaveEditValue: () => void;
  handleAddValue: () => void;
  handleCancelEdit: () => void;
}

/**
 * Component for the variable value form section
 * 
 * This component provides a form for adding and editing variable values.
 * It includes fields for text, condition, and weight.
 */
export function VariableValueFormSection({
  newValue,
  setNewValue,
  editingIndex,
  handleSaveEditValue,
  handleAddValue,
  handleCancelEdit
}: Readonly<VariableValueFormSectionProps>) {
  return (
    <div className="border rounded-md p-4 bg-muted/50">
      <h4 className="text-sm font-medium mb-2">
        {editingIndex !== null ? 'Edit Value' : 'Add Value'}
      </h4>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="valueText" className="text-sm font-medium">
            Value Text
          </label>
          <Textarea
            id="valueText"
            placeholder="dense and shadowy"
            value={newValue.text}
            onChange={(e) => setNewValue({...newValue, text: e.target.value})}
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            The text that will replace the variable in templates
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="valueCondition" className="text-sm font-medium">
            Condition (Optional)
          </label>
          <Input
            id="valueCondition"
            placeholder="time_of_day == night"
            value={newValue.condition}
            onChange={(e) => setNewValue({...newValue, condition: e.target.value})}
          />
          <p className="text-xs text-muted-foreground">
            A condition that must be true for this value to be used
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="valueWeight" className="text-sm font-medium">
            Weight
          </label>
          <Input
            id="valueWeight"
            type="number"
            step="0.1"
            min="0.1"
            placeholder="1.0"
            value={newValue.weight}
            onChange={(e) => setNewValue({...newValue, weight: parseFloat(e.target.value) || 1.0})}
          />
          <p className="text-xs text-muted-foreground">
            Higher weights make this value more likely to be selected (default: 1.0)
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          {editingIndex !== null && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            onClick={editingIndex !== null ? handleSaveEditValue : handleAddValue}
          >
            {editingIndex !== null ? 'Save Changes' : 'Add Value'}
          </Button>
        </div>
      </div>
    </div>
  );
}
