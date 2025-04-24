import React from 'react';
import { render, screen } from '@testing-library/react';
import EncounterTag from '@/components/features/encounters/encounter-tag';

describe('EncounterTag Component', () => {
  it('renders tag text correctly', () => {
    render(<EncounterTag tag="forest" />);
    const tag = screen.getByText('forest');
    expect(tag).toBeInTheDocument();
  });

  it('applies color variants correctly', () => {
    const { rerender } = render(<EncounterTag tag="combat" color="red" />);
    let tag = screen.getByText('combat');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-red-100');
    
    rerender(<EncounterTag tag="quest" color="green" />);
    tag = screen.getByText('quest');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-green-100');
    
    rerender(<EncounterTag tag="npc" color="blue" />);
    tag = screen.getByText('npc');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-blue-100');
  });

  it('applies variant styling correctly', () => {
    const { rerender } = render(<EncounterTag tag="forest" variant="default" />);
    let tag = screen.getByText('forest');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-primary');
    
    rerender(<EncounterTag tag="forest" variant="secondary" />);
    tag = screen.getByText('forest');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-secondary');
  });

  it('combines variant and color styling correctly', () => {
    render(<EncounterTag tag="forest" variant="secondary" color="blue" />);
    const tag = screen.getByText('forest');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-secondary');
    expect(tag.className).toContain('bg-blue-100');
  });

  it('applies custom className correctly', () => {
    render(<EncounterTag tag="forest" className="custom-class" />);
    const tag = screen.getByText('forest');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('custom-class');
  });
});