import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { prisma } from '@/lib/prisma';
import { tagsToArray } from './utils';
import { ColorfulEncounterTags } from "@/components/features/encounters/colorful-encounter-tags";

export default async function EncountersPage() {
  // Fetch encounters from the database
  const encounterTemplates = await prisma.encounter.findMany({
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  // Transform the data to match the expected format
  const formattedTemplates = encounterTemplates.map(template => ({
    ...template,
    tags: tagsToArray(template.tags.map(et => ({
      id: et.tag.id,
      name: et.tag.name
    })))
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Encounter Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage interactive scenarios with text, options, and outcomes.
          </p>
        </div>

        <Button asChild>
          <Link href="/template-editor/encounters/new">
            New Encounter
          </Link>
        </Button>

      </div>

      {formattedTemplates.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {formattedTemplates.map((template) => (
              <li key={template.id}>
                <Link href={`/template-editor/encounters/${template.id}`}
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">

                        <div className="ml-2 flex flex-col">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">ID: {template.id}</span>
                        </div>

                      </div>
                      <div className="flex items-center space-x-3">

                        <ColorfulEncounterTags 
                          tags={template.tags} 
                          gap="gap-2" 
                        />

                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link href={`/template-editor/encounters/${template.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 ml-2">
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
          <Button asChild>
            <Link href="/template-editor/encounters/new">
              Create Encounter Template
            </Link>
          </Button>
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
