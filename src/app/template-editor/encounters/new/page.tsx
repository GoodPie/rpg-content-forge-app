'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function NewEncounterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Define form with react-hook-form
  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      tags: '',
      content: '',
    },
  });

  const { formState } = form;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: any) => {
    setError(null);

    try {
      // This would normally be an API call to save the template
      // For now, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validate form data
      if (!data.name.trim()) {
        throw new Error('Template name is required');
      }

      if (!data.description.trim()) {
        throw new Error('Template description is required');
      }

      if (!data.content.trim()) {
        throw new Error('Template content is required');
      }

      // Success!
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return false;
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
          <Button asChild>
            <Link href="/template-editor/encounters">
              Back to Encounters
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              form.reset();
              setSuccess(false);
            }}
          >
            Create Another
          </Button>
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Name</FormLabel>
                <FormControl>
                  <Input placeholder="Forest Stranger Encounter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="An encounter with a mysterious stranger in the forest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="forest, npc, level1-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Content</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea 
                      rows={10} 
                      className="font-mono"
                      placeholder={`As you {{movement_verb}} through the {{forest_state}} forest, you {{discovery_verb}} {{a_stranger}} near {{a_landmark}}.

Variables:
  movement_verb: [walk, trek, journey, make your way, wander]
  forest_state: [dim, misty, dense, shadowy, sunlit, ancient, quiet]
  discovery_verb: [spot, notice, catch sight of, observe, come across]
  a_stranger: [a hooded figure, an old man sitting on a stump, a wounded traveler]
  a_landmark: [a small campfire, a strange stone formation, an ancient tree]`}
                      {...field}
                    />
                  </FormControl>
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // This would normally open a variable editor or syntax helper
                        alert('Variable editor would open here');
                      }}
                    >
                      Insert Variable
                    </Button>
                  </div>
                </div>
                <FormDescription>
                  Use double curly braces for variables: {"{{"}<span className="font-mono">variable_name</span>{"}}"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" asChild>
              <Link href="/template-editor/encounters">
                Cancel
              </Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Template'}
            </Button>
          </div>
        </form>
      </Form>

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
