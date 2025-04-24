import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button Component', () => {
  // Test rendering with default props
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });

    // Check that the button is in the document
    expect(button).toBeInTheDocument();

    // Check that the button has the primary variant classes
    expect(button).toHaveClass('bg-(--primary)');

    // Check that the button has the medium size classes
    expect(button).toHaveClass('px-4');

    // Check that the button is not disabled
    expect(button).not.toBeDisabled();
  });

  // Test rendering with different variants
  it('renders with the correct variant classes', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-(--primary)');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-(--secondary)');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-(--accent)');
  });

  // Test rendering with different sizes
  it('renders with the correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
    expect(screen.getByRole('button')).toHaveClass('px-3');

    rerender(<Button size="default">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');
    expect(screen.getByRole('button')).toHaveClass('px-4');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');
    expect(screen.getByRole('button')).toHaveClass('px-6');
  });


  // Test click handler
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    // Click the button
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));

    // Check that the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });



  // Test custom className
  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>);

    // Check that the custom class is applied
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
