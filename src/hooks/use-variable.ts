import { useState, useEffect } from 'react';
import { VariableLibrary, Variable } from '@/types/variables';
import { getVariableLibrary } from '@/app/content-database/variables/actions';

/**
 * Custom hook for fetching and managing a specific variable
 * @param libraryId - The ID of the variable library to fetch
 * @param variableId - The ID of the variable to find in the library
 * @returns An object containing the variable library, variable data, and loading state
 */
export const useVariable = (libraryId: string, variableId: string) => {
  const [library, setLibrary] = useState<VariableLibrary | null>(null);
  const [variable, setVariable] = useState<Variable | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch the library which includes all variables
        const response = await getVariableLibrary(libraryId);
        if (response.success && response.data) {
          setLibrary(response.data);
          
          // Find the specific variable in the library
          const foundVariable = response.data.variables.find(v => v.id === variableId);
          if (foundVariable) {
            setVariable(foundVariable);
          } else {
            setError('Variable not found in this library');
          }
        } else {
          setError(response.error || 'Failed to fetch variable library');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [libraryId, variableId]);

  return { library, variable, isLoading, error };
};