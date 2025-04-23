'use server';

import { prisma } from '@/lib/prisma';
import { EncounterData, ActionResponse, Encounter } from './types';
import { validateEncounterData, processEncounterData } from './utils';

/**
 * Creates a new encounter with the provided data
 */
export async function createEncounter(data: EncounterData): Promise<ActionResponse<Encounter>> {
  try {
    // Validate form data
    validateEncounterData(data);

    // Process the data (trim values, format tags)
    const processedData = processEncounterData(data);

    // Create the encounter in the database
    const encounter = await prisma.encounter.create({
      data: {
        ...processedData,
      },
    });

    return { success: true, encounter };
  } catch (error) {
    console.error('Error creating encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

/**
 * Updates an existing encounter with the provided data
 */
export async function updateEncounter(id: string, data: EncounterData): Promise<ActionResponse<Encounter>> {
  try {
    // Validate form data
    validateEncounterData(data);

    // Check if the encounter exists
    const existingEncounter = await prisma.encounter.findUnique({
      where: { id },
    });

    if (!existingEncounter) {
      throw new Error('Encounter not found');
    }

    // Process the data (trim values, format tags)
    const processedData = processEncounterData(data);

    // Update the encounter in the database
    const encounter = await prisma.encounter.update({
      where: { id },
      data: processedData,
    });

    return { success: true, encounter };
  } catch (error) {
    console.error('Error updating encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function getEncounter(id: string) {
  try {
    const encounter = await prisma.encounter.findUnique({
      where: { id },
    });

    if (!encounter) {
      throw new Error('Encounter not found');
    }

    return { success: true, encounter };
  } catch (error) {
    console.error('Error fetching encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
