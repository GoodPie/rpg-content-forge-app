'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigationItems, getFeatureNavigationItems, SidebarNavLink } from './navigation-links';

/**
 * Sidebar component for feature-specific navigation
 * Displays different navigation options based on the current route
 */
export function Sidebar() {
  const pathname = usePathname() || '';

  // Determine which feature is currently active
  const isTemplateEditor = pathname.startsWith('/template-editor');
  const isProceduralGenerator = pathname.startsWith('/procedural-generator');
  const isContentSimulator = pathname.startsWith('/content-simulator');
  const isContentDatabase = pathname.startsWith('/content-database');
  const isExportManager = pathname.startsWith('/export-manager');

  return (
    <aside className="w-64 bg-(--sidebar) h-full">
      <div className="px-4 py-6">
        {isTemplateEditor && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Template Editor</h2>
            <nav className="space-y-2">
              {getFeatureNavigationItems('template-editor').map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}

        {isProceduralGenerator && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Procedural Generator</h2>
            <nav className="space-y-2">
              {getFeatureNavigationItems('procedural-generator').map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}

        {isContentSimulator && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Content Simulator</h2>
            <nav className="space-y-2">
              {getFeatureNavigationItems('content-simulator').map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}

        {isContentDatabase && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Content Database</h2>
            <nav className="space-y-2">
              {getFeatureNavigationItems('content-database').map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}

        {isExportManager && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Export Manager</h2>
            <nav className="space-y-2">
              {getFeatureNavigationItems('export-manager').map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}

        {/* If not in any feature section, show general links */}
        {!isTemplateEditor && !isProceduralGenerator && !isContentSimulator && !isContentDatabase && !isExportManager && (
          <>
            <h2 className="text-lg font-semibold text-(--sidebar-foreground) mb-4">Navigation</h2>
            <nav className="space-y-2">
              {mainNavigationItems.map((item) => (
                <SidebarNavLink 
                  key={item.href}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
          </>
        )}
      </div>
    </aside>
  );
}
