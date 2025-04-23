import { validateEncounterData, processEncounterData, parseTags } from '../utils';
import { EncounterData } from '../types';

describe('Encounter Utility Functions', () => {
  // Test data
  const validEncounterData: EncounterData = {
    name: 'Test Encounter',
    description: 'A test encounter description',
    tags: 'test,encounter,unit-test',
    content: 'This is test content for the encounter'
  };

  describe('validateEncounterData', () => {
    it('should not throw an error for valid data', () => {
      expect(() => validateEncounterData(validEncounterData)).not.toThrow();
    });

    it('should throw an error if name is empty', () => {
      const invalidData = { ...validEncounterData, name: '' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template name is required');
    });

    it('should throw an error if name contains only whitespace', () => {
      const invalidData = { ...validEncounterData, name: '   ' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template name is required');
    });

    it('should throw an error if description is empty', () => {
      const invalidData = { ...validEncounterData, description: '' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template description is required');
    });

    it('should throw an error if description contains only whitespace', () => {
      const invalidData = { ...validEncounterData, description: '   ' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template description is required');
    });

    it('should throw an error if content is empty', () => {
      const invalidData = { ...validEncounterData, content: '' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template content is required');
    });

    it('should throw an error if content contains only whitespace', () => {
      const invalidData = { ...validEncounterData, content: '   ' };
      expect(() => validateEncounterData(invalidData)).toThrow('Template content is required');
    });

    it('should not throw an error if tags is empty', () => {
      const dataWithEmptyTags = { ...validEncounterData, tags: '' };
      expect(() => validateEncounterData(dataWithEmptyTags)).not.toThrow();
    });
  });

  describe('processEncounterData', () => {
    it('should trim all string values', () => {
      const dataWithWhitespace: EncounterData = {
        name: '  Test Encounter  ',
        description: '  A test description  ',
        tags: 'test, encounter, unit-test',
        content: '  Test content  '
      };

      const processed = processEncounterData(dataWithWhitespace);
      
      expect(processed.name).toBe('Test Encounter');
      expect(processed.description).toBe('A test description');
      expect(processed.content).toBe('Test content');
    });

    it('should format tags correctly', () => {
      const dataWithMesyTags: EncounterData = {
        name: 'Test',
        description: 'Test',
        tags: ' tag1, tag2,,  tag3, , tag4 ',
        content: 'Test'
      };

      const processed = processEncounterData(dataWithMesyTags);
      
      expect(processed.tags).toBe('tag1,tag2,tag3,tag4');
    });

    it('should handle empty tags', () => {
      const dataWithEmptyTags: EncounterData = {
        name: 'Test',
        description: 'Test',
        tags: '',
        content: 'Test'
      };

      const processed = processEncounterData(dataWithEmptyTags);
      
      expect(processed.tags).toBe('');
    });

    it('should handle tags with only whitespace', () => {
      const dataWithWhitespaceTags: EncounterData = {
        name: 'Test',
        description: 'Test',
        tags: '   ,  ,   ',
        content: 'Test'
      };

      const processed = processEncounterData(dataWithWhitespaceTags);
      
      expect(processed.tags).toBe('');
    });
  });

  describe('parseTags', () => {
    it('should parse comma-separated tags into an array', () => {
      const tagsString = 'tag1,tag2,tag3';
      const result = parseTags(tagsString);
      
      expect(result).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should filter out empty tags', () => {
      const tagsString = 'tag1,,tag2,';
      const result = parseTags(tagsString);
      
      expect(result).toEqual(['tag1', 'tag2']);
    });

    it('should return an empty array for empty string', () => {
      const result = parseTags('');
      
      expect(result).toEqual([]);
    });

    it('should handle whitespace in tags', () => {
      const tagsString = 'tag 1,tag 2, tag 3';
      const result = parseTags(tagsString);
      
      expect(result).toEqual(['tag 1', 'tag 2', ' tag 3']);
    });
  });
});