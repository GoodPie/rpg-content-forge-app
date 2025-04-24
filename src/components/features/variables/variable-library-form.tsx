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

interface FormValues {
  name: string;
  description: string;
  tags?: string;
}

interface VariableLibraryFormProps {
  library?: VariableLibrary;
  isEdit?: boolean;
}

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

  // Validation function for the form
  const validateForm = (data: FormValues) => {
    if (!data.name.trim()) {
      return { isValid: false, errorMessage: 'Name is required' };
    }

    if (!data.description.trim()) {
      return { isValid: false, errorMessage: 'Description is required' };
    }

    if (data.name.length > 100) {
      return { isValid: false, errorMessage: 'Name is too long' };
    }

    if (data.description.length > 500) {
      return { isValid: false, errorMessage: 'Description is too long' };
    }

    return { isValid: true };
  };

  // Helper function to get the success message based on edit mode
  const getSuccessMessage = () => {
    if (isEdit) {
      return 'The variable library has been updated successfully.';
    }
    return 'The variable library has been created successfully.';
  };

  // Helper function to get the error message based on edit mode
  const getErrorMessage = () => {
    if (isEdit) {
      return 'Failed to update library';
    }
    return 'Failed to create library';
  };

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
      return 'Edit Variable Library';
    }
    return 'Create Variable Library';
  };

  // Helper function to get the form description
  const getFormDescription = () => {
    if (isEdit) {
      return 'Update the details of your variable library';
    }
    return 'Create a new collection of variables for procedural content';
  };

  // Helper function to get the submit button text
  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return 'Saving...';
    }

    if (isEdit) {
      return 'Update Library';
    }

    return 'Create Library';
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
              {getSubmitButtonText()}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
