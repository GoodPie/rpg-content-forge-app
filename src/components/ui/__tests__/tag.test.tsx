import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tag } from '@/components/ui/tag';

describe('Tag Component', () => {
  it('renders with default styling', () => {
    render(<Tag>Default Tag</Tag>);
    const tag = screen.getByText('Default Tag');
    expect(tag).toBeInTheDocument();
  });

  it('applies color variants correctly', () => {
    const { rerender } = render(<Tag color="red">Red Tag</Tag>);
    let tag = screen.getByText('Red Tag');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-red-100');
    
    rerender(<Tag color="green">Green Tag</Tag>);
    tag = screen.getByText('Green Tag');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-green-100');
    
    rerender(<Tag color="blue">Blue Tag</Tag>);
    tag = screen.getByText('Blue Tag');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-blue-100');
  });

  it('applies variant styling correctly', () => {
    const { rerender } = render(<Tag variant="default">Default Variant</Tag>);
    let tag = screen.getByText('Default Variant');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-primary');
    
    rerender(<Tag variant="secondary">Secondary Variant</Tag>);
    tag = screen.getByText('Secondary Variant');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-secondary');
    
    rerender(<Tag variant="destructive">Destructive Variant</Tag>);
    tag = screen.getByText('Destructive Variant');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-destructive');
  });

  it('combines variant and color styling correctly', () => {
    render(<Tag variant="secondary" color="blue">Combined Styling</Tag>);
    const tag = screen.getByText('Combined Styling');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('bg-secondary');
    expect(tag.className).toContain('bg-blue-100');
  });

  it('applies custom className correctly', () => {
    render(<Tag className="custom-class">Custom Class</Tag>);
    const tag = screen.getByText('Custom Class');
    expect(tag).toBeInTheDocument();
    expect(tag.className).toContain('custom-class');
  });
});