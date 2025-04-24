'use client';

import { VariableLibrary } from '@/types/variables';
import { VariableLibraryCard } from './variable-library-card';

interface VariableLibraryGridProps {
  libraries: VariableLibrary[];
  sortFn?: (a: VariableLibrary, b: VariableLibrary) => number;
  limit?: number;
}

export function VariableLibraryGrid({ 
  libraries, 
  sortFn,
  limit 
}: Readonly<VariableLibraryGridProps>) {
  let displayLibraries = [...libraries];
  
  if (sortFn) {
    displayLibraries = displayLibraries.sort(sortFn);
  }
  
  if (limit) {
    displayLibraries = displayLibraries.slice(0, limit);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayLibraries.map((library) => (
        <VariableLibraryCard key={library.id} library={library} />
      ))}
    </div>
  );
}