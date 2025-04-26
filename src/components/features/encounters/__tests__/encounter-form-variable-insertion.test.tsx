import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { EncounterForm } from '../encounter-form';
import { useVariableLibraries } from '@/hooks/use-variables';

// Mock the useVariableLibraries hook
jest.mock('@/hooks/use-variables', () => ({
  useVariableLibraries: jest.fn(),
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

// Mock the onSubmit function
const mockOnSubmit = jest.fn().mockResolvedValue({ success: true });

describe('EncounterForm - Variable Insertion', () => {
  const mockLibraries = [
    {
      id: 'lib1',
      name: 'Nature',
      description: 'Nature-related variables',
      variables: [
        {
          id: 'var1',
          name: 'tree_type',
          description: 'Types of trees',
          libraryId: 'lib1',
          values: [
            { id: 'val1', text: 'oak', weight: 1, variableId: 'var1' },
            { id: 'val2', text: 'pine', weight: 1, variableId: 'var1' },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useVariableLibraries as jest.Mock).mockReturnValue({
      libraries: mockLibraries,
      isLoading: false,
      error: null,
    });
  });

  it('renders the Insert Variable button', () => {
    render(<EncounterForm onSubmit={mockOnSubmit} />);

    expect(screen.getByRole('button', { name: 'Insert Variable' })).toBeInTheDocument();
  });

  it('opens the variable selector modal when the Insert Variable button is clicked', async () => {
    render(<EncounterForm onSubmit={mockOnSubmit} />);

    // Click the Insert Variable button
    fireEvent.click(screen.getByRole('button', { name: 'Insert Variable' }));

    // Modal should be open with its title visible
    await waitFor(() => {
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });

    // Check that the modal description is visible
    expect(screen.getByTestId('dialog-description')).toBeInTheDocument();

    // Check that the modal content is visible
    expect(screen.getByPlaceholderText('Search variables...')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
  });

  it('opens the modal and allows selecting a variable', async () => {
    render(<EncounterForm onSubmit={mockOnSubmit} />);

    // Get the content textarea
    const textarea = screen.getByPlaceholderText(/As you {{movement_verb}} through/);

    // Set initial content
    fireEvent.change(textarea, { target: { value: 'The forest has trees.' } });

    // Click the Insert Variable button
    fireEvent.click(screen.getByRole('button', { name: 'Insert Variable' }));

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText('Nature')).toBeInTheDocument();
    });

    // Click on a variable to select it
    fireEvent.click(screen.getByText('tree_type'));

    // Modal should be closed after selection
    await waitFor(() => {
      expect(screen.queryByText('Nature')).not.toBeInTheDocument();
    });
  });

  it('allows selecting a different variable', async () => {
    // Mock a library with multiple variables
    (useVariableLibraries as jest.Mock).mockReturnValue({
      libraries: [
        {
          id: 'lib1',
          name: 'Nature',
          description: 'Nature-related variables',
          variables: [
            {
              id: 'var1',
              name: 'tree_type',
              description: 'Types of trees',
              libraryId: 'lib1',
              values: [
                { id: 'val1', text: 'oak', weight: 1, variableId: 'var1' },
                { id: 'val2', text: 'pine', weight: 1, variableId: 'var1' },
              ],
            },
            {
              id: 'var2',
              name: 'weather',
              description: 'Weather conditions',
              libraryId: 'lib1',
              values: [
                { id: 'val3', text: 'sunny', weight: 1, variableId: 'var2' },
                { id: 'val4', text: 'rainy', weight: 1, variableId: 'var2' },
              ],
            },
          ],
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<EncounterForm onSubmit={mockOnSubmit} />);

    // Click the Insert Variable button
    fireEvent.click(screen.getByRole('button', { name: 'Insert Variable' }));

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByText('Nature')).toBeInTheDocument();
    });

    // Verify both variables are displayed
    expect(screen.getByText('tree_type')).toBeInTheDocument();
    expect(screen.getByText('weather')).toBeInTheDocument();

    // Click on the weather variable
    fireEvent.click(screen.getByText('weather'));

    // Modal should be closed after selection
    await waitFor(() => {
      expect(screen.queryByText('Nature')).not.toBeInTheDocument();
    });
  });


  it('closes the modal when the Cancel button is clicked', async () => {
    render(<EncounterForm onSubmit={mockOnSubmit} />);

    // Click the Insert Variable button
    fireEvent.click(screen.getByRole('button', { name: 'Insert Variable' }));

    // Wait for modal to open
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search variables...')).toBeInTheDocument();
    });

    // Find the Cancel button within the dialog
    const dialogContent = screen.getByTestId('dialog-content');
    const cancelButton = within(dialogContent).getByRole('button', { name: 'Cancel' });

    // Click the Cancel button
    fireEvent.click(cancelButton);

    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Search variables...')).not.toBeInTheDocument();
    });
  });
});
