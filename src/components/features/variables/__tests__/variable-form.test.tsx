import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VariableForm } from '../variable-form';
import { Variable } from '@/types/variables';
import { toast } from 'sonner';

// Mock Next.js router
const mockBack = jest.fn();
const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
    refresh: mockRefresh,
  }),
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock server actions
jest.mock('@/app/content-database/variables/actions', () => ({
  createVariable: jest.fn(),
  updateVariable: jest.fn(),
}));

describe('VariableForm Component', () => {
  // Test data
  const mockVariable: Variable = {
    id: 'test-id',
    name: 'test_variable',
    description: 'A test variable description',
    libraryId: 'library-id',
    values: [],
  };

  const mockLibraryId = 'library-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with default values', () => {
    render(<VariableForm libraryId={mockLibraryId} />);

    // Check that the form title is displayed
    expect(screen.getByText('Create Variable', { selector: '[data-slot="card-title"]' })).toBeInTheDocument();

    // Check that form fields are empty by default
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');

    // Check that submit button is present
    expect(screen.getByRole('button', { name: /Create Variable/i })).toBeInTheDocument();
  });

  it('renders the form with provided values in edit mode', () => {
    render(
      <VariableForm 
        variable={mockVariable}
        libraryId={mockLibraryId}
        isEdit={true}
      />
    );

    // Check that the form title is for editing
    expect(screen.getByText('Edit Variable', { selector: '[data-slot="card-title"]' })).toBeInTheDocument();

    // Check that form fields have the provided values
    expect(screen.getByLabelText(/Name/i)).toHaveValue('test_variable');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A test variable description');

    // Check that submit button is for updating
    expect(screen.getByRole('button', { name: /Update Variable/i })).toBeInTheDocument();
  });

  it('validates form input on submission', async () => {
    render(<VariableForm libraryId={mockLibraryId} />);

    // Submit the form without filling it out
    await userEvent.click(screen.getByRole('button', { name: /Create Variable/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Name is required');
    });
  });

  it('validates variable name format', async () => {
    render(<VariableForm libraryId={mockLibraryId} />);

    // Fill out the form with invalid name (starting with a number)
    await userEvent.type(screen.getByLabelText(/Name/i), '123invalid');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Variable/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Name must start with a letter and contain only letters, numbers, and underscores');
    });
  });

  it('shows usage example based on variable name', async () => {
    render(<VariableForm libraryId={mockLibraryId} />);

    // Type a variable name
    await userEvent.type(screen.getByLabelText(/Name/i), 'forest_state');

    // Check that the usage example is updated
    expect(screen.getByText(/{{forest_state}}/)).toBeInTheDocument();
  });

  it('navigates back when cancel button is clicked', async () => {
    // Clear any previous calls to mockBack
    mockBack.mockClear();

    render(<VariableForm libraryId={mockLibraryId} />);

    // Click the cancel button
    await userEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    // Check that router.back was called
    expect(mockBack).toHaveBeenCalled();
  });
});
