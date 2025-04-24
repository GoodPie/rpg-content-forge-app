'use client';

import Link from 'next/link';

export type NavigationItem = {
  href: string;
  label: string;
};

export const mainNavigationItems: NavigationItem[] = [
  { href: '/template-editor', label: 'Template Editor' },
  { href: '/procedural-generator', label: 'Procedural Generator' },
  { href: '/content-simulator', label: 'Content Simulator' },
  { href: '/content-database', label: 'Content Database' },
  { href: '/export-manager', label: 'Export Manager' },
];

export const getFeatureNavigationItems = (feature: string): NavigationItem[] => {
  switch (feature) {
    case 'template-editor':
      return [
        { href: '/template-editor', label: 'Overview' },
        { href: '/template-editor/encounters', label: 'Encounters' },
        { href: '/template-editor/locations', label: 'Locations' },
        { href: '/template-editor/npcs', label: 'NPCs' },
        { href: '/template-editor/items', label: 'Items' },
        { href: '/template-editor/quests', label: 'Quests' },
      ];
    case 'procedural-generator':
      return [
        { href: '/procedural-generator', label: 'Overview' },
        { href: '/procedural-generator/text-variation', label: 'Text Variation' },
        { href: '/procedural-generator/structural-variation', label: 'Structural Variation' },
        { href: '/procedural-generator/conditional-logic', label: 'Conditional Logic' },
        { href: '/procedural-generator/seed-explorer', label: 'Seed Explorer' },
      ];
    case 'content-simulator':
      return [
        { href: '/content-simulator', label: 'Overview' },
        { href: '/content-simulator/character', label: 'Character Sheet' },
        { href: '/content-simulator/inventory', label: 'Inventory' },
        { href: '/content-simulator/journal', label: 'Journal' },
        { href: '/content-simulator/simulation', label: 'Run Simulation' },
      ];
    case 'content-database':
      return [
        { href: '/content-database', label: 'Overview' },
        { href: '/content-database/packs', label: 'Content Packs' },
        { href: '/content-database/templates', label: 'Templates' },
        { href: '/content-database/variables', label: 'Variable Libraries' },
        { href: '/content-database/import', label: 'Import Content' },
      ];
    case 'export-manager':
      return [
        { href: '/export-manager', label: 'Overview' },
        { href: '/export-manager/json', label: 'JSON Export' },
        { href: '/export-manager/sqlite', label: 'SQLite Export' },
        { href: '/export-manager/binary', label: 'Binary Export' },
        { href: '/export-manager/custom', label: 'Custom Format' },
      ];
    default:
      return [];
  }
};

interface DesktopNavLinkProps {
  item: NavigationItem;
  isActive: boolean;
}

export function DesktopNavLink({ item, isActive }: Readonly<DesktopNavLinkProps>) {
  return (
    <Link 
      href={item.href} 
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        isActive 
          ? 'border-(--primary) text-(--foreground)' 
          : 'border-transparent text-(--muted-foreground) hover:text-(--foreground) hover:border-(--border)'
      }`}
    >
      {item.label}
    </Link>
  );
}

interface MobileNavLinkProps {
  item: NavigationItem;
  isActive: boolean;
}

export function MobileNavLink({ item, isActive }: Readonly<MobileNavLinkProps>) {
  return (
    <Link
      href={item.href}
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
        isActive
          ? 'bg-(--secondary/50) border-(--primary) text-(--primary)'
          : 'border-transparent text-(--muted-foreground) hover:bg-(--accent/50) hover:border-(--border) hover:text-(--foreground)'
      }`}
    >
      {item.label}
    </Link>
  );
}

interface SidebarNavLinkProps {
  item: NavigationItem;
  isActive: boolean;
}

export function SidebarNavLink({ item, isActive }: Readonly<SidebarNavLinkProps>) {
  return (
    <Link 
      href={item.href}
      className={`block px-3 py-2 rounded-md ${
        isActive 
          ? 'bg-(--sidebar-accent) text-(--sidebar-foreground)' 
          : 'text-(--sidebar-foreground/70) hover:bg-(--sidebar-accent/50) hover:text-(--sidebar-foreground)'
      }`}
    >
      {item.label}
    </Link>
  );
}