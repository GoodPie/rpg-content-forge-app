'use client';

import { EncounterForm } from '@/components/features/encounters/encounter-form';
import { TemplateSyntaxHelp } from '@/components/features/encounters/template-syntax-help';
import { createEncounter } from '../actions';
import { EncounterData } from '../types';

/**
 * Page component for creating a new encounter
 */
const NewEncounterPage = () => {
  const handleSubmit = async (data: EncounterData) => {
    return await createEncounter(data);
  };

  return (
    <>
      <EncounterForm onSubmit={handleSubmit} />
      <TemplateSyntaxHelp />
    </>
  );
};

export default NewEncounterPage;
