'use client';

import React, { useState, useEffect } from 'react';
import { EncounterForm } from '@/components/features/encounters/encounter-form';
import { TemplateSyntaxHelp } from '@/components/features/encounters/template-syntax-help';
import { updateEncounter, getEncounter } from '../../actions';
import { EncounterData } from '../../types';
import { tagsToString } from '../../utils';

/**
 * Page component for editing an existing encounter
 */
const EditEncounterPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [encounterData, setEncounterData] = useState<EncounterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch encounter data when component mounts
  useEffect(() => {
    const loadEncounter = async () => {
      try {
        const result = await getEncounter(id);

        if (!result.success) {
          throw new Error(result.error || 'Failed to load encounter');
        }

        setEncounterData({
          name: result.encounter.name,
          description: result.encounter.description,
          tags: tagsToString(result.encounter.tags),
          content: result.encounter.content,
        });

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    loadEncounter();
  }, [id]);

  const handleSubmit = async (data: EncounterData) => {
    return await updateEncounter(id, data);
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-md border border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Error</h2>
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <>
      {encounterData ? (
        <EncounterForm 
          defaultValues={encounterData}
          isEditing={true}
          encounterId={id}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Loading encounter data...</p>
          </div>
        </div>
      ) : null}
      <TemplateSyntaxHelp />
    </>
  );
};

export default EditEncounterPage;
