import Link from 'next/link';
import {TemplateCard} from "@/components/ui/template-card";

export default function TemplateEditorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Template Editor</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Create and edit procedural content templates with support for variables, conditions, and branching narratives.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TemplateCard
          title="Encounters" 
          description="Interactive scenarios with text, options, and outcomes"
          href="/template-editor/encounters"
          count={0}
        />
        <TemplateCard
          title="Locations" 
          description="Places with descriptions, points of interest, and encounters"
          href="/template-editor/locations"
          count={0}
        />
        <TemplateCard
          title="NPCs" 
          description="Characters with procedural names, appearances, personalities, and dialogue"
          href="/template-editor/npcs"
          count={0}
        />
        <TemplateCard
          title="Items" 
          description="Objects with procedural properties and variations"
          href="/template-editor/items"
          count={0}
        />
        <TemplateCard
          title="Quests" 
          description="Multi-step objectives with procedural elements"
          href="/template-editor/quests"
          count={0}
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Templates</h2>
        <div className="text-gray-600 dark:text-gray-400 text-center py-8">
          <p>No recent templates found.</p>
          <p className="mt-2">Create a new template to get started.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Choose a template type</h3>
              <p className="text-gray-600 dark:text-gray-400">Select the type of content you want to create from the options above.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">2</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Define template properties</h3>
              <p className="text-gray-600 dark:text-gray-400">Set the basic metadata for your template, such as name, description, and tags.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">3</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add procedural content</h3>
              <p className="text-gray-600 dark:text-gray-400">Create text with variable placeholders, conditional sections, and branching options.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">4</div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Test and refine</h3>
              <p className="text-gray-600 dark:text-gray-400">Use the preview feature to see variations of your template and refine as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
