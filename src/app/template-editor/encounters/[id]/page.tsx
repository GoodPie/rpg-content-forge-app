import {notFound} from 'next/navigation';
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {prisma} from '@/lib/prisma';
import {tagsToArray} from '../utils';
import EncounterTag from "@/components/features/encounters/encounter-tag";

export default async function EncounterPage({params}: { params: { id: string } }) {
  const {id} = params;

  // Fetch the encounter from the database
  const encounter = await prisma.encounter.findUnique({
    where: {id},
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });

  // If encounter doesn't exist, show 404
  if (!encounter) {
    notFound();
  }

  // Format tags for display
  const tags = tagsToArray(encounter.tags.map(et => ({
    id: et.tag.id,
    name: et.tag.name
  })));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{encounter.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {encounter.description}
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" asChild>
            <Link href="/template-editor/encounters">
              Back to List
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/template-editor/encounters/${id}/edit`}>
              Edit Encounter
            </Link>
          </Button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <EncounterTag tag={tag} key={tag}/>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Content</h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border border-gray-200 dark:border-gray-700">
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200">
            {encounter.content}
          </pre>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Details</h2>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{encounter.id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {encounter.createdAt ? new Date(encounter.createdAt).toLocaleString() : 'Unknown'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {encounter.updatedAt ? new Date(encounter.updatedAt).toLocaleString() : 'Unknown'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
