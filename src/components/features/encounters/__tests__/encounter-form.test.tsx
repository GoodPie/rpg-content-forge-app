import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EncounterForm } from '../encounter-form';
import { EncounterData } from '@/app/template-editor/encounters/types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the UI components
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }) => open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({ children }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }) => <h2 data-testid="dialog-title">{children}</h2>,
  DialogDescription: ({ children }) => <p data-testid="dialog-description">{children}</p>,
  DialogFooter: ({ children }) => <div data-testid="dialog-footer">{children}</div>,
}));

jest.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children }) => <div data-testid="scroll-area">{children}</div>,
}));

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, value, onValueChange }) => (
    <div data-testid="tabs" data-value={value} onClick={(e) => onValueChange && onValueChange(e.currentTarget.dataset.value || '')}>
      {children}
    </div>
  ),
  TabsList: ({ children }) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }) => <div data-testid="tabs-trigger" data-value={value}>{children}</div>,
  TabsContent: ({ children, value }) => <div data-testid="tabs-content" data-value={value}>{children}</div>,
}));

// Mock the useVariableLibraries hook
jest.mock('@/hooks/use-variables', () => ({
  useVariableLibraries: jest.fn().mockReturnValue({
    libraries: [],
    isLoading: false,
    error: null,
  }),
}));

// Mock the variable-utils
jest.mock('@/lib/variable-utils', () => ({
  filterVariablesBySearchTerm: (variables, searchTerm) => {
    if (!searchTerm) return variables;
    return variables.filter(variable => 
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (variable.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }
}));

describe('EncounterForm Component', () => {
  // Test data
  const defaultEncounterData: EncounterData = {
    name: 'Test Encounter',
    description: 'A test encounter description',
    tags: 'test,encounter',
    content: 'This is test content for the encounter'
  };

  // Mock submit function
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockReset();
    mockSubmit.mockImplementation(() => Promise.resolve({ success: true }));
  });

  it('renders the form with default values', () => {
    render(<EncounterForm onSubmit={mockSubmit} />);

    // Check that the form title is displayed
    expect(screen.getByText('New Encounter Template')).toBeInTheDocument();

    // Check that form fields are empty by default
    expect(screen.getByLabelText(/Template Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Tags/i)).toHaveValue('');
    expect(screen.getByLabelText(/Template Content/i)).toHaveValue('');

    // Check that submit button is present
    expect(screen.getByRole('button', { name: /Create Template/i })).toBeInTheDocument();
  });

  it('renders the form with provided values in edit mode', () => {
    render(
      <EncounterForm 
        onSubmit={mockSubmit} 
        defaultValues={defaultEncounterData}
        isEditing={true}
        encounterId="test-id"
      />
    );

    // Check that the form title is for editing
    expect(screen.getByText('Edit Encounter Template')).toBeInTheDocument();

    // Check that form fields have the provided values
    expect(screen.getByLabelText(/Template Name/i)).toHaveValue('Test Encounter');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A test encounter description');
    expect(screen.getByLabelText(/Tags/i)).toHaveValue('test,encounter');
    expect(screen.getByLabelText(/Template Content/i)).toHaveValue('This is test content for the encounter');

    // Check that submit button is for updating
    expect(screen.getByRole('button', { name: /Update Template/i })).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    render(<EncounterForm onSubmit={mockSubmit} isLoading={true} />);

    // Check that loading message is displayed
    expect(screen.getByText('Loading encounter data...')).toBeInTheDocument();

    // Check that form is not rendered
    expect(screen.queryByText('New Encounter Template')).not.toBeInTheDocument();
  });

  it('submits the form with entered values', async () => {
    render(<EncounterForm onSubmit={mockSubmit} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/Template Name/i), 'New Test Encounter');
    await userEvent.type(screen.getByLabelText(/Description/i), 'A new test description');
    await userEvent.type(screen.getByLabelText(/Tags/i), 'new,test');
    await userEvent.type(screen.getByLabelText(/Template Content/i), 'New test content');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    // Check that onSubmit was called with the correct values
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'New Test Encounter',
        description: 'A new test description',
        tags: 'new,test',
        content: 'New test content'
      });
    });
  });

  it('shows success message after successful submission', async () => {
    render(<EncounterForm onSubmit={mockSubmit} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/Template Name/i), 'Test Encounter');
    await userEvent.type(screen.getByLabelText(/Description/i), 'Test description');
    await userEvent.type(screen.getByLabelText(/Content/i), 'Test content');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    // Check that success message is displayed
    await waitFor(() => {
      expect(screen.getByText('Template Created!')).toBeInTheDocument();
      expect(screen.getByText('Your encounter template has been created successfully.')).toBeInTheDocument();
    });

    // Check that "Create Another" button is displayed
    expect(screen.getByRole('button', { name: /Create Another/i })).toBeInTheDocument();
  });

  it('shows error message when submission fails', async () => {
    // Mock a failed submission
    mockSubmit.mockImplementation(() => Promise.resolve({ 
      success: false, 
      error: 'Failed to create encounter' 
    }));

    render(<EncounterForm onSubmit={mockSubmit} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/Template Name/i), 'Test Encounter');
    await userEvent.type(screen.getByLabelText(/Description/i), 'Test description');
    await userEvent.type(screen.getByLabelText(/Content/i), 'Test content');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    // Check that error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to create encounter')).toBeInTheDocument();
    });

    // Check that form is still displayed
    expect(screen.getByLabelText(/Template Name/i)).toBeInTheDocument();
  });

  it('resets the form when "Create Another" is clicked after success', async () => {
    render(<EncounterForm onSubmit={mockSubmit} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/Template Name/i), 'Test Encounter');
    await userEvent.type(screen.getByLabelText(/Description/i), 'Test description');
    await userEvent.type(screen.getByLabelText(/Content/i), 'Test content');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Template/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText('Template Created!')).toBeInTheDocument();
    });

    // Click "Create Another" button
    await userEvent.click(screen.getByRole('button', { name: /Create Another/i }));

    // Check that form is reset and displayed again
    await waitFor(() => {
      expect(screen.getByText('New Encounter Template')).toBeInTheDocument();
      expect(screen.getByLabelText(/Template Name/i)).toHaveValue('');
      expect(screen.getByLabelText(/Description/i)).toHaveValue('');
      expect(screen.getByLabelText(/Tags/i)).toHaveValue('');
      expect(screen.getByLabelText(/Template Content/i)).toHaveValue('');
    });
  });

  it('shows different success message and buttons in edit mode', async () => {
    render(
      <EncounterForm 
        onSubmit={mockSubmit} 
        defaultValues={defaultEncounterData}
        isEditing={true}
        encounterId="test-id"
      />
    );

    // Submit the form without changes
    await userEvent.click(screen.getByRole('button', { name: /Update Template/i }));

    // Check that success message for editing is displayed
    await waitFor(() => {
      expect(screen.getByText('Template Updated!')).toBeInTheDocument();
      expect(screen.getByText('Your encounter template has been updated successfully.')).toBeInTheDocument();
    });

    // Check that "View Template" button is displayed instead of "Create Another"
    expect(screen.getByRole('link', { name: /View Template/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Create Another/i })).not.toBeInTheDocument();
  });
});
