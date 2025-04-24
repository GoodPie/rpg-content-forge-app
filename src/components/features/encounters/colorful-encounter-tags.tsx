import React from 'react';
import EncounterTag from './encounter-tag';
import { TagData } from '@/app/template-editor/encounters/types';

export interface ColorfulEncounterTagsProps {
  /**
   * Array of tag strings to display
   */
  tags: string[];
  /**
   * Optional className for the container
   */
  className?: string;
  /**
   * Optional variant for all tags
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Optional gap between tags
   */
  gap?: string;
}

/**
 * Component for rendering a list of encounter tags with automatic color assignment
 * 
 * @example
 * ```tsx
 * <ColorfulEncounterTags tags={['forest', 'combat', 'quest']} />
 * <ColorfulEncounterTags 
 *   tags={['forest', 'combat', 'quest']} 
 *   variant="secondary" 
 *   gap="gap-2" 
 * />
 * ```
 */
export const ColorfulEncounterTags: React.FC<ColorfulEncounterTagsProps> = ({
  tags,
  className = '',
  variant,
  gap = 'gap-1',
}) => {
  if (!tags || tags.length === 0) return null;

  // Predefined colors for visual variety
  const colors = ["red", "green", "blue", "yellow", "purple", "gray"];

  return (
    <div className={`flex flex-wrap ${gap} ${className}`}>
      {tags.map((tag) => {
        // Assign different colors based on tag content for visual variety
        const colorIndex = tag.length % colors.length;
        return (
          <EncounterTag 
            key={tag} 
            tag={tag} 
            color={colors[colorIndex] as any}
            variant={variant}
          />
        );
      })}
    </div>
  );
};

/**
 * Component for rendering a list of TagData objects with automatic color assignment
 */
export interface ColorfulTagDataProps {
  /**
   * Array of TagData objects to display
   */
  tags: TagData[];
  /**
   * Optional className for the container
   */
  className?: string;
  /**
   * Optional variant for all tags
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  /**
   * Optional gap between tags
   */
  gap?: string;
}

/**
 * Component for rendering a list of TagData objects with automatic color assignment
 * 
 * @example
 * ```tsx
 * <ColorfulTagData tags={[{id: '1', name: 'forest'}, {id: '2', name: 'combat'}]} />
 * ```
 */
export const ColorfulTagData: React.FC<ColorfulTagDataProps> = ({
  tags,
  className = '',
  variant,
  gap = 'gap-1',
}) => {
  if (!tags || tags.length === 0) return null;

  // Predefined colors for visual variety
  const colors = ["red", "green", "blue", "yellow", "purple", "gray"];

  return (
    <div className={`flex flex-wrap ${gap} ${className}`}>
      {tags.map((tag) => {
        // Assign different colors based on tag content for visual variety
        const colorIndex = tag.name.length % colors.length;
        return (
          <EncounterTag 
            key={tag.id} 
            tag={tag.name} 
            color={colors[colorIndex] as any}
            variant={variant}
          />
        );
      })}
    </div>
  );
};