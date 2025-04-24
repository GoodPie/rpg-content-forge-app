'use client';

interface GeneratedVariationsProps {
  variations: string[];
  isGenerating: boolean;
}

/**
 * Component for displaying generated variations of a template
 */
export const GeneratedVariations = ({
  variations,
  isGenerating,
}: GeneratedVariationsProps) => {
  return (
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
  );
};