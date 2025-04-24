import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VariableLibraryForm } from '../variable-library-form';
import { VariableLibrary } from '@/types/variables';
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
  createVariableLibrary: jest.fn(),
  updateVariableLibrary: jest.fn(),
}));

describe('VariableLibraryForm Component', () => {
  // Test data
  const mockLibrary: VariableLibrary = {
    id: 'test-id',
    name: 'Test Library',
    description: 'A test library description',
    tags: 'test,library',
    variables: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with default values', () => {
    render(<VariableLibraryForm />);

    // Check that the form title is displayed
    expect(screen.getByText('Create Variable Library', { selector: '[data-slot="card-title"]' })).toBeInTheDocument();

    // Check that form fields are empty by default
    expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('');
    expect(screen.getByLabelText(/Tags/i)).toHaveValue('');

    // Check that submit button is present
    expect(screen.getByRole('button', { name: /Create Library/i })).toBeInTheDocument();
  });

  it('renders the form with provided values in edit mode', () => {
    render(
      <VariableLibraryForm 
        library={mockLibrary}
        isEdit={true}
      />
    );

    // Check that the form title is for editing
    expect(screen.getByText('Edit Variable Library', { selector: '[data-slot="card-title"]' })).toBeInTheDocument();

    // Check that form fields have the provided values
    expect(screen.getByLabelText(/Name/i)).toHaveValue('Test Library');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('A test library description');
    expect(screen.getByLabelText(/Tags/i)).toHaveValue('test,library');

    // Check that submit button is for updating
    expect(screen.getByRole('button', { name: /Update Library/i })).toBeInTheDocument();
  });

  it('validates form input on submission', async () => {
    render(<VariableLibraryForm />);

    // Submit the form without filling it out
    await userEvent.click(screen.getByRole('button', { name: /Create Library/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Name is required');
    });
  });

  it('validates description is required', async () => {
    render(<VariableLibraryForm />);

    // Fill out the form with name but no description
    await userEvent.type(screen.getByLabelText(/Name/i), 'Test Library');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Library/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Description is required');
    });
  });

  it('validates name length', async () => {
    render(<VariableLibraryForm />);

    // Fill out the form with a very long name
    await userEvent.type(screen.getByLabelText(/Name/i), 'a'.repeat(101));
    await userEvent.type(screen.getByLabelText(/Description/i), 'Test description');

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Library/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Name is too long');
    });
  });

  it('validates description length', async () => {
    render(<VariableLibraryForm />);

    // Fill out the form with a very long description
    await userEvent.type(screen.getByLabelText(/Name/i), 'Test Library');
    await userEvent.type(screen.getByLabelText(/Description/i), 'a'.repeat(501));

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Create Library/i }));

    // Check that validation error is shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Description is too long');
    });
  });

  it('navigates back when cancel button is clicked', async () => {
    // Clear any previous calls to mockBack
    mockBack.mockClear();

    render(<VariableLibraryForm />);

    // Click the cancel button
    await userEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    // Check that router.back was called
    expect(mockBack).toHaveBeenCalled();
  });
});
