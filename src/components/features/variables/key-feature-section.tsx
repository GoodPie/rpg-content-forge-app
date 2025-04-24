'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface KeyFeatureSectionProps {
  form: UseFormReturn<any>;
}

/**
 * Component for the key feature section of the variable form
 * 
 * This component allows users to mark a variable as a key feature and select the key feature type.
 * Key features are special variables that can be used in game mechanics.
 */
export function KeyFeatureSection({ form }: Readonly<KeyFeatureSectionProps>) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="isKeyFeature"
        render={({field}) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <input
                type="checkbox"
                className="h-4 w-4 mt-1"
                checked={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Key Feature</FormLabel>
              <FormDescription>
                Mark this variable as a key feature for use in game mechanics
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {form.watch('isKeyFeature') && (
        <FormField
          control={form.control}
          name="keyFeatureType"
          render={({field}) => (
            <FormItem>
              <FormLabel>Key Feature Type</FormLabel>
              <FormControl>
                <select
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-white"
                  {...field}
                >
                  <option value="">Select a type...</option>
                  <option value="current_player">Current Player</option>
                  <option value="current_location">Current Location</option>
                  <option value="game_state">Game State</option>
                  <option value="custom">Custom</option>
                </select>
              </FormControl>
              <FormDescription>
                Select the type of key feature this variable represents
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
      )}
    </div>
  );
}