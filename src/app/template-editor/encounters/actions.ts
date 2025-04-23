'use server';

import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function createEncounter(data: {
  name: string;
  description: string;
  tags: string;
  content: string;
}) {
  try {
    // Validate form data
    if (!data.name.trim()) {
      throw new Error('Template name is required');
    }

    if (!data.description.trim()) {
      throw new Error('Template description is required');
    }

    if (!data.content.trim()) {
      throw new Error('Template content is required');
    }

    // Create the encounter in the database
    const encounter = await prisma.encounter.create({
      data: {
        id: uuidv4(),
        name: data.name.trim(),
        description: data.description.trim(),
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean).join(','),
        content: data.content.trim(),
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