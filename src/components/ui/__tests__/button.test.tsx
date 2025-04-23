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
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-xs');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-base');
  });

  // Test disabled state
  it('renders correctly when disabled', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });

    // Check that the button is disabled
    expect(button).toBeDisabled();

    // Check that the button has the disabled classes
    expect(button).toHaveClass('opacity-50 cursor-not-allowed');
  });

  // Test loading state
  it('renders correctly when loading', () => {
    render(<Button isLoading>Loading</Button>);

    // Check that the loading text is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Check that the spinner is displayed
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();

    // Check that the button is disabled when loading
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Test with icons
  it('renders with left and right icons', () => {
    const leftIcon = <span data-testid="left-icon">L</span>;
    const rightIcon = <span data-testid="right-icon">R</span>;

    render(
      <Button leftIcon={leftIcon} rightIcon={rightIcon}>
        With Icons
      </Button>
    );

    // Check that the icons are displayed
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();

    // Check that the button text is displayed
    expect(screen.getByText('With Icons')).toBeInTheDocument();
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

  // Test that disabled button doesn't call onClick
  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} disabled>Click me</Button>);

    // Try to click the button
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));

    // Check that the click handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test that loading button doesn't call onClick
  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick} isLoading>Click me</Button>);

    // Try to click the button
    fireEvent.click(screen.getByRole('button'));

    // Check that the click handler was not called
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test custom className
  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>);

    // Check that the custom class is applied
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
