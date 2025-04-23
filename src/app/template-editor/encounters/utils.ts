// Utility functions for encounter data validation and processing

import { EncounterData, TagData } from './types';

/**
 * Validates encounter data and throws an error if validation fails
 */
export const validateEncounterData = (data: EncounterData): void => {
  if (!data.name.trim()) {
    throw new Error('Template name is required');
  }

  if (!data.description.trim()) {
    throw new Error('Template description is required');
  }

  if (!data.content.trim()) {
    throw new Error('Template content is required');
  }
};

/**
 * Processes encounter data by trimming values and formatting tags
 * Returns data ready for database operations
 */
export const processEncounterData = (data: EncounterData) => {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    content: data.content.trim(),
  };
};

/**
 * Parses comma-separated tags string into an array of tag names
 */
export const parseTags = (tagsString: string): string[] => {
  return tagsString.split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
};

/**
 * Converts an array of TagData objects to a comma-separated string
 */
export const tagsToString = (tags: TagData[]): string => {
  return tags.map(tag => tag.name).join(',');
};

/**
 * Converts an array of TagData objects to an array of tag names
 */
export const tagsToArray = (tags: TagData[]): string[] => {
  return tags.map(tag => tag.name);
};
