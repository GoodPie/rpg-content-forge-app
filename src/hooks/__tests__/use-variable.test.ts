import { renderHook, waitFor } from '@testing-library/react';
import { useVariable } from '../use-variable';
import { getVariableLibrary } from '@/app/content-database/variables/actions';

// Mock the getVariableLibrary function
jest.mock('@/app/content-database/variables/actions', () => ({
  getVariableLibrary: jest.fn(),
}));

describe('useVariable', () => {
  const mockLibrary = {
    id: 'lib-1',
    name: 'Test Library',
    description: 'A test library',
    variables: [
      {
        id: 'var-1',
        name: 'test_variable',
        description: 'A test variable',
        libraryId: 'lib-1',
        values: [],
      },
      {
        id: 'var-2',
        name: 'another_variable',
        description: 'Another test variable',
        libraryId: 'lib-1',
        values: [],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the library and finds the variable', async () => {
    // Mock successful response
    (getVariableLibrary as jest.Mock).mockResolvedValue({
      success: true,
      data: mockLibrary,
    });

    const { result } = renderHook(() => useVariable('lib-1', 'var-1'));

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.library).toBeNull();
    expect(result.current.variable).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check the results
    expect(result.current.library).toEqual(mockLibrary);
    expect(result.current.variable).toEqual(mockLibrary.variables[0]);
    expect(result.current.error).toBeNull();
    expect(getVariableLibrary).toHaveBeenCalledWith('lib-1');
  });

  it('handles variable not found', async () => {
    // Mock successful response but variable not found
    (getVariableLibrary as jest.Mock).mockResolvedValue({
      success: true,
      data: mockLibrary,
    });

    const { result } = renderHook(() => useVariable('lib-1', 'non-existent-id'));

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check the results
    expect(result.current.library).toEqual(mockLibrary);
    expect(result.current.variable).toBeNull();
    expect(result.current.error).toBe('Variable not found in this library');
  });

  it('handles API error', async () => {
    // Mock error response
    (getVariableLibrary as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Failed to fetch library',
    });

    const { result } = renderHook(() => useVariable('lib-1', 'var-1'));

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check the results
    expect(result.current.library).toBeNull();
    expect(result.current.variable).toBeNull();
    expect(result.current.error).toBe('Failed to fetch library');
  });

  it('handles exception', async () => {
    // Mock exception
    (getVariableLibrary as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useVariable('lib-1', 'var-1'));

    // Wait for the hook to finish
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Check the results
    expect(result.current.library).toBeNull();
    expect(result.current.variable).toBeNull();
    expect(result.current.error).toBe('Network error');
  });
});