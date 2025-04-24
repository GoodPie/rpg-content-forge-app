'use client';

import { UseFormReturn } from 'react-hook-form';
import { VariableValuesList } from './variable-values-list';
import { VariableValueFormSection } from './variable-value-form-section';
import { useVariableValues } from '@/hooks';

interface VariableValuesSectionProps {
  form: UseFormReturn<any>;
}

/**
 * Component for the variable values section
 * 
 * This component combines the variable values list and form into a single section.
 * It uses the useVariableValues hook to manage the state and handlers for the values.
 */
export function VariableValuesSection({ form }: Readonly<VariableValuesSectionProps>) {
  const {
    newValue,
    setNewValue,
    editingIndex,
    handleAddValue,
    handleStartEditValue,
    handleSaveEditValue,
    handleCancelEdit,
    handleRemoveValue
  } = useVariableValues(form);

  return (
    <div className="border rounded-md p-4">
      <h3 className="text-md font-medium mb-4">Variable Values</h3>

      {/* Values List */}
      <VariableValuesList
        values={form.watch('values') || []}
        handleStartEditValue={handleStartEditValue}
        handleRemoveValue={handleRemoveValue}
      />

      {/* Add/Edit Value Form */}
      <VariableValueFormSection
        newValue={newValue}
        setNewValue={setNewValue}
        editingIndex={editingIndex}
        handleSaveEditValue={handleSaveEditValue}
        handleAddValue={handleAddValue}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
