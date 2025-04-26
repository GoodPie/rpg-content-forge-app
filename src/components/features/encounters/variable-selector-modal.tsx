import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVariableLibraries } from '@/hooks/use-variables';
import { Variable } from '@/types/variables';
import { VariableSearchInput } from './variable-search-input';
import { VariableLibraryTabs } from './variable-library-tabs';
import { LoadingState, ErrorState, NoLibrariesState } from './loading-error-states';
import { filterVariablesBySearchTerm } from '@/lib/variable-utils';

interface VariableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVariable: (variableName: string) => void;
}

/**
 * Modal component for selecting variables from variable libraries
 */
export function VariableSelectorModal({
  isOpen,
  onClose,
  onSelectVariable,
}: VariableSelectorModalProps) {
  const { libraries, isLoading, error } = useVariableLibraries();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLibraryId, setSelectedLibraryId] = useState<string | null>(null);

  // Set the first library as selected when libraries are loaded
  useEffect(() => {
    if (libraries.length > 0 && !selectedLibraryId) {
      setSelectedLibraryId(libraries[0].id);
    }
  }, [libraries, selectedLibraryId]);


  // Handle variable selection
  const handleSelectVariable = (variableName: string) => {
    onSelectVariable(variableName);
    onClose();
  };

  // Component to render the modal content based on the current state
  const ModalContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error} />;
    }

    if (libraries.length === 0) {
      return <NoLibrariesState />;
    }

    return (
      <VariableLibraryTabs
        libraries={libraries}
        selectedLibraryId={selectedLibraryId}
        onSelectLibrary={setSelectedLibraryId}
        onSelectVariable={handleSelectVariable}
        getFilteredVariables={(variables) => filterVariablesBySearchTerm(variables, searchTerm)}
        searchTerm={searchTerm}
      />
    );
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => !open && onClose()}
      data-testid="variable-selector-modal"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Variable</DialogTitle>
          <DialogDescription>
            Select a variable from your libraries to insert into your template.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4" data-testid="modal-content-container">
          <VariableSearchInput 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <ModalContent />
        </div>

        <DialogFooter className="flex justify-between sm:justify-end gap-2">
          <Button variant="outline" onClick={onClose} data-testid="cancel-button">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
