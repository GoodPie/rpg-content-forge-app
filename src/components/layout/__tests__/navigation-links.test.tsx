import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
  mainNavigationItems,
  getFeatureNavigationItems,
  DesktopNavLink,
  MobileNavLink,
  SidebarNavLink
} from '../navigation-links';

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

describe('Navigation Links', () => {
  describe('mainNavigationItems', () => {
    it('contains all main navigation items', () => {
      // Check that all expected main navigation items are present
      expect(mainNavigationItems).toHaveLength(5);
      
      // Check specific items
      expect(mainNavigationItems.find(item => item.href === '/template-editor')).toBeDefined();
      expect(mainNavigationItems.find(item => item.href === '/procedural-generator')).toBeDefined();
      expect(mainNavigationItems.find(item => item.href === '/content-simulator')).toBeDefined();
      expect(mainNavigationItems.find(item => item.href === '/content-database')).toBeDefined();
      expect(mainNavigationItems.find(item => item.href === '/export-manager')).toBeDefined();
      
      // Check labels
      expect(mainNavigationItems.find(item => item.label === 'Template Editor')).toBeDefined();
      expect(mainNavigationItems.find(item => item.label === 'Procedural Generator')).toBeDefined();
      expect(mainNavigationItems.find(item => item.label === 'Content Simulator')).toBeDefined();
      expect(mainNavigationItems.find(item => item.label === 'Content Database')).toBeDefined();
      expect(mainNavigationItems.find(item => item.label === 'Export Manager')).toBeDefined();
    });
  });

  describe('getFeatureNavigationItems', () => {
    it('returns template editor navigation items', () => {
      const items = getFeatureNavigationItems('template-editor');
      expect(items).toHaveLength(6);
      expect(items.find(item => item.href === '/template-editor')).toBeDefined();
      expect(items.find(item => item.href === '/template-editor/encounters')).toBeDefined();
      expect(items.find(item => item.href === '/template-editor/locations')).toBeDefined();
      expect(items.find(item => item.href === '/template-editor/npcs')).toBeDefined();
      expect(items.find(item => item.href === '/template-editor/items')).toBeDefined();
      expect(items.find(item => item.href === '/template-editor/quests')).toBeDefined();
    });

    it('returns procedural generator navigation items', () => {
      const items = getFeatureNavigationItems('procedural-generator');
      expect(items).toHaveLength(5);
      expect(items.find(item => item.href === '/procedural-generator')).toBeDefined();
      expect(items.find(item => item.href === '/procedural-generator/text-variation')).toBeDefined();
      expect(items.find(item => item.href === '/procedural-generator/structural-variation')).toBeDefined();
      expect(items.find(item => item.href === '/procedural-generator/conditional-logic')).toBeDefined();
      expect(items.find(item => item.href === '/procedural-generator/seed-explorer')).toBeDefined();
    });

    it('returns content simulator navigation items', () => {
      const items = getFeatureNavigationItems('content-simulator');
      expect(items).toHaveLength(5);
      expect(items.find(item => item.href === '/content-simulator')).toBeDefined();
      expect(items.find(item => item.href === '/content-simulator/character')).toBeDefined();
      expect(items.find(item => item.href === '/content-simulator/inventory')).toBeDefined();
      expect(items.find(item => item.href === '/content-simulator/journal')).toBeDefined();
      expect(items.find(item => item.href === '/content-simulator/simulation')).toBeDefined();
    });

    it('returns content database navigation items', () => {
      const items = getFeatureNavigationItems('content-database');
      expect(items).toHaveLength(5);
      expect(items.find(item => item.href === '/content-database')).toBeDefined();
      expect(items.find(item => item.href === '/content-database/packs')).toBeDefined();
      expect(items.find(item => item.href === '/content-database/templates')).toBeDefined();
      expect(items.find(item => item.href === '/content-database/variables')).toBeDefined();
      expect(items.find(item => item.href === '/content-database/import')).toBeDefined();
    });

    it('returns export manager navigation items', () => {
      const items = getFeatureNavigationItems('export-manager');
      expect(items).toHaveLength(5);
      expect(items.find(item => item.href === '/export-manager')).toBeDefined();
      expect(items.find(item => item.href === '/export-manager/json')).toBeDefined();
      expect(items.find(item => item.href === '/export-manager/sqlite')).toBeDefined();
      expect(items.find(item => item.href === '/export-manager/binary')).toBeDefined();
      expect(items.find(item => item.href === '/export-manager/custom')).toBeDefined();
    });

    it('returns empty array for unknown feature', () => {
      const items = getFeatureNavigationItems('unknown-feature');
      expect(items).toHaveLength(0);
    });
  });

  describe('DesktopNavLink', () => {
    it('renders active link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<DesktopNavLink item={item} isActive={true} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('border-(--primary)');
      expect(link.closest('a')).toHaveClass('text-(--foreground)');
    });

    it('renders inactive link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<DesktopNavLink item={item} isActive={false} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('border-transparent');
      expect(link.closest('a')).toHaveClass('text-(--muted-foreground)');
    });
  });

  describe('MobileNavLink', () => {
    it('renders active link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<MobileNavLink item={item} isActive={true} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('bg-(--secondary/50)');
      expect(link.closest('a')).toHaveClass('border-(--primary)');
      expect(link.closest('a')).toHaveClass('text-(--primary)');
    });

    it('renders inactive link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<MobileNavLink item={item} isActive={false} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('border-transparent');
      expect(link.closest('a')).toHaveClass('text-(--muted-foreground)');
    });
  });

  describe('SidebarNavLink', () => {
    it('renders active link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<SidebarNavLink item={item} isActive={true} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('bg-(--sidebar-accent)');
      expect(link.closest('a')).toHaveClass('text-(--sidebar-foreground)');
    });

    it('renders inactive link correctly', () => {
      const item = { href: '/test', label: 'Test Link' };
      render(<SidebarNavLink item={item} isActive={false} />);
      
      const link = screen.getByText('Test Link');
      expect(link).toBeInTheDocument();
      expect(link.closest('a')).toHaveAttribute('href', '/test');
      expect(link.closest('a')).toHaveClass('text-(--sidebar-foreground/70)');
    });
  });
});