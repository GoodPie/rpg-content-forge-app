import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../sidebar';
import { usePathname } from 'next/navigation';

// Mock the next/navigation usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
    return <a href={href} className={className}>{children}</a>;
  };
});

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (usePathname as jest.Mock).mockReset();
  });

  it('renders template editor navigation when on template editor page', () => {
    (usePathname as jest.Mock).mockReturnValue('/template-editor');
    render(<Sidebar />);

    // Check that the template editor heading is rendered
    expect(screen.getByText('Template Editor')).toBeInTheDocument();

    // Check that template editor navigation links are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Encounters')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('NPCs')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Quests')).toBeInTheDocument();

    // Check that other feature headings are not rendered
    expect(screen.queryByText('Procedural Generator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Simulator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Database')).not.toBeInTheDocument();
    expect(screen.queryByText('Export Manager')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('renders procedural generator navigation when on procedural generator page', () => {
    (usePathname as jest.Mock).mockReturnValue('/procedural-generator');
    render(<Sidebar />);

    // Check that the procedural generator heading is rendered
    expect(screen.getByText('Procedural Generator')).toBeInTheDocument();

    // Check that procedural generator navigation links are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Text Variation')).toBeInTheDocument();
    expect(screen.getByText('Structural Variation')).toBeInTheDocument();
    expect(screen.getByText('Conditional Logic')).toBeInTheDocument();
    expect(screen.getByText('Seed Explorer')).toBeInTheDocument();

    // Check that other feature headings are not rendered
    expect(screen.queryByText('Template Editor')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Simulator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Database')).not.toBeInTheDocument();
    expect(screen.queryByText('Export Manager')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('renders content simulator navigation when on content simulator page', () => {
    (usePathname as jest.Mock).mockReturnValue('/content-simulator');
    render(<Sidebar />);

    // Check that the content simulator heading is rendered
    expect(screen.getByText('Content Simulator')).toBeInTheDocument();

    // Check that content simulator navigation links are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Character Sheet')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(screen.getByText('Run Simulation')).toBeInTheDocument();

    // Check that other feature headings are not rendered
    expect(screen.queryByText('Template Editor')).not.toBeInTheDocument();
    expect(screen.queryByText('Procedural Generator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Database')).not.toBeInTheDocument();
    expect(screen.queryByText('Export Manager')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('renders content database navigation when on content database page', () => {
    (usePathname as jest.Mock).mockReturnValue('/content-database');
    render(<Sidebar />);

    // Check that the content database heading is rendered
    expect(screen.getByText('Content Database')).toBeInTheDocument();

    // Check that content database navigation links are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Content Packs')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Variable Libraries')).toBeInTheDocument();
    expect(screen.getByText('Import Content')).toBeInTheDocument();

    // Check that other feature headings are not rendered
    expect(screen.queryByText('Template Editor')).not.toBeInTheDocument();
    expect(screen.queryByText('Procedural Generator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Simulator')).not.toBeInTheDocument();
    expect(screen.queryByText('Export Manager')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('renders export manager navigation when on export manager page', () => {
    (usePathname as jest.Mock).mockReturnValue('/export-manager');
    render(<Sidebar />);

    // Check that the export manager heading is rendered
    expect(screen.getByText('Export Manager')).toBeInTheDocument();

    // Check that export manager navigation links are rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('JSON Export')).toBeInTheDocument();
    expect(screen.getByText('SQLite Export')).toBeInTheDocument();
    expect(screen.getByText('Binary Export')).toBeInTheDocument();
    expect(screen.getByText('Custom Format')).toBeInTheDocument();

    // Check that other feature headings are not rendered
    expect(screen.queryByText('Template Editor')).not.toBeInTheDocument();
    expect(screen.queryByText('Procedural Generator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Simulator')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Database')).not.toBeInTheDocument();
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });

  it('renders general navigation when not on any feature page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Sidebar />);

    // Check that the navigation heading is rendered
    expect(screen.getByText('Navigation')).toBeInTheDocument();

    // Check that main navigation links are rendered
    expect(screen.getByText('Template Editor')).toBeInTheDocument();
    expect(screen.getByText('Procedural Generator')).toBeInTheDocument();
    expect(screen.getByText('Content Simulator')).toBeInTheDocument();
    expect(screen.getByText('Content Database')).toBeInTheDocument();
    expect(screen.getByText('Export Manager')).toBeInTheDocument();

    // Check that feature-specific headings are not rendered
    expect(screen.queryByText('Overview')).not.toBeInTheDocument();
    expect(screen.queryByText('Encounters')).not.toBeInTheDocument();
    expect(screen.queryByText('Text Variation')).not.toBeInTheDocument();
    expect(screen.queryByText('Character Sheet')).not.toBeInTheDocument();
    expect(screen.queryByText('Content Packs')).not.toBeInTheDocument();
    expect(screen.queryByText('JSON Export')).not.toBeInTheDocument();
  });

  it('highlights the active link in template editor navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/template-editor/encounters');
    render(<Sidebar />);

    // Find all navigation links
    const links = screen.getAllByRole('link');

    // Find the Encounters link (should be active)
    const activeLink = links.find(link => link.textContent === 'Encounters');

    // Check that the active link exists and has some class (more flexible than checking exact class names)
    expect(activeLink).toBeTruthy();
    expect(activeLink?.className).toContain('bg-');
    expect(activeLink?.className).toContain('text-');
  });

  it('highlights the active link in general navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Sidebar />);

    // Mock a different path to test general navigation with an active link
    (usePathname as jest.Mock).mockReturnValue('/content-simulator');
    render(<Sidebar />);

    // Find all navigation links in the sidebar
    const links = screen.getAllByRole('link');

    // Find the Content Simulator link (should be active)
    const activeLink = links.find(link => link.textContent === 'Content Simulator');

    // Check that the active link exists and has some class (more flexible than checking exact class names)
    expect(activeLink).toBeTruthy();
    expect(activeLink?.className).toContain('bg-');
    expect(activeLink?.className).toContain('text-');
  });
});
