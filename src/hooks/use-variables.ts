import { useState, useEffect } from 'react';
import { 
  VariableLibrary, 
  Variable, 
  VariableValue 
} from '@/types/variables';
import { getAllVariableLibraries } from '@/app/content-database/variables/actions';

/**
 * Custom hook for fetching and managing variable library data
 * @returns An object containing variable libraries data and loading state
 */
export const useVariableLibraries = () => {
  const [libraries, setLibraries] = useState<VariableLibrary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAllVariableLibraries();
        if (response.success && response.data) {
          setLibraries(response.data);
        } else {
          setError(response.error || 'Failed to fetch variable libraries');
        }
      } catch (err) {
        console.error('Error fetching variable libraries:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraries();
  }, []);

  return { libraries, isLoading, error };
};

/**
 * Custom hook for managing a selected variable library
 * @param libraries Array of variable libraries
 * @param selectedLibraryId ID of the selected library
 * @returns An object containing the selected library and its variables
 */
export const useSelectedVariableLibrary = (
  libraries: VariableLibrary[],
  selectedLibraryId: string | null
) => {
  const selectedLibrary = selectedLibraryId
    ? libraries.find(lib => lib.id === selectedLibraryId) || null
    : null;

  const variables = selectedLibrary?.variables || [];

  return { selectedLibrary, variables };
};

/**
 * Custom hook for managing a selected variable
 * @param variables Array of variables
 * @param selectedVariableId ID of the selected variable
 * @returns An object containing the selected variable and its values
 */
export const useSelectedVariable = (
  variables: Variable[],
  selectedVariableId: string | null
) => {
  const selectedVariable = selectedVariableId
    ? variables.find(v => v.id === selectedVariableId) || null
    : null;

  const values = selectedVariable?.values || [];

  return { selectedVariable, values };
};