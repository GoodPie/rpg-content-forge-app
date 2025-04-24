'use client';

import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Variable} from '@/types/variables';
import {createVariable, updateVariable} from '@/app/content-database/variables/actions';
import {useFormSubmission} from '@/hooks';

interface FormValues {
  name: string;
  description?: string;
  libraryId: string;
}

interface VariableFormProps {
  variable?: Variable;
  libraryId: string;
  isEdit?: boolean;
}

export function VariableForm({variable, libraryId, isEdit = false}: VariableFormProps) {
  const router = useRouter();

  // Initialize form with default values or existing variable data
  const form = useForm<FormValues>({
    defaultValues: {
      name: variable?.name ?? '',
      description: variable?.description ?? '',
      libraryId: libraryId,
    },
  });

  // Validation function for the form
  const validateForm = (data: FormValues) => {
    if (!data.name.trim()) {
      return { isValid: false, errorMessage: "Name is required" };
    }

    if (data.name.length > 50) {
      return { isValid: false, errorMessage: "Name is too long" };
    }

    // Validate name format (must start with a letter and contain only letters, numbers, and underscores)
    if (!data.name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) {
      return { isValid: false, errorMessage: "Name must start with a letter and contain only letters, numbers, and underscores" };
    }

    if (!data.libraryId) {
      return { isValid: false, errorMessage: "Library ID is required" };
    }

    return { isValid: true };
  };

  // Helper function to get the success message based on edit mode
  const getSuccessMessage = () => {
    if (isEdit) {
      return "Variable updated successfully";
    }
    return "Variable created successfully";
  };

  // Helper function to get the error message based on edit mode
  const getErrorMessage = () => {
    if (isEdit) {
      return 'Failed to update variable';
    }
    return 'Failed to create variable';
  };

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

  // Use the form submission hook
  const { handleSubmit, isSubmitting } = useFormSubmission(
    async (data: FormValues) => {
      if (isEdit && variable) {
        // Update existing variable
        return await updateVariable(variable.id, data);
      } else {
        // Create new variable
        return await createVariable(data);
      }
    },
    {
      validationFn: validateForm,
      successMessage: getSuccessMessage(),
      errorMessage: getErrorMessage(),
      redirectPath: getRedirectPath(),
    }
  );

  const onSubmit = (data: FormValues) => {
    handleSubmit(data);
  };

  // Helper function to get the form title
  const getFormTitle = () => {
    if (isEdit) {
      return 'Edit Variable';
    }
    return 'Create Variable';
  };

  // Helper function to get the form description
  const getFormDescription = () => {
    if (isEdit) {
      return 'Update the details of your variable';
    }
    return 'Create a new variable for procedural content';
  };

  // Helper function to get the submit button text
  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return 'Saving...';
    }

    if (isEdit) {
      return 'Update Variable';
    }

    return 'Create Variable';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle()}</CardTitle>
        <CardDescription>{getFormDescription()}</CardDescription>
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

            <div className="bg-muted p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Variable Usage</h3>
              <p className="text-sm text-muted-foreground">
                In templates, use this variable with: <code
                className="bg-background px-1 py-0.5 rounded">{"{{"}{form.watch('name') || 'variable_name'}{"}}"}</code>
              </p>
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
              {getSubmitButtonText()}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
