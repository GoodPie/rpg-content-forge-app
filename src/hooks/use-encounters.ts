import { useState, useEffect } from 'react';
import { Encounter, ActionResponse } from '@/app/template-editor/encounters/types';
import { getAllEncounters } from '@/app/template-editor/encounters/actions';

/**
 * Custom hook for fetching and managing encounter data
 * @returns An object containing encounters data and loading state
 */
export const useEncounters = () => {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEncounters = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getAllEncounters();
        if (response.success && response.encounters) {
          setEncounters(response.encounters);
        } else {
          setError(response.error || 'Failed to fetch encounters');
        }
      } catch (err) {
        console.error('Error fetching encounters:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEncounters();
  }, []);

  return { encounters, isLoading, error };
};
