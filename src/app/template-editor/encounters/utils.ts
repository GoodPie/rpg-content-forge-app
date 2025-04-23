// Utility functions for encounter data validation and processing

import { EncounterData } from './types';

/**
 * Validates encounter data and throws an error if validation fails
 */
export function validateEncounterData(data: EncounterData): void {
  if (!data.name.trim()) {
    throw new Error('Template name is required');
  }

  if (!data.description.trim()) {
    throw new Error('Template description is required');
  }

  if (!data.content.trim()) {
    throw new Error('Template content is required');
  }
}

/**
 * Processes encounter data by trimming values and formatting tags
 */
export function processEncounterData(data: EncounterData) {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean).join(','),
    content: data.content.trim(),
  };
}

/**
 * Parses comma-separated tags string into an array of tags
 */
export function parseTags(tagsString: string): string[] {
  return tagsString.split(',').filter(Boolean);
}