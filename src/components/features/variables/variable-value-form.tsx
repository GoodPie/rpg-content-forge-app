'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { VariableValue } from '@/types/variables';
import { createVariableValue, updateVariableValue } from '@/app/content-database/variables/actions';

interface FormValues {
  text: string;
  condition?: string;
  weight: number;
  variableId: string;
}

interface VariableValueFormProps {
  value?: VariableValue;
  variableId: string;
  libraryId: string;
  isEdit?: boolean;
}

export function VariableValueForm({ value, variableId, libraryId, isEdit = false }: VariableValueFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values or existing value data
  const form = useForm<FormValues>({
    defaultValues: {
      text: value?.text || '',
      condition: value?.condition || '',
      weight: value?.weight || 1.0,
      variableId: variableId,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Basic validation
    if (!data.text.trim()) {
      toast.error('Value text is required');
      setIsSubmitting(false);
      return;
    }

    if (!data.variableId) {
      toast.error('Variable ID is required');
      setIsSubmitting(false);
      return;
    }

    // Validate weight is positive
    if (typeof data.weight !== 'number' || data.weight <= 0) {
      toast.error('Weight must be a positive number');
      setIsSubmitting(false);
      return;
    }

    try {
      if (isEdit && value) {
        // Update existing value
        const response = await updateVariableValue(value.id, data);
        if (response.success) {
          toast.success('The variable value has been updated successfully.');
          router.push(`/content-database/variables/${libraryId}/variables/${variableId}`);
          router.refresh();
        } else {
          toast.error(response.error || 'Failed to update value');
        }
      } else {
        // Create new value
        const response = await createVariableValue(data);
        if (response.success) {
          toast.success('The variable value has been created successfully.');
          router.push(`/content-database/variables/${libraryId}/variables/${variableId}`);
          router.refresh();
        } else {
          toast.error(response.error || 'Failed to create value');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Value' : 'Add Value'}</CardTitle>
        <CardDescription>
          {isEdit
            ? 'Update this variable value'
            : 'Add a new possible value for this variable'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="dense and shadowy"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The text that will replace the variable in templates
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="time_of_day == night" {...field} />
                  </FormControl>
                  <FormDescription>
                    A condition that must be true for this value to be used (e.g., time_of_day == night, player_level > 5)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="1.0"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Higher weights make this value more likely to be selected (default: 1.0)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">How Conditions Work</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Conditions are evaluated at runtime to determine which values can be used.
                If a condition is provided, the value will only be used when the condition is true.
              </p>
              <p className="text-sm text-muted-foreground">
                Examples:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1 space-y-1">
                <li>time_of_day == night</li>
                <li>season == winter</li>
                <li>player_level > 5</li>
                <li>player_class == wizard</li>
                <li>location_type contains forest</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Value' : 'Add Value'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
