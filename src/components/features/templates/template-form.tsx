'use client';

import { Button } from "@/components/ui/button";
import { Encounter } from '@/app/template-editor/encounters/types';

interface TemplateFormProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  variationCount: number;
  setVariationCount: (count: number) => void;
  seed: string;
  setSeed: (seed: string) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
  encounters: Encounter[];
  isLoading: boolean;
}

/**
 * Component for the template selection and generation form
 */
export const TemplateForm = ({
  selectedTemplate,
  setSelectedTemplate,
  variationCount,
  setVariationCount,
  seed,
  setSeed,
  handleGenerate,
  isGenerating,
  encounters,
  isLoading,
}: TemplateFormProps) => {
  return (
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
  );
};