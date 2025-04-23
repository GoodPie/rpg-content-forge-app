import { createEncounter, updateEncounter, getEncounter } from '../actions';
import { prisma } from '@/lib/prisma';
import { EncounterData, TagData } from '../types';


// Mock the prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    encounter: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn()
    },
    encounterTag: {
      deleteMany: jest.fn()
    },
    tag: {
      create: jest.fn(),
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

  // Mock tag data
  const mockTags: TagData[] = [
    { id: 'tag-1', name: 'test' },
    { id: 'tag-2', name: 'encounter' }
  ];

  // Mock encounter with tags relation
  const mockEncounterWithTags = {
    id: 'encounter-1',
    name: 'Test Encounter',
    description: 'A test encounter description',
    content: 'This is test content for the encounter',
    tags: [
      { tag: { id: 'tag-1', name: 'test' } },
      { tag: { id: 'tag-2', name: 'encounter' } }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Mock transformed encounter (matches our Encounter interface)
  const mockTransformedEncounter = {
    id: 'encounter-1',
    name: 'Test Encounter',
    description: 'A test encounter description',
    content: 'This is test content for the encounter',
    tags: mockTags
  };

  beforeEach(() => {
    // Only clear mocks in test environment
    if (process.env.NODE_ENV === 'test') {
      jest.clearAllMocks();
    }

    // Default mock implementations
    (prisma.encounter.create as jest.Mock).mockResolvedValue(mockEncounterWithTags);
    (prisma.encounter.update as jest.Mock).mockResolvedValue(mockEncounterWithTags);
    (prisma.encounter.findUnique as jest.Mock).mockResolvedValue(mockEncounterWithTags);
  });

  describe('createEncounter', () => {
    it('should create an encounter successfully', async () => {
      const result = await createEncounter(encounterData);

      // Check that prisma.encounter.create was called with the correct data
      expect(prisma.encounter.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Encounter',
          description: 'A test encounter description',
          content: 'This is test content for the encounter',
          tags: {
            create: [
              {
                tag: {
                  connectOrCreate: {
                    where: { name: 'test' },
                    create: { name: 'test' }
                  }
                }
              },
              {
                tag: {
                  connectOrCreate: {
                    where: { name: 'encounter' },
                    create: { name: 'encounter' }
                  }
                }
              }
            ]
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

      // Check that the function returns success and the transformed encounter
      expect(result).toEqual({
        success: true,
        encounter: mockTransformedEncounter
      });

      // Verify that the tags are correctly created and associated with the encounter
      const createCall = (prisma.encounter.create as jest.Mock).mock.calls[0][0];
      const tagCreations = createCall.data.tags.create;

      // Check that the correct number of tags are created
      expect(tagCreations.length).toBe(2);

      // Check that each tag is correctly configured for creation or connection
      expect(tagCreations[0].tag.connectOrCreate.where.name).toBe('test');
      expect(tagCreations[0].tag.connectOrCreate.create.name).toBe('test');
      expect(tagCreations[1].tag.connectOrCreate.where.name).toBe('encounter');
      expect(tagCreations[1].tag.connectOrCreate.create.name).toBe('encounter');

      // Verify the transformed encounter has the correct tags
      expect(result.encounter?.tags).toEqual(mockTags);
      expect(result.encounter?.tags.length).toBe(2);
      expect(result.encounter?.tags[0].name).toBe('test');
      expect(result.encounter?.tags[1].name).toBe('encounter');
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

    it('should return an error if too many tags are provided', async () => {
      // Create a string with more than MAX_TAGS_PER_ENCOUNTER tags
      const tooManyTags = Array(21).fill(0).map((_, i) => `tag${i}`).join(',');
      const invalidData = { ...encounterData, tags: tooManyTags };

      const result = await createEncounter(invalidData);

      // Check that prisma.encounter.create was not called
      expect(prisma.encounter.create).not.toHaveBeenCalled();

      // Check that the function returns an error about too many tags
      expect(result).toEqual({
        success: false,
        error: 'Too many tags. Maximum 20 tags allowed.'
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
      // Mock existing encounter with different tags to test the optimization
      const mockExistingEncounter = {
        ...mockEncounterWithTags,
        tags: [
          { tag: { id: 'tag-1', name: 'test' } },
          { tag: { id: 'tag-3', name: 'old-tag' } } // This tag will be removed
        ]
      };
      (prisma.encounter.findUnique as jest.Mock).mockResolvedValue(mockExistingEncounter);

      const result = await updateEncounter('existing-id', encounterData);

      // Check that prisma.encounter.findUnique was called to verify the encounter exists
      expect(prisma.encounter.findUnique).toHaveBeenCalledWith({
        where: { id: 'existing-id' },
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      });

      // Check that only the necessary tag relationships are deleted
      expect(prisma.encounterTag.deleteMany).toHaveBeenCalledWith({
        where: { 
          AND: [
            { encounterId: 'existing-id' },
            { tagId: { in: ['tag-3'] } } // Only the old-tag should be removed
          ]
        }
      });

      // Verify the delete call contains the correct conditions
      const deleteCall = (prisma.encounterTag.deleteMany as jest.Mock).mock.calls[0][0];
      expect(deleteCall.where.AND).toBeDefined();
      expect(deleteCall.where.AND[0].encounterId).toBe('existing-id');
      expect(deleteCall.where.AND[1].tagId.in).toContain('tag-3');

      // Check that prisma.encounter.update was called with the correct data
      // Only the new tag 'encounter' should be created
      expect(prisma.encounter.update).toHaveBeenCalledWith({
        where: { id: 'existing-id' },
        data: {
          name: 'Test Encounter',
          description: 'A test encounter description',
          content: 'This is test content for the encounter',
          tags: {
            create: [
              {
                tag: {
                  connectOrCreate: {
                    where: { name: 'encounter' },
                    create: { name: 'encounter' }
                  }
                }
              }
            ]
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

      // Check that the function returns success and the transformed encounter
      expect(result).toEqual({
        success: true,
        encounter: mockTransformedEncounter
      });

      // Verify that the tags are correctly updated and associated with the encounter
      const updateCall = (prisma.encounter.update as jest.Mock).mock.calls[0][0];
      const tagCreations = updateCall.data.tags.create;

      // Check that only the new tag is created
      expect(tagCreations.length).toBe(1);
      expect(tagCreations[0].tag.connectOrCreate.where.name).toBe('encounter');
      expect(tagCreations[0].tag.connectOrCreate.create.name).toBe('encounter');

      // Verify the transformed encounter has the correct tags
      expect(result.encounter?.tags).toEqual(mockTags);
      expect(result.encounter?.tags.length).toBe(2);
      expect(result.encounter?.tags[0].name).toBe('test');
      expect(result.encounter?.tags[1].name).toBe('encounter');
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

    it('should return an error if too many tags are provided', async () => {
      // Create a string with more than MAX_TAGS_PER_ENCOUNTER tags
      const tooManyTags = Array(21).fill(0).map((_, i) => `tag${i}`).join(',');
      const invalidData = { ...encounterData, tags: tooManyTags };

      const result = await updateEncounter('existing-id', invalidData);

      // Check that prisma.encounter.update was not called
      expect(prisma.encounter.update).not.toHaveBeenCalled();

      // Check that the function returns an error about too many tags
      expect(result).toEqual({
        success: false,
        error: 'Too many tags. Maximum 20 tags allowed.'
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

      // Check that prisma.encounter.findUnique was called with the correct id and includes tags
      expect(prisma.encounter.findUnique).toHaveBeenCalledWith({
        where: { id: 'existing-id' },
        include: {
          tags: {
            include: {
              tag: true
            }
          }
        }
      });

      // Check that the function returns success and the transformed encounter
      expect(result).toEqual({
        success: true,
        encounter: mockTransformedEncounter
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
