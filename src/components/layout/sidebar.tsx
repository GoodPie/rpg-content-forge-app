'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar component for feature-specific navigation
 * Displays different navigation options based on the current route
 */
export function Sidebar() {
  const pathname = usePathname();
  
  // Determine which feature is currently active
  const isTemplateEditor = pathname.startsWith('/template-editor');
  const isProceduralGenerator = pathname.startsWith('/procedural-generator');
  const isContentSimulator = pathname.startsWith('/content-simulator');
  const isContentDatabase = pathname.startsWith('/content-database');
  const isExportManager = pathname.startsWith('/export-manager');
  
  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 h-full">
      <div className="px-4 py-6">
        {isTemplateEditor && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Editor</h2>
            <nav className="space-y-2">
              <Link 
                href="/template-editor"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Overview
              </Link>
              <Link 
                href="/template-editor/encounters"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor/encounters' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Encounters
              </Link>
              <Link 
                href="/template-editor/locations"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor/locations' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Locations
              </Link>
              <Link 
                href="/template-editor/npcs"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor/npcs' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                NPCs
              </Link>
              <Link 
                href="/template-editor/items"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor/items' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Items
              </Link>
              <Link 
                href="/template-editor/quests"
                className={`block px-3 py-2 rounded-md ${pathname === '/template-editor/quests' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Quests
              </Link>
            </nav>
          </>
        )}
        
        {isProceduralGenerator && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Procedural Generator</h2>
            <nav className="space-y-2">
              <Link 
                href="/procedural-generator"
                className={`block px-3 py-2 rounded-md ${pathname === '/procedural-generator' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Overview
              </Link>
              <Link 
                href="/procedural-generator/text-variation"
                className={`block px-3 py-2 rounded-md ${pathname === '/procedural-generator/text-variation' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Text Variation
              </Link>
              <Link 
                href="/procedural-generator/structural-variation"
                className={`block px-3 py-2 rounded-md ${pathname === '/procedural-generator/structural-variation' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Structural Variation
              </Link>
              <Link 
                href="/procedural-generator/conditional-logic"
                className={`block px-3 py-2 rounded-md ${pathname === '/procedural-generator/conditional-logic' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Conditional Logic
              </Link>
              <Link 
                href="/procedural-generator/seed-explorer"
                className={`block px-3 py-2 rounded-md ${pathname === '/procedural-generator/seed-explorer' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Seed Explorer
              </Link>
            </nav>
          </>
        )}
        
        {isContentSimulator && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Simulator</h2>
            <nav className="space-y-2">
              <Link 
                href="/content-simulator"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-simulator' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Overview
              </Link>
              <Link 
                href="/content-simulator/character"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-simulator/character' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Character Sheet
              </Link>
              <Link 
                href="/content-simulator/inventory"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-simulator/inventory' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Inventory
              </Link>
              <Link 
                href="/content-simulator/journal"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-simulator/journal' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Journal
              </Link>
              <Link 
                href="/content-simulator/simulation"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-simulator/simulation' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Run Simulation
              </Link>
            </nav>
          </>
        )}
        
        {isContentDatabase && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Database</h2>
            <nav className="space-y-2">
              <Link 
                href="/content-database"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-database' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Overview
              </Link>
              <Link 
                href="/content-database/packs"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-database/packs' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Content Packs
              </Link>
              <Link 
                href="/content-database/templates"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-database/templates' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Templates
              </Link>
              <Link 
                href="/content-database/variables"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-database/variables' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Variable Libraries
              </Link>
              <Link 
                href="/content-database/import"
                className={`block px-3 py-2 rounded-md ${pathname === '/content-database/import' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Import Content
              </Link>
            </nav>
          </>
        )}
        
        {isExportManager && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Manager</h2>
            <nav className="space-y-2">
              <Link 
                href="/export-manager"
                className={`block px-3 py-2 rounded-md ${pathname === '/export-manager' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Overview
              </Link>
              <Link 
                href="/export-manager/json"
                className={`block px-3 py-2 rounded-md ${pathname === '/export-manager/json' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                JSON Export
              </Link>
              <Link 
                href="/export-manager/sqlite"
                className={`block px-3 py-2 rounded-md ${pathname === '/export-manager/sqlite' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                SQLite Export
              </Link>
              <Link 
                href="/export-manager/binary"
                className={`block px-3 py-2 rounded-md ${pathname === '/export-manager/binary' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Binary Export
              </Link>
              <Link 
                href="/export-manager/custom"
                className={`block px-3 py-2 rounded-md ${pathname === '/export-manager/custom' ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Custom Format
              </Link>
            </nav>
          </>
        )}
        
        {/* If not in any feature section, show general links */}
        {!isTemplateEditor && !isProceduralGenerator && !isContentSimulator && !isContentDatabase && !isExportManager && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation</h2>
            <nav className="space-y-2">
              <Link 
                href="/template-editor"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Template Editor
              </Link>
              <Link 
                href="/procedural-generator"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Procedural Generator
              </Link>
              <Link 
                href="/content-simulator"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Content Simulator
              </Link>
              <Link 
                href="/content-database"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Content Database
              </Link>
              <Link 
                href="/export-manager"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Export Manager
              </Link>
            </nav>
          </>
        )}
      </div>
    </aside>
  );
}