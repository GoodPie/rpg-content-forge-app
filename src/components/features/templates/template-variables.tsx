'use client';

import { Encounter } from '@/app/template-editor/encounters/types';

interface TemplateVariablesProps {
  selectedTemplate: string;
  encounters: Encounter[];
  isLoading: boolean;
}

/**
 * Component for displaying the variables in a selected template
 */
export const TemplateVariables = ({
  selectedTemplate,
  encounters,
  isLoading,
}: TemplateVariablesProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Variables</h2>
      {isLoading ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Loading template variables...
        </p>
      ) : selectedTemplate ? (
        (() => {
          const selectedEncounter = encounters.find(e => e.id === selectedTemplate);
          if (!selectedEncounter) {
            return (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Template not found.
              </p>
            );
          }

          // Parse variables from the content
          const content = selectedEncounter.content;

          // Find variable definitions in the content
          const variablesSection = content.indexOf('Variables:');
          if (variablesSection === -1) {
            return (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No variables found in this template.
              </p>
            );
          }

          const variableLines = content.substring(variablesSection).split('\n');

          // Process each line after "Variables:"
          return (
            <div className="space-y-2">
              {variableLines.slice(1).map((line, index) => {
                // Check if line contains a variable definition
                const match = line.trim().match(/^\s*([a-zA-Z0-9_]+):\s*\[(.*)\]\s*$/);
                if (!match) return null;

                const [, varName, varValues] = match;
                const values = varValues.split(',').map(v => v.trim()).join(', ');

                return (
                  <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{varName}:</span> {values}
                  </p>
                );
              }).filter(Boolean)}
            </div>
          );
        })()
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select a template to see its variables.
        </p>
      )}
    </div>
  );
};