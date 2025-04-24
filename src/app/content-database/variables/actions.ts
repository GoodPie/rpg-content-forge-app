'use server';

import { prisma } from '@/lib/prisma';
import { 
  VariableLibraryData, 
  VariableData, 
  VariableValueData, 
  VariableActionResponse,
  VariableLibrary,
  Variable,
  VariableValue
} from '@/types/variables';
import { 
  validateVariableLibraryData, 
  processVariableLibraryData,
  validateVariableData,
  processVariableData,
  validateVariableValueData,
  processVariableValueData,
  MAX_VARIABLES_PER_LIBRARY,
  MAX_VALUES_PER_VARIABLE
} from '@/lib/variable-utils';

/**
 * Creates a new variable library
 */
export const createVariableLibrary = async (
  data: VariableLibraryData
): Promise<VariableActionResponse<VariableLibrary>> => {
  try {
    // Validate form data
    validateVariableLibraryData(data);

    // Process the data (trim values)
    const processedData = processVariableLibraryData(data);

    // Create the variable library in the database
    const library = await prisma.variableLibrary.create({
      data: processedData,
    });

    return { success: true, data: library };
  } catch (error) {
    console.error('Error creating variable library:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Updates an existing variable library
 */
export const updateVariableLibrary = async (
  id: string,
  data: VariableLibraryData
): Promise<VariableActionResponse<VariableLibrary>> => {
  try {
    // Validate form data
    validateVariableLibraryData(data);

    // Check if the library exists
    const existingLibrary = await prisma.variableLibrary.findUnique({
      where: { id },
    });

    if (!existingLibrary) {
      throw new Error('Variable library not found');
    }

    // Process the data (trim values)
    const processedData = processVariableLibraryData(data);

    // Update the library in the database
    const library = await prisma.variableLibrary.update({
      where: { id },
      data: processedData,
    });

    return { success: true, data: library };
  } catch (error) {
    console.error('Error updating variable library:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Retrieves a variable library by ID
 */
export const getVariableLibrary = async (
  id: string
): Promise<VariableActionResponse<VariableLibrary>> => {
  try {
    const library = await prisma.variableLibrary.findUnique({
      where: { id },
      include: {
        variables: {
          include: {
            values: true,
          },
        },
      },
    });

    if (!library) {
      throw new Error('Variable library not found');
    }

    return { success: true, data: library };
  } catch (error) {
    console.error('Error fetching variable library:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Retrieves all variable libraries
 */
export const getAllVariableLibraries = async (): Promise<
  VariableActionResponse<VariableLibrary[]>
> => {
  try {
    const libraries = await prisma.variableLibrary.findMany({
      include: {
        variables: {
          include: {
            values: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return { success: true, data: libraries };
  } catch (error) {
    console.error('Error fetching variable libraries:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Creates a new variable in a library
 */
export const createVariable = async (
  data: VariableData
): Promise<VariableActionResponse<Variable>> => {
  try {
    // Validate form data
    validateVariableData(data);

    // Check if the library exists
    const library = await prisma.variableLibrary.findUnique({
      where: { id: data.libraryId },
      include: {
        variables: true,
      },
    });

    if (!library) {
      throw new Error('Variable library not found');
    }

    // Check if we've reached the maximum number of variables
    if (library.variables.length >= MAX_VARIABLES_PER_LIBRARY) {
      throw new Error(`Too many variables. Maximum ${MAX_VARIABLES_PER_LIBRARY} variables allowed per library.`);
    }

    // Check if a variable with the same name already exists in this library
    const existingVariable = library.variables.find(
      (v) => v.name === data.name.trim()
    );
    if (existingVariable) {
      throw new Error(`A variable with the name "${data.name.trim()}" already exists in this library.`);
    }

    // Process the data (trim values)
    const processedData = processVariableData(data);

    // Create the variable in the database
    const variable = await prisma.variable.create({
      data: processedData,
      include: {
        values: true,
      },
    });

    return { success: true, data: variable };
  } catch (error) {
    console.error('Error creating variable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Updates an existing variable
 */
export const updateVariable = async (
  id: string,
  data: VariableData
): Promise<VariableActionResponse<Variable>> => {
  try {
    // Validate form data
    validateVariableData(data);

    // Check if the variable exists
    const existingVariable = await prisma.variable.findUnique({
      where: { id },
    });

    if (!existingVariable) {
      throw new Error('Variable not found');
    }

    // Check if the library exists
    const library = await prisma.variableLibrary.findUnique({
      where: { id: data.libraryId },
      include: {
        variables: true,
      },
    });

    if (!library) {
      throw new Error('Variable library not found');
    }

    // If the name is changing, check for duplicates
    if (data.name.trim() !== existingVariable.name) {
      const duplicateVariable = library.variables.find(
        (v) => v.name === data.name.trim() && v.id !== id
      );
      if (duplicateVariable) {
        throw new Error(`A variable with the name "${data.name.trim()}" already exists in this library.`);
      }
    }

    // Process the data (trim values)
    const processedData = processVariableData(data);

    // Update the variable in the database
    const variable = await prisma.variable.update({
      where: { id },
      data: processedData,
      include: {
        values: true,
      },
    });

    return { success: true, data: variable };
  } catch (error) {
    console.error('Error updating variable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Creates a new variable value
 */
export const createVariableValue = async (
  data: VariableValueData
): Promise<VariableActionResponse<VariableValue>> => {
  try {
    // Validate form data
    validateVariableValueData(data);

    // Check if the variable exists
    const variable = await prisma.variable.findUnique({
      where: { id: data.variableId },
      include: {
        values: true,
      },
    });

    if (!variable) {
      throw new Error('Variable not found');
    }

    // Check if we've reached the maximum number of values
    if (variable.values.length >= MAX_VALUES_PER_VARIABLE) {
      throw new Error(`Too many values. Maximum ${MAX_VALUES_PER_VARIABLE} values allowed per variable.`);
    }

    // Process the data (trim values)
    const processedData = processVariableValueData(data);

    // Create the variable value in the database
    const value = await prisma.variableValue.create({
      data: processedData,
    });

    return { success: true, data: value };
  } catch (error) {
    console.error('Error creating variable value:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Updates an existing variable value
 */
export const updateVariableValue = async (
  id: string,
  data: VariableValueData
): Promise<VariableActionResponse<VariableValue>> => {
  try {
    // Validate form data
    validateVariableValueData(data);

    // Check if the value exists
    const existingValue = await prisma.variableValue.findUnique({
      where: { id },
    });

    if (!existingValue) {
      throw new Error('Variable value not found');
    }

    // Process the data (trim values)
    const processedData = processVariableValueData(data);

    // Update the variable value in the database
    const value = await prisma.variableValue.update({
      where: { id },
      data: processedData,
    });

    return { success: true, data: value };
  } catch (error) {
    console.error('Error updating variable value:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Deletes a variable value
 */
export const deleteVariableValue = async (
  id: string
): Promise<VariableActionResponse<void>> => {
  try {
    // Check if the value exists
    const existingValue = await prisma.variableValue.findUnique({
      where: { id },
    });

    if (!existingValue) {
      throw new Error('Variable value not found');
    }

    // Delete the variable value
    await prisma.variableValue.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting variable value:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Deletes a variable and all its values
 */
export const deleteVariable = async (
  id: string
): Promise<VariableActionResponse<void>> => {
  try {
    // Check if the variable exists
    const existingVariable = await prisma.variable.findUnique({
      where: { id },
    });

    if (!existingVariable) {
      throw new Error('Variable not found');
    }

    // Delete the variable (cascade will delete values)
    await prisma.variable.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting variable:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

/**
 * Deletes a variable library and all its variables and values
 */
export const deleteVariableLibrary = async (
  id: string
): Promise<VariableActionResponse<void>> => {
  try {
    // Check if the library exists
    const existingLibrary = await prisma.variableLibrary.findUnique({
      where: { id },
    });

    if (!existingLibrary) {
      throw new Error('Variable library not found');
    }

    // Delete the library (cascade will delete variables and values)
    await prisma.variableLibrary.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting variable library:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};