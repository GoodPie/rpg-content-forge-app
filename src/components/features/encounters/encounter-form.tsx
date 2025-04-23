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
import { EncounterData } from '@/app/template-editor/encounters/types';

interface EncounterFormProps {
  defaultValues?: EncounterData;
  isEditing?: boolean;
  encounterId?: string;
  onSubmit: (data: EncounterData) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

export function EncounterForm({
  defaultValues = {
    name: '',
    description: '',
    tags: '',
    content: '',
  },
  isEditing = false,
  encounterId,
  onSubmit,
  isLoading = false,
}: EncounterFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Define form with react-hook-form
  const form = useForm<EncounterData>({
    defaultValues,
  });

  const { formState, reset } = form;
  const isSubmitting = formState.isSubmitting;

  const handleSubmit = async (data: EncounterData) => {
    setError(null);

    try {
      const result = await onSubmit(data);

      if (!result.success) {
        throw new Error(result.error || `Failed to ${isEditing ? 'update' : 'create'} encounter`);
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Template {isEditing ? 'Updated' : 'Created'}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your encounter template has been {isEditing ? 'updated' : 'created'} successfully.
        </p>
        <div className="flex justify-center space-x-4">
          {isEditing ? (
            <Button asChild>
              <Link href={`/template-editor/encounters/${encounterId}`}>
                View Template
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                reset();
                setSuccess(false);
              }}
            >
              Create Another
            </Button>
          )}
          <Button variant={isEditing ? "outline" : "default"} asChild>
            <Link href="/template-editor/encounters">
              Back to Encounters
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">Loading encounter data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditing ? 'Edit' : 'New'} Encounter Template
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isEditing ? 'Update your' : 'Create a new'} interactive scenario{isEditing ? '' : ' with procedural elements'}.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 p-4 rounded-md border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
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
                      placeholder={isEditing 
                        ? "Enter template content with variables..." 
                        : `As you {{movement_verb}} through the {{forest_state}} forest, you {{discovery_verb}} {{a_stranger}} near {{a_landmark}}.

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
              <Link href={isEditing ? `/template-editor/encounters/${encounterId}` : "/template-editor/encounters"}>
                Cancel
              </Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Template' : 'Create Template')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}