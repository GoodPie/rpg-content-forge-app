import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

/**
 * Custom hook for handling entity deletion with confirmation, API calls, and navigation
 * @param deleteFn - The function to call for entity deletion
 * @param options - Configuration options for the hook
 * @returns An object containing the delete handler and loading state
 */
export const useEntityDelete = <TResponse>(
  deleteFn: () => Promise<TResponse>,
  options: {
    onSuccess?: (response: TResponse) => void;
    onError?: (error: any) => void;
    successMessage?: string;
    errorMessage?: string;
    redirectPath?: string;
  } = {}
) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await deleteFn();
      
      // Handle success
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      
      if (options.onSuccess) {
        options.onSuccess(response);
      }
      
      if (options.redirectPath) {
        router.push(options.redirectPath);
        router.refresh();
      }
    } catch (error) {
      // Handle error
      console.error('Error deleting entity:', error);
      
      if (options.errorMessage) {
        toast.error(options.errorMessage);
      } else {
        toast.error('An unexpected error occurred');
      }
      
      if (options.onError) {
        options.onError(error);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
};