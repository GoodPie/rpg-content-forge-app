import {
  getFormTitle,
  getFormDescription,
  getSubmitButtonText,
  getSuccessMessage,
  getErrorMessage
} from '../form-helpers';

describe('Form Helpers', () => {
  describe('getFormTitle', () => {
    it('returns the edit title when in edit mode', () => {
      expect(getFormTitle(true, 'Create Title', 'Edit Title')).toBe('Edit Title');
    });

    it('returns the create title when not in edit mode', () => {
      expect(getFormTitle(false, 'Create Title', 'Edit Title')).toBe('Create Title');
    });
  });

  describe('getFormDescription', () => {
    it('returns the edit description when in edit mode', () => {
      expect(getFormDescription(true, 'Create Description', 'Edit Description')).toBe('Edit Description');
    });

    it('returns the create description when not in edit mode', () => {
      expect(getFormDescription(false, 'Create Description', 'Edit Description')).toBe('Create Description');
    });
  });

  describe('getSubmitButtonText', () => {
    it('returns the submitting text when submitting', () => {
      expect(getSubmitButtonText(true, false, 'Create', 'Update')).toBe('Saving...');
    });

    it('returns the edit text when in edit mode and not submitting', () => {
      expect(getSubmitButtonText(false, true, 'Create', 'Update')).toBe('Update');
    });

    it('returns the create text when not in edit mode and not submitting', () => {
      expect(getSubmitButtonText(false, false, 'Create', 'Update')).toBe('Create');
    });

    it('allows custom submitting text', () => {
      expect(getSubmitButtonText(true, false, 'Create', 'Update', 'Processing...')).toBe('Processing...');
    });
  });

  describe('getSuccessMessage', () => {
    it('returns the edit message when in edit mode', () => {
      expect(getSuccessMessage(true, 'Created successfully', 'Updated successfully')).toBe('Updated successfully');
    });

    it('returns the create message when not in edit mode', () => {
      expect(getSuccessMessage(false, 'Created successfully', 'Updated successfully')).toBe('Created successfully');
    });
  });

  describe('getErrorMessage', () => {
    it('returns the edit message when in edit mode', () => {
      expect(getErrorMessage(true, 'Failed to create', 'Failed to update')).toBe('Failed to update');
    });

    it('returns the create message when not in edit mode', () => {
      expect(getErrorMessage(false, 'Failed to create', 'Failed to update')).toBe('Failed to create');
    });
  });
});