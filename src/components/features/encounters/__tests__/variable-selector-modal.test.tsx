import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VariableSelectorModal } from '../variable-selector-modal';
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

describe('VariableSelectorModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectVariable = jest.fn();

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
    {
      id: 'lib2',
      name: 'Characters',
      description: 'Character-related variables',
      variables: [
        {
          id: 'var3',
          name: 'character_type',
          description: 'Types of characters',
          libraryId: 'lib2',
          values: [
            { id: 'val5', text: 'warrior', weight: 1, variableId: 'var3' },
            { id: 'val6', text: 'mage', weight: 1, variableId: 'var3' },
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

  it('renders the modal when isOpen is true', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.getByText('Insert Variable')).toBeInTheDocument();
    expect(screen.getByText('Select a variable from your libraries to insert into your template.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search variables...')).toBeInTheDocument();
    expect(screen.getByTestId('modal-content-container')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <VariableSelectorModal
        isOpen={false}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.queryByText('Insert Variable')).not.toBeInTheDocument();
  });

  it('displays libraries as tabs', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.getByText('Nature')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
  });

  it('displays variables for the selected library', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    // First library should be selected by default
    expect(screen.getByText('tree_type')).toBeInTheDocument();
    expect(screen.getByText('weather')).toBeInTheDocument();

    // Switch to second library
    fireEvent.click(screen.getByText('Characters'));

    // Should show variables from second library
    expect(screen.getByText('character_type')).toBeInTheDocument();
  });

  it('filters variables based on search term', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search variables...');
    fireEvent.change(searchInput, { target: { value: 'weather' } });

    // Should only show weather variable
    expect(screen.getByText('weather')).toBeInTheDocument();
    expect(screen.queryByText('tree_type')).not.toBeInTheDocument();
  });

  it('calls onSelectVariable with the variable name when a variable is clicked', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    fireEvent.click(screen.getByText('tree_type'));

    expect(mockOnSelectVariable).toHaveBeenCalledWith('tree_type');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when the Cancel button is clicked', () => {
    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays loading state when libraries are loading', () => {
    (useVariableLibraries as jest.Mock).mockReturnValue({
      libraries: [],
      isLoading: true,
      error: null,
    });

    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.getByText('Loading variable libraries...')).toBeInTheDocument();
  });

  it('displays error state when there is an error', () => {
    (useVariableLibraries as jest.Mock).mockReturnValue({
      libraries: [],
      isLoading: false,
      error: 'Failed to load libraries',
    });

    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.getByText('Failed to load libraries')).toBeInTheDocument();
  });

  it('displays empty state when there are no libraries', () => {
    (useVariableLibraries as jest.Mock).mockReturnValue({
      libraries: [],
      isLoading: false,
      error: null,
    });

    render(
      <VariableSelectorModal
        isOpen={true}
        onClose={mockOnClose}
        onSelectVariable={mockOnSelectVariable}
      />
    );

    expect(screen.getByText('No variable libraries found. Create a variable library first.')).toBeInTheDocument();
  });
});
