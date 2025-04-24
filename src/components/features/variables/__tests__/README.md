# Variable Components Tests

This directory contains tests for the variable-related components in the RPG Content Forge application.

## Test Files

### variable-form.test.tsx
Tests for the `VariableForm` component, which is used to create and edit variables.

Key tests:
- Rendering with default values
- Rendering in edit mode with provided values
- Form validation (required fields, name format)
- UI interactions (showing usage examples, navigation)

### variable-library-form.test.tsx
Tests for the `VariableLibraryForm` component, which is used to create and edit variable libraries.

Key tests:
- Rendering with default values
- Rendering in edit mode with provided values
- Form validation (required fields, field length limits)
- UI interactions (navigation)

### variable-value-form.test.tsx
Tests for the `VariableValueForm` component, which is used to create and edit variable values.

Key tests:
- Rendering with default values
- Rendering in edit mode with provided values
- Form validation (required fields, positive weight)
- UI interactions (showing condition examples, navigation)

## Testing Approach

These tests follow the project's testing guidelines:
- Using Jest and React Testing Library
- Mocking external dependencies (router, toast, server actions)
- Testing both UI rendering and component behavior
- Focusing on user interactions and form validation

## Running Tests

To run these tests, use the following command:

```bash
npm run test -- -t "VariableForm"  # Test specific component
npm run test -- --testPathPattern="variables"  # Test all variable components
```

## Test Coverage

These tests cover:
- Component rendering with different props
- Form validation and error handling
- User interactions (typing, clicking buttons)
- Navigation behavior