'use client';

import { useState, useEffect } from 'react';
import {Button} from "@/components/ui/button";
import { Encounter } from '@/app/template-editor/encounters/types';
import { getAllEncounters } from '@/app/template-editor/encounters/actions';

export default function TextVariationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [variationCount, setVariationCount] = useState<number>(5);
  const [seed, setSeed] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [variations, setVariations] = useState<string[]>([]);
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch encounters from the database
  useEffect(() => {
    const fetchEncounters = async () => {
      setIsLoading(true);
      try {
        const response = await getAllEncounters();
        if (response.success && response.encounters) {
          setEncounters(response.encounters);
        }
      } catch (error) {
        console.error('Error fetching encounters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEncounters();
  }, []);

  // Helper function to parse variables from encounter content
  const parseVariables = (content: string) => {
    const variableRegex = /{{([^}]+)}}/g;
    const variables: Record<string, string[]> = {};

    // Find all variable definitions in the content
    const lines = content.split('\n');

    for (const line of lines) {
      // Check if line contains a variable definition
      if (line.trim().match(/^\s*([a-zA-Z0-9_]+):\s*\[(.*)\]\s*$/)) {
        const match = line.trim().match(/^\s*([a-zA-Z0-9_]+):\s*\[(.*)\]\s*$/);
        if (match) {
          const [, varName, varValues] = match;
          variables[varName] = varValues.split(',').map(v => v.trim());
        }
      }

      // Also check for variables in the text
      let match;
      while ((match = variableRegex.exec(content)) !== null) {
        const varName = match[1].trim();
        if (!variables[varName]) {
          variables[varName] = [];
        }
      }
    }

    return variables;
  };

  // Helper function to replace variables in a template
  const replaceVariables = (template: string, variables: Record<string, string[]>) => {
    let result = template;

    // Replace each variable with a random value from its array
    for (const [varName, values] of Object.entries(variables)) {
      if (values.length > 0) {
        const randomValue = values[Math.floor(Math.random() * values.length)];
        const regex = new RegExp(`{{${varName}}}`, 'g');
        result = result.replace(regex, randomValue);
      }
    }

    return result;
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);

    // Find the selected encounter
    const selectedEncounter = encounters.find(e => e.id === selectedTemplate);

    if (!selectedEncounter) {
      setIsGenerating(false);
      return;
    }

    // Process with a slight delay to show loading state
    setTimeout(() => {
      try {
        // Extract the template text and variables from the encounter content
        const content = selectedEncounter.content;

        // Parse variables from the content
        const variables = parseVariables(content);

        // Extract the template text (first paragraph before variables)
        let templateText = content;
        const variablesIndex = content.indexOf('Variables:');
        if (variablesIndex !== -1) {
          templateText = content.substring(0, variablesIndex).trim();
        }

        // Generate variations
        const generatedVariations: string[] = [];
        for (let i = 0; i < variationCount; i++) {
          const variation = replaceVariables(templateText, variables);
          generatedVariations.push(variation);
        }

        setVariations(generatedVariations);
      } catch (error) {
        console.error('Error generating variations:', error);
        setVariations([`Error generating variations: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Text Variation Viewer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate and view multiple variations of text elements with different variable combinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            <div>
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Template
              </label>
              <select
                id="template"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                disabled={isLoading}
              >
                <option value="">Select a template</option>
                {isLoading ? (
                  <option value="" disabled>Loading encounters...</option>
                ) : encounters.length > 0 ? (
                  encounters.map((encounter) => (
                    <option key={encounter.id} value={encounter.id}>
                      {encounter.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No encounters found</option>
                )}
              </select>
            </div>

            <div>
              <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Variations
              </label>
              <input
                type="number"
                id="count"
                min={1}
                max={20}
                value={variationCount}
                onChange={(e) => setVariationCount(parseInt(e.target.value) || 5)}
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="seed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seed (Optional)
              </label>
              <input
                type="text"
                id="seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Leave blank for random seed"
                className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Using the same seed will generate the same variations.
              </p>
            </div>

            <div>
              <Button
                onClick={handleGenerate}
                disabled={!selectedTemplate || isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Variations'}
              </Button>
            </div>
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Generated Variations</h2>

            {variations.length > 0 ? (
              <div className="space-y-4">
                {variations.map((variation, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">{variation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {isGenerating ? 'Generating variations...' : 'Select a template and click "Generate Variations" to see text variations.'}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tips for Text Variation</h2>
            <div className="prose dark:prose-invert max-w-none">
              <ul>
                <li>Use variables for elements that should change between variations</li>
                <li>Create diverse options for each variable to increase variety</li>
                <li>Consider conditional variations based on context (time of day, location, etc.)</li>
                <li>Use nested variables for even more variation</li>
                <li>Save seeds that produce particularly good variations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
