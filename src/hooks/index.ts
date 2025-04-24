/**
 * Custom hooks for the RPG Content Forge application
 * 
 * This file exports all custom hooks for easier imports and discovery.
 */

// Data fetching hooks
export { useEncounters } from './use-encounters';
export { useVariableLibraries, useSelectedVariableLibrary, useSelectedVariable } from './use-variables';
export { useVariableLibrary } from './use-variable-library';

// Form hooks
export { useFormSubmission } from './use-form-submission';
export { useEntityDelete } from './use-entity-delete';

// UI hooks
export { useTabs } from './use-tabs';

/**
 * Hook Usage Examples:
 * 
 * 1. useFormSubmission - For handling form submissions with validation, API calls, and navigation
 * 
 * ```tsx
 * const { handleSubmit, isSubmitting } = useFormSubmission(
 *   async (data) => await createEntity(data),
 *   {
 *     validationFn: (data) => {
 *       if (!data.name) return { isValid: false, errorMessage: 'Name is required' };
 *       return { isValid: true };
 *     },
 *     successMessage: 'Entity created successfully',
 *     errorMessage: 'Failed to create entity',
 *     redirectPath: '/entities',
 *   }
 * );
 * ```
 * 
 * 2. useEntityDelete - For handling entity deletion with confirmation, API calls, and navigation
 * 
 * ```tsx
 * const { handleDelete, isDeleting } = useEntityDelete(
 *   () => deleteEntity(entityId),
 *   {
 *     successMessage: 'Entity deleted successfully',
 *     errorMessage: 'Failed to delete entity',
 *     redirectPath: '/entities',
 *   }
 * );
 * ```
 * 
 * 3. useVariableLibrary - For fetching and managing a specific variable library
 * 
 * ```tsx
 * const { library, isLoading, error } = useVariableLibrary(libraryId);
 * ```
 * 
 * 4. useTabs - For managing tab state
 * 
 * ```tsx
 * const { activeTab, handleTabChange } = useTabs('overview');
 * ```
 */