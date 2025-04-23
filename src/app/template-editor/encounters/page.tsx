import Link from 'next/link';

export default function EncountersPage() {
  // This would normally come from a database or API
  const encounterTemplates: EncounterTemplate[] = [];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Encounter Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage interactive scenarios with text, options, and outcomes.
          </p>
        </div>
        <Link
          href="/template-editor/encounters/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New Encounter
        </Link>
      </div>
      
      {encounterTemplates.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {encounterTemplates.map((template) => (
              <li key={template.id}>
                <Link href={`/template-editor/encounters/${template.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ID: {template.id}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{template.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No encounter templates yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first encounter template to get started.
          </p>
          <Link
            href="/template-editor/encounters/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Encounter Template
          </Link>
        </div>
      )}
      
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Encounter Templates</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Encounter templates define interactive scenarios that players can experience in your game. 
            They include descriptive text, options for player choices, and outcomes based on those choices.
          </p>
          <h3>Key Components:</h3>
          <ul>
            <li><strong>Text Content:</strong> The narrative description of the encounter</li>
            <li><strong>Variables:</strong> Placeholders that get replaced with different text each time</li>
            <li><strong>Options:</strong> Choices that players can make during the encounter</li>
            <li><strong>Outcomes:</strong> Results of player choices, which can lead to different paths</li>
            <li><strong>Conditions:</strong> Rules that determine when certain content appears</li>
          </ul>
          <p>
            Use the encounter editor to create rich, branching narratives with procedural elements
            that can generate thousands of unique variations from a single template.
          </p>
        </div>
      </div>
    </div>
  );
}

// Types for TypeScript
interface EncounterTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
}