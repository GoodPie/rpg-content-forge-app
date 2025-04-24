'use client';

import { useState } from 'react';
import { useEncounters } from '@/hooks/use-encounters';
import { TemplateForm } from '@/components/features/templates/template-form';
import { TemplateVariables } from '@/components/features/templates/template-variables';
import { GeneratedVariations } from '@/components/features/templates/generated-variations';
import { parseVariables, extractTemplateText, generateVariations } from '@/lib/template-utils';

export default function TextVariationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [variationCount, setVariationCount] = useState<number>(5);
  const [seed, setSeed] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [variations, setVariations] = useState<string[]>([]);

  // Use the custom hook to fetch encounters
  const { encounters, isLoading, error } = useEncounters();

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
        const templateText = extractTemplateText(content);

        // Generate variations
        const generatedVariations = generateVariations(templateText, variables, variationCount, seed);

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

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TemplateForm
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            variationCount={variationCount}
            setVariationCount={setVariationCount}
            seed={seed}
            setSeed={setSeed}
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
            encounters={encounters}
            isLoading={isLoading}
          />

          <div className="mt-6">
            <TemplateVariables
              selectedTemplate={selectedTemplate}
              encounters={encounters}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <GeneratedVariations
            variations={variations}
            isGenerating={isGenerating}
          />

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
