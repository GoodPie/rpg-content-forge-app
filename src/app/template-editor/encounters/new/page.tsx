'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewEncounterPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    content: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // This would normally be an API call to save the template
      // For now, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Template name is required');
      }
      
      if (!formData.description.trim()) {
        throw new Error('Template description is required');
      }
      
      if (!formData.content.trim()) {
        throw new Error('Template content is required');
      }
      
      // Success!
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Template Created!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your encounter template has been created successfully.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/template-editor/encounters"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Encounters
          </Link>
          <button
            onClick={() => {
              setFormData({ name: '', description: '', tags: '', content: '' });
              setSuccess(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New Encounter Template</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new interactive scenario with procedural elements.
        </p>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Template Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            placeholder="Forest Stranger Encounter"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            placeholder="An encounter with a mysterious stranger in the forest"
          />
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            placeholder="forest, npc, level1-5"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Template Content
          </label>
          <div className="mt-1 relative">
            <textarea
              name="content"
              id="content"
              rows={10}
              value={formData.content}
              onChange={handleChange}
              className="block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white font-mono"
              placeholder={`As you {{movement_verb}} through the {{forest_state}} forest, you {{discovery_verb}} {{a_stranger}} near {{a_landmark}}.

Variables:
  movement_verb: [walk, trek, journey, make your way, wander]
  forest_state: [dim, misty, dense, shadowy, sunlit, ancient, quiet]
  discovery_verb: [spot, notice, catch sight of, observe, come across]
  a_stranger: [a hooded figure, an old man sitting on a stump, a wounded traveler]
  a_landmark: [a small campfire, a strange stone formation, an ancient tree]`}
            ></textarea>
            <div className="absolute top-2 right-2">
              <button
                type="button"
                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  // This would normally open a variable editor or syntax helper
                  alert('Variable editor would open here');
                }}
              >
                Insert Variable
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Use double curly braces for variables: {"{{"}<span className="font-mono">variable_name</span>{"}}"}
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Link
            href="/template-editor/encounters"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Creating...' : 'Create Template'}
          </button>
        </div>
      </form>
      
      <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Template Syntax Help</h2>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Variables</h3>
          <p>
            Use double curly braces to define a variable: {"{{"}<span className="font-mono">variable_name</span>{"}}"}
          </p>
          <p>
            Define variable options in a separate section or in the variable editor.
          </p>
          
          <h3>Conditions</h3>
          <p>
            Use conditions to show content only when certain criteria are met:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">
            {`{{#if player_class == "wizard"}}
  You sense magical energies nearby.
{{else}}
  Nothing seems out of the ordinary.
{{/if}}`}
          </pre>
          
          <h3>Options</h3>
          <p>
            Define player choices with the options syntax:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded">
            {`[[options]]
  [[option title="Approach cautiously"]]
    You approach with careful steps...
  [[/option]]
  [[option title="Call out a greeting"]]
    You raise your voice in greeting...
  [[/option]]
[[/options]]`}
          </pre>
        </div>
      </div>
    </div>
  );
}