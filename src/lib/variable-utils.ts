/**
 * Utility functions for variable data validation and processing
 */

import { VariableLibraryData, VariableData, VariableValueData, Variable } from '@/types/variables';

/**
 * Maximum number of variables allowed per library
 */
export const MAX_VARIABLES_PER_LIBRARY = 50;

/**
 * Maximum number of values allowed per variable
 */
export const MAX_VALUES_PER_VARIABLE = 100;

/**
 * Validates variable library data and throws an error if validation fails
 */
export const validateVariableLibraryData = (data: VariableLibraryData): void => {
  if (!data.name.trim()) {
    throw new Error('Library name is required');
  }

  if (!data.description.trim()) {
    throw new Error('Library description is required');
  }
};

/**
 * Validates variable data and throws an error if validation fails
 */
export const validateVariableData = (data: VariableData): void => {
  if (!data.name.trim()) {
    throw new Error('Variable name is required');
  }

  if (!data.libraryId) {
    throw new Error('Library ID is required');
  }

  // Variable names should be valid identifiers (letters, numbers, underscores)
  if (!data.name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) {
    throw new Error('Variable name must start with a letter and contain only letters, numbers, and underscores');
  }
};

/**
 * Validates variable value data and throws an error if validation fails
 */
export const validateVariableValueData = (data: VariableValueData): void => {
  if (!data.text.trim()) {
    throw new Error('Value text is required');
  }

  if (!data.variableId) {
    throw new Error('Variable ID is required');
  }

  // If condition is provided, validate its format
  if (data.condition && !isValidCondition(data.condition)) {
    throw new Error('Invalid condition format');
  }

  // If weight is provided, validate it's a positive number
  if (data.weight !== undefined && data.weight <= 0) {
    throw new Error('Weight must be a positive number');
  }
};

/**
 * Processes variable library data by trimming values
 * Returns data ready for database operations
 */
export const processVariableLibraryData = (data: VariableLibraryData) => {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    tags: data.tags ? data.tags.trim() : undefined,
  };
};

/**
 * Processes variable data by trimming values
 * Returns data ready for database operations
 */
export const processVariableData = (data: VariableData) => {
  return {
    name: data.name.trim(),
    description: data.description ? data.description.trim() : undefined,
    libraryId: data.libraryId,
  };
};

/**
 * Processes variable value data by trimming values
 * Returns data ready for database operations
 */
export const processVariableValueData = (data: VariableValueData) => {
  return {
    text: data.text.trim(),
    condition: data.condition ? data.condition.trim() : undefined,
    weight: data.weight !== undefined ? data.weight : 1.0,
    variableId: data.variableId,
  };
};

/**
 * Validates a condition string
 * Simple validation for now - just checks for basic format
 */
export const isValidCondition = (condition: string): boolean => {
  // Basic validation - check for common comparison operators
  return /^[a-zA-Z0-9_\s]+(\s*[=!<>]=?\s*|\s+in\s+|\s+contains\s+)[a-zA-Z0-9_\s"'[\]]+$/.test(condition);
};

/**
 * Parses tags from a comma-separated string
 */
export const parseTags = (tagsString?: string): string[] => {
  if (!tagsString) return [];

  return tagsString.split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
};

/**
 * Filters variables based on a search term
 * Matches against variable name and description
 */
export const filterVariablesBySearchTerm = (variables: Variable[], searchTerm: string): Variable[] => {
  if (!searchTerm) return variables;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return variables.filter(variable => 
    variable.name.toLowerCase().includes(lowerSearchTerm) ||
    (variable.description?.toLowerCase() || '').includes(lowerSearchTerm)
  );
};
