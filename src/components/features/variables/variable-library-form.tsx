'use client';

import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {VariableLibrary} from '@/types/variables';
import {createVariableLibrary, updateVariableLibrary} from '@/app/content-database/variables/actions';
import {useFormSubmission} from '@/hooks';
import {getFormTitle, getFormDescription, getSubmitButtonText, getSuccessMessage, getErrorMessage} from '@/lib/form-helpers';
import {validateVariableLibraryForm} from '@/lib/form-validation';

interface FormValues {
  name: string;
  description: string;
  tags?: string;
}

interface VariableLibraryFormProps {
  library?: VariableLibrary;
  isEdit?: boolean;
}

/**
 * Form component for creating and editing variable libraries
 * 
 * This component has been refactored to use the form validation utility
 * for consistent validation across the application.
 */
export function VariableLibraryForm({library, isEdit = false}: Readonly<VariableLibraryFormProps>) {
  const router = useRouter();

  // Initialize form with default values or existing library data
  const form = useForm<FormValues>({
    defaultValues: {
      name: library?.name ?? '',
      description: library?.description ?? '',
      tags: library?.tags ?? '',
    },
  });

  // Using the form validation utility

  // Using the form helpers for success and error messages

  // Helper function to get the redirect path
  const getRedirectPath = () => {
    if (isEdit && library) {
      return `/content-database/variables/${library.id}`;
    }

    // For create mode, we need to use a function to get the ID from the response
    return (response: any) => {
      if (response.success && response.data) {
        return `/content-database/variables/${response.data.id}`;
      }
      return '';
    };
  };

  // Use the form submission hook
  const { handleSubmit, isSubmitting } = useFormSubmission(
    async (data: FormValues) => {
      if (isEdit && library) {
        // Update existing library
        return await updateVariableLibrary(library.id, data);
      } else {
        // Create new library
        return await createVariableLibrary(data);
      }
    },
    {
      validationFn: validateVariableLibraryForm,
      successMessage: getSuccessMessage(isEdit, 'The variable library has been created successfully.', 'The variable library has been updated successfully.'),
      errorMessage: getErrorMessage(isEdit, 'Failed to create library', 'Failed to update library'),
      redirectPath: getRedirectPath(),
    }
  );

  const onSubmit = (data: FormValues) => {
    handleSubmit(data);
  };

  // Using the form helpers for UI text

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getFormTitle(isEdit, 'Create Variable Library', 'Edit Variable Library')}</CardTitle>
        <CardDescription>{getFormDescription(isEdit, 'Create a new collection of variables for procedural content', 'Update the details of your variable library')}</CardDescription>
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
                    <Input placeholder="Forest Descriptions" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for your variable library
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
                      placeholder="A collection of variables for describing forests in different seasons and times of day."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain what this library contains and how it should be used
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="forest, nature, environment" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags to help organize and find this library
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
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
              {getSubmitButtonText(isSubmitting, isEdit, 'Create Library', 'Update Library')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
