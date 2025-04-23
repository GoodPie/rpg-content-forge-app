// TypeScript interfaces for encounter data and responses

/**
 * Tag data structure
 */
export interface TagData {
  id: string;
  name: string;
}

/**
 * Data structure for form submission
 */
export interface EncounterData {
  name: string;
  description: string;
  tags: string; // Still using string for form input (comma-separated)
  content: string;
}

/**
 * Database encounter structure with tag relations
 */
export interface Encounter {
  id: string;
  name: string;
  description: string;
  content: string;
  tags: TagData[]; // Array of tag objects from the database
}

/**
 * Encounter with tags as string array (for backward compatibility)
 */
export interface EncounterWithParsedTags extends Omit<Encounter, 'tags'> {
  tags: string[]; // Array of tag names for display
}

export interface ActionResponse<T = any> {
  success: boolean;
  error?: string;
  encounter?: T;
}
