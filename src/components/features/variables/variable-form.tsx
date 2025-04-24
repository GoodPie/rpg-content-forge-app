'use client';

import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Variable} from '@/types/variables';
import {createVariable, updateVariable, createVariableValue, deleteVariableValue} from '@/app/content-database/variables/actions';
import {useFormSubmission} from '@/hooks';
import {getFormTitle, getFormDescription, getSubmitButtonText, getSuccessMessage, getErrorMessage} from '@/lib/form-helpers';
import {KeyFeatureSection} from './key-feature-section';
import {VariableUsageInfo} from './variable-usage-info';
import {VariableValuesSection} from './variable-values-section';
import {validateVariableForm} from '@/lib/form-validation';

interface FormValues {
  name: string;
  description?: string;
  libraryId: string;
  values?: any[];
  isKeyFeature?: boolean;
  keyFeatureType?: string;
}

interface VariableFormProps {
  variable?: Variable;
  libraryId: string;
  isEdit?: boolean;
}

/**
 * Form component for creating and editing variables
 * 
 * This component has been refactored to use smaller, more focused components
 * and custom hooks for managing form state and validation.
 */
export function VariableForm({variable, libraryId, isEdit = false}: Readonly<VariableFormProps>) {
  const router = useRouter();

  // Initialize form with default values or existing variable data
  const form = useForm<FormValues>({
    defaultValues: {
      name: variable?.name ?? '',
      description: variable?.description ?? '',
      libraryId: libraryId,
      values: variable?.values ? variable.values.map(value => ({
        text: value.text,
        condition: value.condition || '',
        weight: value.weight,
      })) : [],
      isKeyFeature: variable?.isKeyFeature ?? false,
      keyFeatureType: variable?.keyFeatureType ?? '',
    },
  });

  // Helper function to get the redirect path
  const getRedirectPath = () => {
    if (isEdit && variable) {
      return `/content-database/variables/${libraryId}/variables/${variable.id}`;
    }

    // For create mode, we need to use a function to get the ID from the response
    return (response: any) => {
      if (response.success && response.data) {
        return `/content-database/variables/${libraryId}/variables/${response.data.id}`;
      }
      return '';
    };
  };

  // Function to create or update a variable and its values
  const createOrUpdateVariableWithValues = async (data: FormValues) => {
    try {
      // Step 1: Create or update the variable
      const variableData = {
        name: data.name,
        description: data.description,
        libraryId: data.libraryId,
        isKeyFeature: data.isKeyFeature,
        keyFeatureType: data.isKeyFeature ? data.keyFeatureType : undefined,
      };

      let variableResponse;
      if (isEdit && variable) {
        // Update existing variable
        variableResponse = await updateVariable(variable.id, variableData);
      } else {
        // Create new variable
        variableResponse = await createVariable(variableData);
      }

      if (!variableResponse.success || !variableResponse.data) {
        throw new Error(variableResponse.error || 'Failed to create/update variable');
      }

      const variableId = variableResponse.data.id;

      // Step 2: Handle values
      if (data.values && data.values.length > 0) {
        // If editing, get existing values to determine which ones to delete
        const existingValueIds = isEdit && variable ? variable.values.map(v => v.id) : [];
        const newValueIds: string[] = [];

        // Create each value
        for (const valueData of data.values) {
          const valueResponse = await createVariableValue({
            text: valueData.text,
            condition: valueData.condition,
            weight: valueData.weight,
            variableId: variableId,
          });

          if (valueResponse.success && valueResponse.data) {
            newValueIds.push(valueResponse.data.id);
          }
        }

        // If editing, delete values that no longer exist
        if (isEdit && variable) {
          for (const existingId of existingValueIds) {
            if (!newValueIds.includes(existingId)) {
              await deleteVariableValue(existingId);
            }
          }
        }
      }

      return variableResponse;
    } catch (error) {
      console.error('Error creating/updating variable with values:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  };

  // Use the form submission hook
  const { handleSubmit, isSubmitting } = useFormSubmission(
    createOrUpdateVariableWithValues,
    {
      validationFn: validateVariableForm,
      successMessage: getSuccessMessage(isEdit, "Variable created successfully", "Variable updated successfully"),
      errorMessage: getErrorMessage(isEdit, "Failed to create variable", "Failed to update variable"),
      redirectPath: getRedirectPath(),
    }
  );

  const onSubmit = (data: FormValues) => {
    handleSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle(isEdit, 'Create Variable', 'Edit Variable')}</CardTitle>
        <CardDescription>{getFormDescription(isEdit, 'Create a new variable for procedural content', 'Update the details of your variable')}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="forest_state" {...field} />
                  </FormControl>
                  <FormDescription>
                    A unique identifier for this variable (e.g., forest_state, character_name)
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describes the state or appearance of a forest"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description explaining what this variable represents
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            {/* Key Feature Section */}
            <KeyFeatureSection form={form} />

            {/* Variable Usage Info */}
            <VariableUsageInfo form={form} />

            {/* Variable Values Section */}
            <VariableValuesSection form={form} />
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
              {getSubmitButtonText(isSubmitting, isEdit, 'Create Variable', 'Update Variable')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
