/**
 * Custom hook for managing variable values in a form
 * 
 * This hook provides functionality for adding, editing, and removing variable values
 * in a form, as well as managing the state of the value being edited.
 * 
 * @example
 * ```tsx
 * const { 
 *   newValue, 
 *   editingIndex, 
 *   handleAddValue, 
 *   handleStartEditValue, 
 *   handleSaveEditValue, 
 *   handleCancelEdit, 
 *   handleRemoveValue 
 * } = useVariableValues(form);
 * ```
 */

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface VariableValueFormData {
  text: string;
  condition?: string;
  weight: number;
}

/**
 * Custom hook for managing variable values in a form
 * @param form - The form instance from react-hook-form
 * @returns An object containing the value management state and handlers
 */
export const useVariableValues = (
  form: UseFormReturn<any>
) => {
  const [newValue, setNewValue] = useState<VariableValueFormData>({ text: '', condition: '', weight: 1.0 });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /**
   * Add a new value to the form
   */
  const handleAddValue = () => {
    // Validate the new value
    if (!newValue.text.trim()) {
      return; // Don't add empty values
    }

    // Get current values
    const currentValues = form.getValues().values || [];

    // Add the new value
    form.setValue('values', [...currentValues, newValue]);

    // Reset the new value form
    setNewValue({ text: '', condition: '', weight: 1.0 });
  };

  /**
   * Start editing a value
   * @param index - The index of the value to edit
   */
  const handleStartEditValue = (index: number) => {
    const values = form.getValues().values || [];
    if (index >= 0 && index < values.length) {
      setNewValue(values[index]);
      setEditingIndex(index);
    }
  };

  /**
   * Save the edited value
   */
  const handleSaveEditValue = () => {
    if (editingIndex === null) return;

    // Validate the edited value
    if (!newValue.text.trim()) {
      return; // Don't save empty values
    }

    // Get current values
    const currentValues = form.getValues().values || [];

    // Update the value at the editing index
    const updatedValues = [...currentValues];
    updatedValues[editingIndex] = newValue;

    // Update the form
    form.setValue('values', updatedValues);

    // Reset the editing state
    setNewValue({ text: '', condition: '', weight: 1.0 });
    setEditingIndex(null);
  };

  /**
   * Cancel editing a value
   */
  const handleCancelEdit = () => {
    setNewValue({ text: '', condition: '', weight: 1.0 });
    setEditingIndex(null);
  };

  /**
   * Remove a value from the form
   * @param index - The index of the value to remove
   */
  const handleRemoveValue = (index: number) => {
    // Get current values
    const currentValues = form.getValues().values || [];

    // Remove the value at the specified index
    const updatedValues = currentValues.filter((_, i) => i !== index);

    // Update the form
    form.setValue('values', updatedValues);

    // If we were editing this value, cancel the edit
    if (editingIndex === index) {
      handleCancelEdit();
    }
  };

  return {
    newValue,
    setNewValue,
    editingIndex,
    handleAddValue,
    handleStartEditValue,
    handleSaveEditValue,
    handleCancelEdit,
    handleRemoveValue
  };
};