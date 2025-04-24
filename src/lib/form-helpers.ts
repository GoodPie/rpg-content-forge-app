/**
 * Helper functions for form components
 * 
 * These helpers provide consistent UI text and messages for forms across the application.
 * They handle the differences between create and edit modes, as well as submission states.
 * 
 * Usage example:
 * ```tsx
 * import { getFormTitle, getFormDescription, getSubmitButtonText } from '@/lib/form-helpers';
 * 
 * // In your component:
 * return (
 *   <Card>
 *     <CardHeader>
 *       <CardTitle>{getFormTitle(isEdit, 'Create Item', 'Edit Item')}</CardTitle>
 *       <CardDescription>{getFormDescription(isEdit, 'Create a new item', 'Update this item')}</CardDescription>
 *     </CardHeader>
 *     <CardFooter>
 *       <Button type="submit" disabled={isSubmitting}>
 *         {getSubmitButtonText(isSubmitting, isEdit, 'Create', 'Update')}
 *       </Button>
 *     </CardFooter>
 *   </Card>
 * );
 * ```
 */

/**
 * Get the form title based on edit mode
 * @param isEdit - Whether the form is in edit mode
 * @param createTitle - The title to use in create mode
 * @param editTitle - The title to use in edit mode
 * @returns The form title
 */
export const getFormTitle = (
  isEdit: boolean,
  createTitle: string,
  editTitle: string
): string => {
  return isEdit ? editTitle : createTitle;
};

/**
 * Get the form description based on edit mode
 * @param isEdit - Whether the form is in edit mode
 * @param createDescription - The description to use in create mode
 * @param editDescription - The description to use in edit mode
 * @returns The form description
 */
export const getFormDescription = (
  isEdit: boolean,
  createDescription: string,
  editDescription: string
): string => {
  return isEdit ? editDescription : createDescription;
};

/**
 * Get the submit button text based on edit mode and submission state
 * @param isSubmitting - Whether the form is currently submitting
 * @param isEdit - Whether the form is in edit mode
 * @param createText - The text to use in create mode
 * @param editText - The text to use in edit mode
 * @param submittingText - The text to use when submitting
 * @returns The submit button text
 */
export const getSubmitButtonText = (
  isSubmitting: boolean,
  isEdit: boolean,
  createText: string,
  editText: string,
  submittingText: string = 'Saving...'
): string => {
  if (isSubmitting) {
    return submittingText;
  }

  return isEdit ? editText : createText;
};

/**
 * Get the success message based on edit mode
 * @param isEdit - Whether the form is in edit mode
 * @param createMessage - The message to use in create mode
 * @param editMessage - The message to use in edit mode
 * @returns The success message
 * 
 * @example
 * // With useFormSubmission hook
 * const { handleSubmit, isSubmitting } = useFormSubmission(
 *   async (data) => {
 *     if (isEdit) {
 *       return await updateEntity(id, data);
 *     } else {
 *       return await createEntity(data);
 *     }
 *   },
 *   {
 *     validationFn: validateForm,
 *     successMessage: getSuccessMessage(isEdit, "Created successfully", "Updated successfully"),
 *     errorMessage: getErrorMessage(isEdit, "Failed to create", "Failed to update"),
 *     redirectPath: getRedirectPath(),
 *   }
 * );
 */
export const getSuccessMessage = (
  isEdit: boolean,
  createMessage: string,
  editMessage: string
): string => {
  return isEdit ? editMessage : createMessage;
};

/**
 * Get the error message based on edit mode
 * @param isEdit - Whether the form is in edit mode
 * @param createMessage - The message to use in create mode
 * @param editMessage - The message to use in edit mode
 * @returns The error message
 */
export const getErrorMessage = (
  isEdit: boolean,
  createMessage: string,
  editMessage: string
): string => {
  return isEdit ? editMessage : createMessage;
};
