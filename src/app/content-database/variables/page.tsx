'use client';

import { useState } from 'react';
import { useVariableLibraries } from '@/hooks/use-variables';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VariablesPageHeader } from '@/components/features/variables/variables-page-header';
import { VariableLibrarySkeleton } from '@/components/features/variables/variable-library-skeleton';
import { ErrorMessage } from '@/components/features/variables/error-message';
import { EmptyLibraryState } from '@/components/features/variables/empty-library-state';
import { VariableLibraryGrid } from '@/components/features/variables/variable-library-grid';
import { VariableLibrariesAbout } from '@/components/features/variables/variable-libraries-about';
import { VariableLibrary } from '@/types/variables';

export default function VariablesPage() {
  const { libraries, isLoading, error } = useVariableLibraries();
  const [activeTab, setActiveTab] = useState('all');

  // Sort function for recently updated libraries
  const sortByUpdatedAt = (a: VariableLibrary, b: VariableLibrary) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();

  // Helper function to render content based on state for "all" tab
  const renderAllTabContent = () => {
    if (isLoading) {
      return <VariableLibrarySkeleton count={3} />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (libraries.length === 0) {
      return (
        <EmptyLibraryState
          title="No variable libraries found"
          description="Create your first variable library to start building procedural content."
          buttonText="Create Variable Library"
          buttonHref="/content-database/variables/new"
        />
      );
    }

    return <VariableLibraryGrid libraries={libraries} />;
  };

  // Helper function to render content based on state for "recent" tab
  const renderRecentTabContent = () => {
    if (isLoading) {
      return <VariableLibrarySkeleton count={3} />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    return (
      <VariableLibraryGrid 
        libraries={libraries} 
        sortFn={sortByUpdatedAt} 
        limit={6} 
      />
    );
  };

  return (
    <div className="container mx-auto py-6">
      <VariablesPageHeader
        title="Variable Libraries"
        description="Manage reusable variable collections for procedural content"
        buttonText="New Library"
        buttonHref="/content-database/variables/new"
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Libraries</TabsTrigger>
          <TabsTrigger value="recent">Recently Updated</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderAllTabContent()}
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          {renderRecentTabContent()}
        </TabsContent>
      </Tabs>

      <VariableLibrariesAbout
        title="About Variable Libraries"
        description="Variable libraries are collections of reusable variables that can be used across multiple templates.
          They help create more dynamic and varied procedural content by providing a centralized place to manage
          text variations, conditional content, and weighted options."
        featuresTitle="Key Features:"
        features={[
          "Create named variables with multiple possible values",
          "Add conditions to values for context-sensitive content",
          "Assign weights to control how often each value appears",
          "Organize variables into themed libraries",
          "Reuse variables across multiple templates"
        ]}
      />
    </div>
  );
}
