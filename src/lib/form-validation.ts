/**
 * Utility functions for form validation
 * 
 * These functions adapt the existing validation functions to work with forms,
 * returning validation results in the format expected by the useFormSubmission hook.
 */

import { VariableLibraryData, VariableData } from '@/types/variables';
import { MAX_VALUES_PER_VARIABLE, isValidCondition } from '@/lib/variable-utils';
import { VariableValueFormData } from '@/hooks/use-variable-values';

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Validates variable library form data
 * @param data - The form data to validate
 * @returns A validation result object
 */
export const validateVariableLibraryForm = (data: VariableLibraryData): ValidationResult => {
  if (!data.name.trim()) {
    return { isValid: false, errorMessage: 'Name is required' };
  }

  if (!data.description.trim()) {
    return { isValid: false, errorMessage: 'Description is required' };
  }

  if (data.name.length > 100) {
    return { isValid: false, errorMessage: 'Name is too long' };
  }

  if (data.description.length > 500) {
    return { isValid: false, errorMessage: 'Description is too long' };
  }

  return { isValid: true };
};

/**
 * Validates variable form data
 * @param data - The form data to validate
 * @returns A validation result object
 */
export const validateVariableForm = (data: VariableData & { values?: VariableValueFormData[] }): ValidationResult => {
  if (!data.name.trim()) {
    return { isValid: false, errorMessage: "Name is required" };
  }

  if (data.name.length > 50) {
    return { isValid: false, errorMessage: "Name is too long" };
  }

  // Validate name format (must start with a letter and contain only letters, numbers, and underscores)
  if (!data.name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) {
    return { isValid: false, errorMessage: "Name must start with a letter and contain only letters, numbers, and underscores" };
  }

  if (!data.libraryId) {
    return { isValid: false, errorMessage: "Library ID is required" };
  }

  // Validate values if they exist
  if (data.values && data.values.length > 0) {
    // Check if we've reached the maximum number of values
    if (data.values.length > MAX_VALUES_PER_VARIABLE) {
      return { isValid: false, errorMessage: `Too many values. Maximum ${MAX_VALUES_PER_VARIABLE} values allowed per variable.` };
    }

    // Validate each value
    for (let i = 0; i < data.values.length; i++) {
      const value = data.values[i];

      // Check required fields
      if (!value.text.trim()) {
        return { isValid: false, errorMessage: `Value ${i + 1} text is required` };
      }

      // Validate weight is positive
      if (typeof value.weight !== 'number' || value.weight <= 0) {
        return { isValid: false, errorMessage: `Value ${i + 1} weight must be a positive number` };
      }

      // Validate condition if provided
      if (value.condition && !isValidCondition(value.condition)) {
        return { isValid: false, errorMessage: `Value ${i + 1} has an invalid condition format` };
      }
    }
  }

  return { isValid: true };
};