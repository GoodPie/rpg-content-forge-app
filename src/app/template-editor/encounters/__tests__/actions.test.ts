import { createEncounter, updateEncounter, getEncounter } from '../actions';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { EncounterData } from '../types';

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid')
}));

// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    encounter: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn()
    }
  }
}));

describe('Encounter Actions', () => {
  // Test data
  const encounterData: EncounterData = {
    name: 'Test Encounter',
    description: 'A test encounter description',
    tags: 'test,encounter',
    content: 'This is test content for the encounter'
  };

  const mockEncounter = {
    id: 'mocked-uuid',
    name: 'Test Encounter',
    description: 'A test encounter description',
    tags: 'test,encounter',
    content: 'This is test content for the encounter',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    (prisma.encounter.create as jest.Mock).mockResolvedValue(mockEncounter);
    (prisma.encounter.update as jest.Mock).mockResolvedValue(mockEncounter);
    (prisma.encounter.findUnique as jest.Mock).mockResolvedValue(mockEncounter);
  });

  describe('createEncounter', () => {
    it('should create an encounter successfully', async () => {
      const result = await createEncounter(encounterData);
      
      // Check that prisma.encounter.create was called with the correct data
      expect(prisma.encounter.create).toHaveBeenCalledWith({
        data: {
          id: 'mocked-uuid',
          name: 'Test Encounter',
          description: 'A test encounter description',
          tags: 'test,encounter',
          content: 'This is test content for the encounter'
        }
      });
      
      // Check that the function returns success and the created encounter
      expect(result).toEqual({
        success: true,
        encounter: mockEncounter
      });
    });

    it('should return an error if validation fails', async () => {
      const invalidData = { ...encounterData, name: '' };
      const result = await createEncounter(invalidData);
      
      // Check that prisma.encounter.create was not called
      expect(prisma.encounter.create).not.toHaveBeenCalled();
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Template name is required'
      });
    });

    it('should return an error if database operation fails', async () => {
      // Mock a database error
      (prisma.encounter.create as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      const result = await createEncounter(encounterData);
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Database error'
      });
    });
  });

  describe('updateEncounter', () => {
    it('should update an encounter successfully', async () => {
      const result = await updateEncounter('existing-id', encounterData);
      
      // Check that prisma.encounter.findUnique was called to verify the encounter exists
      expect(prisma.encounter.findUnique).toHaveBeenCalledWith({
        where: { id: 'existing-id' }
      });
      
      // Check that prisma.encounter.update was called with the correct data
      expect(prisma.encounter.update).toHaveBeenCalledWith({
        where: { id: 'existing-id' },
        data: {
          name: 'Test Encounter',
          description: 'A test encounter description',
          tags: 'test,encounter',
          content: 'This is test content for the encounter'
        }
      });
      
      // Check that the function returns success and the updated encounter
      expect(result).toEqual({
        success: true,
        encounter: mockEncounter
      });
    });

    it('should return an error if encounter does not exist', async () => {
      // Mock that the encounter doesn't exist
      (prisma.encounter.findUnique as jest.Mock).mockResolvedValue(null);
      
      const result = await updateEncounter('non-existent-id', encounterData);
      
      // Check that prisma.encounter.update was not called
      expect(prisma.encounter.update).not.toHaveBeenCalled();
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Encounter not found'
      });
    });

    it('should return an error if validation fails', async () => {
      const invalidData = { ...encounterData, description: '' };
      const result = await updateEncounter('existing-id', invalidData);
      
      // Check that prisma.encounter.update was not called
      expect(prisma.encounter.update).not.toHaveBeenCalled();
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Template description is required'
      });
    });

    it('should return an error if database operation fails', async () => {
      // Mock a database error
      (prisma.encounter.update as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      const result = await updateEncounter('existing-id', encounterData);
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Database error'
      });
    });
  });

  describe('getEncounter', () => {
    it('should get an encounter successfully', async () => {
      const result = await getEncounter('existing-id');
      
      // Check that prisma.encounter.findUnique was called with the correct id
      expect(prisma.encounter.findUnique).toHaveBeenCalledWith({
        where: { id: 'existing-id' }
      });
      
      // Check that the function returns success and the encounter
      expect(result).toEqual({
        success: true,
        encounter: mockEncounter
      });
    });

    it('should return an error if encounter does not exist', async () => {
      // Mock that the encounter doesn't exist
      (prisma.encounter.findUnique as jest.Mock).mockResolvedValue(null);
      
      const result = await getEncounter('non-existent-id');
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Encounter not found'
      });
    });

    it('should return an error if database operation fails', async () => {
      // Mock a database error
      (prisma.encounter.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));
      
      const result = await getEncounter('existing-id');
      
      // Check that the function returns an error
      expect(result).toEqual({
        success: false,
        error: 'Database error'
      });
    });
  });
});