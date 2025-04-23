// TypeScript interfaces for encounter data and responses

export interface EncounterData {
  name: string;
  description: string;
  tags: string;
  content: string;
}

export interface Encounter extends Omit<EncounterData, 'tags'> {
  id: string;
  tags: string; // Comma-separated string in the database
}

export interface EncounterWithParsedTags extends Omit<Encounter, 'tags'> {
  tags: string[]; // Array of tags for display
}

export interface ActionResponse<T = any> {
  success: boolean;
  error?: string;
  encounter?: T;
}