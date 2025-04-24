import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/**
 * Custom hook for handling form submission with loading state, validation, API calls, and navigation
 * @param submitFn - The function to call for form submission (e.g., createEntity, updateEntity)
 * @param options - Configuration options for the hook
 * @returns An object containing the submission handler and loading state
 */
export const useFormSubmission = <TData, TResponse>(
  submitFn: (data: TData) => Promise<TResponse>,
  options: {
    onSuccess?: (response: TResponse) => void;
    onError?: (error: any) => void;
    successMessage?: string;
    errorMessage?: string;
    redirectPath?: string | ((response: TResponse) => string);
    validationFn?: (data: TData) => { isValid: boolean; errorMessage?: string } | true;
  } = {}
) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TData) => {
    setIsSubmitting(true);

    // Run validation if provided
    if (options.validationFn) {
      const validationResult = options.validationFn(data);
      if (validationResult !== true && !validationResult.isValid) {
        toast.error(validationResult.errorMessage || 'Validation failed');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await submitFn(data);

      // Handle success
      if (options.successMessage) {
        toast.success(options.successMessage);
      }

      if (options.onSuccess) {
        options.onSuccess(response);
      }

      if (options.redirectPath) {
        const path = typeof options.redirectPath === 'function' 
          ? options.redirectPath(response) 
          : options.redirectPath;

        if (path) {
          router.push(path);
          router.refresh();
        }
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);

      if (options.errorMessage) {
        toast.error(options.errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }

      if (options.onError) {
        options.onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
