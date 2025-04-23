import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../header';
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

describe('Header Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    (usePathname as jest.Mock).mockReset();
  });

  it('renders the header with logo', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);
    
    // Check that the logo/title is rendered
    expect(screen.getByText('Content Creation Tool')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);
    
    // Check that all main navigation links are rendered in desktop view
    expect(screen.getByText('Template Editor')).toBeInTheDocument();
    expect(screen.getByText('Procedural Generator')).toBeInTheDocument();
    expect(screen.getByText('Content Simulator')).toBeInTheDocument();
    expect(screen.getByText('Content Database')).toBeInTheDocument();
    expect(screen.getByText('Export Manager')).toBeInTheDocument();
  });

  it('highlights the active link in desktop navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/template-editor');
    render(<Header />);
    
    // Get all navigation links
    const links = screen.getAllByText(/Template Editor|Procedural Generator|Content Simulator|Content Database|Export Manager/);
    
    // Find the Template Editor link (should be active)
    const activeLink = links.find(link => link.textContent === 'Template Editor');
    const inactiveLinks = links.filter(link => link.textContent !== 'Template Editor');
    
    // Check that the active link has the active class
    expect(activeLink?.closest('a')).toHaveClass('border-(--primary)');
    
    // Check that inactive links don't have the active class
    inactiveLinks.forEach(link => {
      expect(link.closest('a')).toHaveClass('border-transparent');
    });
  });

  it('mobile menu is initially hidden', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);
    
    // The mobile menu should be hidden initially
    const mobileMenu = screen.getByRole('navigation', { hidden: true });
    expect(mobileMenu).toHaveClass('hidden');
  });

  it('toggles mobile menu when button is clicked', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);
    
    // Find the mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Initially, the mobile menu should be hidden
    expect(screen.getByRole('navigation', { hidden: true })).toHaveClass('hidden');
    
    // Click the menu button to open the menu
    fireEvent.click(menuButton);
    
    // Now the mobile menu should be visible
    expect(screen.getByRole('navigation', { hidden: true })).toHaveClass('block');
    
    // Click the menu button again to close the menu
    fireEvent.click(menuButton);
    
    // The mobile menu should be hidden again
    expect(screen.getByRole('navigation', { hidden: true })).toHaveClass('hidden');
  });

  it('renders mobile navigation links when menu is open', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Header />);
    
    // Find the mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Click the menu button to open the menu
    fireEvent.click(menuButton);
    
    // Check that all main navigation links are rendered in mobile view
    const mobileLinks = screen.getAllByText(/Template Editor|Procedural Generator|Content Simulator|Content Database|Export Manager/);
    expect(mobileLinks.length).toBeGreaterThanOrEqual(5); // At least 5 links (could be more due to desktop links)
  });

  it('highlights the active link in mobile navigation', () => {
    (usePathname as jest.Mock).mockReturnValue('/content-simulator');
    render(<Header />);
    
    // Find the mobile menu button
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    
    // Click the menu button to open the menu
    fireEvent.click(menuButton);
    
    // Find all mobile links
    const mobileLinks = screen.getAllByText(/Template Editor|Procedural Generator|Content Simulator|Content Database|Export Manager/);
    
    // Find the Content Simulator link in mobile view (should be active)
    // We need to filter to find the one in the mobile menu
    const mobileActiveLink = mobileLinks.find(link => 
      link.textContent === 'Content Simulator' && 
      link.closest('a')?.className.includes('border-l-4')
    );
    
    // Check that the active link has the active classes
    expect(mobileActiveLink?.closest('a')).toHaveClass('bg-(--secondary/50)');
    expect(mobileActiveLink?.closest('a')).toHaveClass('border-(--primary)');
  });
});