import { render, screen } from '@testing-library/react';
import { VariableLibraryCard } from '../variable-library-card';
import { VariableLibrary } from '@/types/variables';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));

describe('VariableLibraryCard', () => {
  // Test data
  const mockLibrary: VariableLibrary = {
    id: 'test-id',
    name: 'Test Library',
    description: 'A test library description',
    tags: 'test,library',
    variables: [
      {
        id: 'var-1',
        name: 'test_variable',
        description: 'A test variable',
        libraryId: 'test-id',
        values: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders the library name as a title', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    expect(screen.getByText('Test Library')).toBeInTheDocument();
  });

  it('displays the library tags', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    expect(screen.getByText('test,library')).toBeInTheDocument();
  });

  it('displays "No tags" when tags are empty', () => {
    const libraryWithoutTags = { ...mockLibrary, tags: '' };
    render(<VariableLibraryCard library={libraryWithoutTags} />);
    expect(screen.getByText('No tags')).toBeInTheDocument();
  });

  it('displays the library description', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    expect(screen.getByText('A test library description')).toBeInTheDocument();
  });

  it('displays the number of variables', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('variables')).toBeInTheDocument();
  });

  it('has a link to view the library', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    // Find all links and check if any of them have the correct href
    const links = screen.getAllByRole('link');
    const viewLibraryLink = links.find(link => 
      link.getAttribute('href') === `/content-database/variables/${mockLibrary.id}`
    );
    expect(viewLibraryLink).toBeInTheDocument();
  });

  it('has a clickable title that links to the library', () => {
    render(<VariableLibraryCard library={mockLibrary} />);
    const titleLink = screen.getByText('Test Library').closest('a');
    expect(titleLink).toHaveAttribute('href', '/content-database/variables/test-id');
  });
});
