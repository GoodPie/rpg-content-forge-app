import {
  validateVariableLibraryData,
  validateVariableData,
  validateVariableValueData,
  processVariableLibraryData,
  processVariableData,
  processVariableValueData,
  isValidCondition,
  parseTags,
  filterVariablesBySearchTerm
} from '../variable-utils';

describe('Variable Utilities', () => {
  describe('validateVariableLibraryData', () => {
    it('should not throw for valid data', () => {
      const data = {
        name: 'Test Library',
        description: 'Test Description',
        tags: 'tag1, tag2'
      };
      expect(() => validateVariableLibraryData(data)).not.toThrow();
    });

    it('should throw for empty name', () => {
      const data = {
        name: '',
        description: 'Test Description',
        tags: 'tag1, tag2'
      };
      expect(() => validateVariableLibraryData(data)).toThrow('Library name is required');
    });

    it('should throw for empty description', () => {
      const data = {
        name: 'Test Library',
        description: '',
        tags: 'tag1, tag2'
      };
      expect(() => validateVariableLibraryData(data)).toThrow('Library description is required');
    });
  });

  describe('validateVariableData', () => {
    it('should not throw for valid data', () => {
      const data = {
        name: 'test_variable',
        description: 'Test Description',
        libraryId: '123'
      };
      expect(() => validateVariableData(data)).not.toThrow();
    });

    it('should throw for empty name', () => {
      const data = {
        name: '',
        description: 'Test Description',
        libraryId: '123'
      };
      expect(() => validateVariableData(data)).toThrow('Variable name is required');
    });

    it('should throw for invalid name format', () => {
      const data = {
        name: '123_invalid',
        description: 'Test Description',
        libraryId: '123'
      };
      expect(() => validateVariableData(data)).toThrow('Variable name must start with a letter');
    });

    it('should throw for empty libraryId', () => {
      const data = {
        name: 'test_variable',
        description: 'Test Description',
        libraryId: ''
      };
      expect(() => validateVariableData(data)).toThrow('Library ID is required');
    });
  });

  describe('validateVariableValueData', () => {
    it('should not throw for valid data', () => {
      const data = {
        text: 'Test Value',
        condition: 'time_of_day == night',
        weight: 1.5,
        variableId: '123'
      };
      expect(() => validateVariableValueData(data)).not.toThrow();
    });

    it('should not throw for valid data without condition', () => {
      const data = {
        text: 'Test Value',
        variableId: '123'
      };
      expect(() => validateVariableValueData(data)).not.toThrow();
    });

    it('should throw for empty text', () => {
      const data = {
        text: '',
        variableId: '123'
      };
      expect(() => validateVariableValueData(data)).toThrow('Value text is required');
    });

    it('should throw for empty variableId', () => {
      const data = {
        text: 'Test Value',
        variableId: ''
      };
      expect(() => validateVariableValueData(data)).toThrow('Variable ID is required');
    });

    it('should throw for invalid condition', () => {
      const data = {
        text: 'Test Value',
        condition: 'invalid condition',
        variableId: '123'
      };
      expect(() => validateVariableValueData(data)).toThrow('Invalid condition format');
    });

    it('should throw for negative weight', () => {
      const data = {
        text: 'Test Value',
        weight: -1,
        variableId: '123'
      };
      expect(() => validateVariableValueData(data)).toThrow('Weight must be a positive number');
    });
  });

  describe('processVariableLibraryData', () => {
    it('should trim values', () => {
      const data = {
        name: '  Test Library  ',
        description: '  Test Description  ',
        tags: '  tag1, tag2  '
      };
      const processed = processVariableLibraryData(data);
      expect(processed).toEqual({
        name: 'Test Library',
        description: 'Test Description',
        tags: 'tag1, tag2'
      });
    });
  });

  describe('processVariableData', () => {
    it('should trim values', () => {
      const data = {
        name: '  test_variable  ',
        description: '  Test Description  ',
        libraryId: '123'
      };
      const processed = processVariableData(data);
      expect(processed).toEqual({
        name: 'test_variable',
        description: 'Test Description',
        libraryId: '123'
      });
    });

    it('should handle undefined description', () => {
      const data = {
        name: 'test_variable',
        libraryId: '123'
      };
      const processed = processVariableData(data);
      expect(processed).toEqual({
        name: 'test_variable',
        description: undefined,
        libraryId: '123'
      });
    });
  });

  describe('processVariableValueData', () => {
    it('should trim values', () => {
      const data = {
        text: '  Test Value  ',
        condition: '  time_of_day == night  ',
        weight: 1.5,
        variableId: '123'
      };
      const processed = processVariableValueData(data);
      expect(processed).toEqual({
        text: 'Test Value',
        condition: 'time_of_day == night',
        weight: 1.5,
        variableId: '123'
      });
    });

    it('should handle undefined condition', () => {
      const data = {
        text: 'Test Value',
        variableId: '123'
      };
      const processed = processVariableValueData(data);
      expect(processed).toEqual({
        text: 'Test Value',
        condition: undefined,
        weight: 1.0,
        variableId: '123'
      });
    });

    it('should use default weight if not provided', () => {
      const data = {
        text: 'Test Value',
        variableId: '123'
      };
      const processed = processVariableValueData(data);
      expect(processed.weight).toBe(1.0);
    });
  });

  describe('isValidCondition', () => {
    it('should return true for valid conditions', () => {
      expect(isValidCondition('time_of_day == night')).toBe(true);
      expect(isValidCondition('player_level > 5')).toBe(true);
      expect(isValidCondition('player_class == wizard')).toBe(true);
      expect(isValidCondition('location_type contains forest')).toBe(true);
    });

    it('should return false for invalid conditions', () => {
      expect(isValidCondition('invalid')).toBe(false);
      expect(isValidCondition('==')).toBe(false);
      expect(isValidCondition('time_of_day ==')).toBe(false);
    });
  });

  describe('parseTags', () => {
    it('should parse comma-separated tags', () => {
      expect(parseTags('tag1, tag2, tag3')).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should trim tags', () => {
      expect(parseTags('  tag1  ,  tag2  ,  tag3  ')).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should filter out empty tags', () => {
      expect(parseTags('tag1, , tag3')).toEqual(['tag1', 'tag3']);
    });

    it('should return empty array for undefined input', () => {
      expect(parseTags(undefined)).toEqual([]);
    });

    it('should return empty array for empty string', () => {
      expect(parseTags('')).toEqual([]);
    });
  });

  describe('filterVariablesBySearchTerm', () => {
    const variables = [
      { id: '1', name: 'weather', description: 'Current weather conditions', values: [] },
      { id: '2', name: 'location', description: 'Current location type', values: [] },
      { id: '3', name: 'time_of_day', description: 'Current time of day', values: [] },
      { id: '4', name: 'enemy_type', description: null, values: [] }
    ];

    it('should return all variables when search term is empty', () => {
      expect(filterVariablesBySearchTerm(variables, '')).toEqual(variables);
    });

    it('should filter variables by name', () => {
      const result = filterVariablesBySearchTerm(variables, 'wea');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter variables by description', () => {
      const result = filterVariablesBySearchTerm(variables, 'location');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should handle case insensitive search', () => {
      const result = filterVariablesBySearchTerm(variables, 'TIME');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('3');
    });

    it('should handle null description', () => {
      const result = filterVariablesBySearchTerm(variables, 'enemy');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('4');
    });

    it('should return empty array when no matches found', () => {
      expect(filterVariablesBySearchTerm(variables, 'nonexistent')).toEqual([]);
    });
  });
});
