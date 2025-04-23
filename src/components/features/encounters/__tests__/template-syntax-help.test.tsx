import React from 'react';
import { render, screen } from '@testing-library/react';
import { TemplateSyntaxHelp } from '../template-syntax-help';

describe('TemplateSyntaxHelp Component', () => {
  it('renders the component with the correct title', () => {
    render(<TemplateSyntaxHelp />);
    
    expect(screen.getByText('Template Syntax Help')).toBeInTheDocument();
  });

  it('displays information about variables', () => {
    render(<TemplateSyntaxHelp />);
    
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText(/Use double curly braces to define a variable/)).toBeInTheDocument();
  });

  it('displays information about conditions', () => {
    render(<TemplateSyntaxHelp />);
    
    expect(screen.getByText('Conditions')).toBeInTheDocument();
    expect(screen.getByText(/Use conditions to show content only when certain criteria are met/)).toBeInTheDocument();
    
    // Check that the condition example is displayed
    const conditionExample = screen.getByText(/You sense magical energies nearby/);
    expect(conditionExample).toBeInTheDocument();
    
    const elseExample = screen.getByText(/Nothing seems out of the ordinary/);
    expect(elseExample).toBeInTheDocument();
  });

  it('displays information about options', () => {
    render(<TemplateSyntaxHelp />);
    
    expect(screen.getByText('Options')).toBeInTheDocument();
    expect(screen.getByText(/Define player choices with the options syntax/)).toBeInTheDocument();
    
    // Check that the options example is displayed
    const approachOption = screen.getByText(/Approach cautiously/);
    expect(approachOption).toBeInTheDocument();
    
    const greetingOption = screen.getByText(/Call out a greeting/);
    expect(greetingOption).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<TemplateSyntaxHelp />);
    
    // Check that the main container has the expected classes
    const container = screen.getByRole('heading', { name: 'Template Syntax Help' }).parentElement;
    expect(container).toHaveClass('bg-white', 'dark:bg-gray-800', 'shadow', 'rounded-lg', 'p-6');
    
    // Check that the prose container has the expected classes
    const proseContainer = container?.querySelector('.prose');
    expect(proseContainer).toHaveClass('dark:prose-invert', 'max-w-none');
    
    // Check that code examples have the expected classes
    const codeExamples = document.querySelectorAll('pre');
    codeExamples.forEach(example => {
      expect(example).toHaveClass('bg-gray-100', 'dark:bg-gray-900', 'p-2', 'rounded');
    });
  });
});