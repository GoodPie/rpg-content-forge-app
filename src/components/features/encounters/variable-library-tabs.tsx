import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VariableList } from './variable-list';
import { VariableLibrary, Variable } from '@/types/variables';

interface VariableLibraryTabsProps {
  libraries: VariableLibrary[];
  selectedLibraryId: string | null;
  onSelectLibrary: (libraryId: string) => void;
  onSelectVariable: (variableName: string) => void;
  getFilteredVariables: (variables: Variable[]) => Variable[];
  searchTerm: string;
}

/**
 * Component for displaying variable libraries as tabs
 */
export function VariableLibraryTabs({
  libraries,
  selectedLibraryId,
  onSelectLibrary,
  onSelectVariable,
  getFilteredVariables,
  searchTerm
}: VariableLibraryTabsProps) {
  return (
    <Tabs 
      value={selectedLibraryId || undefined} 
      onValueChange={onSelectLibrary}
      data-testid="library-tabs"
    >
      <TabsList className="w-full mb-4">
        {libraries.map((library) => (
          <TabsTrigger 
            key={library.id} 
            value={library.id} 
            className="flex-1"
            data-testid={`library-tab-${library.id}`}
          >
            {library.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {libraries.map((library) => (
        <TabsContent 
          key={library.id} 
          value={library.id}
          data-testid={`library-content-${library.id}`}
        >
          <VariableList
            variables={library.variables}
            filteredVariables={getFilteredVariables(library.variables)}
            onSelectVariable={onSelectVariable}
            searchTerm={searchTerm}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}