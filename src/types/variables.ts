/**
 * TypeScript interfaces for variable data and responses
 */

/**
 * Variable library data structure
 */
export interface VariableLibrary {
  id: string;
  name: string;
  description: string;
  variables: Variable[];
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Variable data structure
 */
export interface Variable {
  id: string;
  name: string;
  description?: string;
  libraryId: string;
  values: VariableValue[];
  isKeyFeature?: boolean;
  keyFeatureType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Variable value data structure
 */
export interface VariableValue {
  id: string;
  text: string;
  condition?: string;
  weight: number;
  variableId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Data structure for variable library form submission
 */
export interface VariableLibraryData {
  name: string;
  description: string;
  tags?: string;
}

/**
 * Data structure for variable form submission
 */
export interface VariableData {
  name: string;
  description?: string;
  libraryId: string;
  isKeyFeature?: boolean;
  keyFeatureType?: string;
}

/**
 * Data structure for variable value form submission
 */
export interface VariableValueData {
  text: string;
  condition?: string;
  weight?: number;
  variableId: string;
}

/**
 * Response structure for variable-related actions
 */
export interface VariableActionResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}
