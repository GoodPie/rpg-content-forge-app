import { useState, useEffect } from 'react';
import { VariableLibrary } from '@/types/variables';
import { getVariableLibrary } from '@/app/content-database/variables/actions';

/**
 * Custom hook for fetching and managing a specific variable library
 * @param libraryId - The ID of the variable library to fetch
 * @returns An object containing the variable library data and loading state
 */
export const useVariableLibrary = (libraryId: string) => {
  const [library, setLibrary] = useState<VariableLibrary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getVariableLibrary(libraryId);
        if (response.success && response.data) {
          setLibrary(response.data);
        } else {
          setError(response.error || 'Failed to fetch variable library');
        }
      } catch (err) {
        console.error('Error fetching variable library:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, [libraryId]);

  return { library, isLoading, error };
};