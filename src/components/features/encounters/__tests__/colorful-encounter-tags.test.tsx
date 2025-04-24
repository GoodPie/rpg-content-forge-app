import React from 'react';
import { render, screen } from '@testing-library/react';
import { ColorfulEncounterTags, ColorfulTagData } from '@/components/features/encounters/colorful-encounter-tags';

describe('ColorfulEncounterTags Component', () => {
  it('renders tags with automatic color assignment', () => {
    const tags = ['forest', 'combat', 'quest'];
    render(<ColorfulEncounterTags tags={tags} />);
    
    // Check that all tags are rendered
    expect(screen.getByText('forest')).toBeInTheDocument();
    expect(screen.getByText('combat')).toBeInTheDocument();
    expect(screen.getByText('quest')).toBeInTheDocument();
  });

  it('applies custom gap and className', () => {
    const tags = ['forest', 'combat'];
    const { container } = render(
      <ColorfulEncounterTags 
        tags={tags} 
        gap="gap-3" 
        className="custom-class" 
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('gap-3');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies variant to all tags', () => {
    const tags = ['forest', 'combat'];
    render(<ColorfulEncounterTags tags={tags} variant="secondary" />);
    
    // Both tags should have the secondary variant styling
    const forestTag = screen.getByText('forest');
    const combatTag = screen.getByText('combat');
    
    expect(forestTag.className).toContain('bg-secondary');
    expect(combatTag.className).toContain('bg-secondary');
  });

  it('returns null when tags array is empty', () => {
    const { container } = render(<ColorfulEncounterTags tags={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('ColorfulTagData Component', () => {
  it('renders TagData objects with automatic color assignment', () => {
    const tags = [
      { id: '1', name: 'forest' },
      { id: '2', name: 'combat' },
      { id: '3', name: 'quest' }
    ];
    
    render(<ColorfulTagData tags={tags} />);
    
    // Check that all tags are rendered
    expect(screen.getByText('forest')).toBeInTheDocument();
    expect(screen.getByText('combat')).toBeInTheDocument();
    expect(screen.getByText('quest')).toBeInTheDocument();
  });

  it('applies custom gap and className', () => {
    const tags = [
      { id: '1', name: 'forest' },
      { id: '2', name: 'combat' }
    ];
    
    const { container } = render(
      <ColorfulTagData 
        tags={tags} 
        gap="gap-3" 
        className="custom-class" 
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('gap-3');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies variant to all tags', () => {
    const tags = [
      { id: '1', name: 'forest' },
      { id: '2', name: 'combat' }
    ];
    
    render(<ColorfulTagData tags={tags} variant="secondary" />);
    
    // Both tags should have the secondary variant styling
    const forestTag = screen.getByText('forest');
    const combatTag = screen.getByText('combat');
    
    expect(forestTag.className).toContain('bg-secondary');
    expect(combatTag.className).toContain('bg-secondary');
  });

  it('returns null when tags array is empty', () => {
    const { container } = render(<ColorfulTagData tags={[]} />);
    expect(container.firstChild).toBeNull();
  });
});