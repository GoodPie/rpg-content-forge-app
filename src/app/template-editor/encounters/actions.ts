'use server';

import { prisma } from '@/lib/prisma';
import { EncounterData, ActionResponse, Encounter, TagData } from './types';
import { validateEncounterData, processEncounterData, parseTags } from './utils';

/**
 * Creates a new encounter with the provided data
 */
export const createEncounter = async (data: EncounterData): Promise<ActionResponse<Encounter>> => {
  try {
    // Validate form data
    validateEncounterData(data);

    // Process the data (trim values)
    const processedData = processEncounterData(data);

    // Parse tags from the comma-separated string
    const tagNames = parseTags(data.tags);

    // Create the encounter with tags in the database
    const encounter = await prisma.encounter.create({
      data: {
        ...processedData,
        tags: {
          create: tagNames.map(tagName => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Transform the data to match the Encounter interface
    const transformedEncounter: Encounter = {
      id: encounter.id,
      name: encounter.name,
      description: encounter.description,
      content: encounter.content,
      tags: encounter.tags.map(et => ({
        id: et.tag.id,
        name: et.tag.name
      }))
    };

    return { success: true, encounter: transformedEncounter };
  } catch (error) {
    console.error('Error creating encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

/**
 * Updates an existing encounter with the provided data
 */
export const updateEncounter = async (id: string, data: EncounterData): Promise<ActionResponse<Encounter>> => {
  try {
    // Validate form data
    validateEncounterData(data);

    // Check if the encounter exists
    const existingEncounter = await prisma.encounter.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    if (!existingEncounter) {
      throw new Error('Encounter not found');
    }

    // Process the data (trim values)
    const processedData = processEncounterData(data);

    // Parse tags from the comma-separated string
    const tagNames = parseTags(data.tags);

    // Update the encounter in the database
    // First, delete all existing tag relationships
    await prisma.encounterTag.deleteMany({
      where: { encounterId: id }
    });

    // Then update the encounter and create new tag relationships
    const encounter = await prisma.encounter.update({
      where: { id },
      data: {
        ...processedData,
        tags: {
          create: tagNames.map(tagName => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName }
              }
            }
          }))
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    // Transform the data to match the Encounter interface
    const transformedEncounter: Encounter = {
      id: encounter.id,
      name: encounter.name,
      description: encounter.description,
      content: encounter.content,
      tags: encounter.tags.map(et => ({
        id: et.tag.id,
        name: et.tag.name
      }))
    };

    return { success: true, encounter: transformedEncounter };
  } catch (error) {
    console.error('Error updating encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

/**
 * Retrieves an encounter by ID
 */
export const getEncounter = async (id: string): Promise<ActionResponse<Encounter>> => {
  try {
    const encounter = await prisma.encounter.findUnique({
      where: { id },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });

    if (!encounter) {
      throw new Error('Encounter not found');
    }

    // Transform the data to match the Encounter interface
    const transformedEncounter: Encounter = {
      id: encounter.id,
      name: encounter.name,
      description: encounter.description,
      content: encounter.content,
      tags: encounter.tags.map(et => ({
        id: et.tag.id,
        name: et.tag.name
      }))
    };

    return { success: true, encounter: transformedEncounter };
  } catch (error) {
    console.error('Error fetching encounter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};
