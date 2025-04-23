# Content Creation Tool Project Guidelines

This document outlines the standards, conventions, and best practices for developing the Content Creation Tool (CCT) using Next.js and Tailwind CSS.

## 1. Coding Standards

### 1.1 TypeScript

- Use TypeScript for all code files
- Define explicit types for all function parameters and return values
- Use interfaces for complex object structures
- Avoid using `any` type; use proper type definitions or generics
- Use type guards for runtime type checking when necessary
- Leverage TypeScript's utility types (Partial, Readonly, etc.) when appropriate

```typescript
// Good example
interface TemplateProps {
  id: string;
  name: string;
  type: 'encounter' | 'location' | 'npc' | 'item' | 'quest';
  tags: string[];
}

function getTemplate(id: string): Promise<TemplateProps> {
  // Implementation
}

// Bad example
function getTemplate(id): any {
  // Implementation
}
```

### 1.2 React and Next.js

- Use functional components with hooks
- Implement proper error boundaries
- Use Next.js App Router conventions for routing
- Leverage server components where appropriate
- Use client components only when necessary (interactivity, browser APIs)
- Implement proper loading and error states
- Use React Context for global state when appropriate

```tsx
// Good example
'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function TemplateEditor({ templateId }: { templateId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Implementation
  
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        // Component content
      )}
    </ErrorBoundary>
  );
}
```

### 1.3 Tailwind CSS

- Use Tailwind utility classes for styling
- Create custom components for repeated UI patterns
- Use consistent spacing and sizing scales
- Implement responsive design using Tailwind breakpoints
- Use Tailwind's dark mode utilities for theme support
- Avoid inline styles; use Tailwind classes instead
- Use CSS variables for theme colors and other design tokens

```tsx
// Good example
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
  Save Template
</button>

// Bad example
<button style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white' }}>
  Save Template
</button>
```

### 1.4 Code Organization

- Use feature-based folder structure
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use barrel exports (index.ts files) for cleaner imports
- Separate business logic from UI components
- Use consistent naming conventions

## 2. Component Structure

### 2.1 Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── template-editor/    # Template editor route
│   ├── procedural-generator/ # Procedural generator route
│   └── ...                 # Other routes
├── components/             # Shared components
│   ├── ui/                 # UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/             # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── ...
│   └── features/           # Feature-specific components
│       ├── template-editor/
│       ├── procedural-generator/
│       └── ...
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions and libraries
│   ├── procedural/         # Procedural generation utilities
│   ├── database/           # Database utilities
│   └── ...
├── types/                  # TypeScript type definitions
├── styles/                 # Global styles and Tailwind config
└── docs/                   # Documentation
    ├── user-guides/        # User guides for features
    └── ...
```

### 2.2 Component Guidelines

- Each component should have a single responsibility
- Components should be composable and reusable
- Use proper prop typing with TypeScript interfaces
- Implement proper loading, error, and empty states
- Use consistent naming conventions:
  - PascalCase for component names
  - camelCase for functions and variables
  - kebab-case for file names
- Document complex components with JSDoc comments

```tsx
/**
 * TemplateEditor component for creating and editing templates
 * 
 * @param templateId - The ID of the template to edit, or undefined for a new template
 * @param onSave - Callback function called when the template is saved
 */
export function TemplateEditor({
  templateId,
  onSave,
}: {
  templateId?: string;
  onSave: (template: TemplateProps) => void;
}) {
  // Implementation
}
```

## 3. Testing Protocols

### 3.1 Testing Framework

- Use Jest for unit and integration testing
- Use React Testing Library for component testing
- Use Cypress for end-to-end testing
- Implement test coverage reporting

### 3.2 Testing Guidelines

- Write tests for all components and utilities
- Follow the testing pyramid:
  - Many unit tests
  - Fewer integration tests
  - Fewer end-to-end tests
- Test user interactions and workflows
- Test edge cases and error handling
- Use mock data and services for testing
- Implement snapshot testing for UI components
- Test accessibility with appropriate tools

### 3.3 Test Structure

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { TemplateEditor } from './template-editor';

describe('TemplateEditor', () => {
  it('renders the editor with empty state when no templateId is provided', () => {
    render(<TemplateEditor onSave={jest.fn()} />);
    
    expect(screen.getByText('New Template')).toBeInTheDocument();
    // More assertions
  });
  
  it('loads template data when templateId is provided', async () => {
    // Test implementation
  });
  
  it('calls onSave with updated template when save button is clicked', async () => {
    // Test implementation
  });
  
  // More tests
});
```

### 3.4 Test Coverage

- Aim for at least 80% test coverage
- Focus on testing business logic and user interactions
- Include tests for error handling and edge cases
- Run tests automatically in CI/CD pipeline

## 4. Documentation Standards

### 4.1 Code Documentation

- Use JSDoc comments for functions, components, and complex code
- Document parameters, return values, and exceptions
- Include examples for complex functions
- Document any non-obvious behavior or edge cases

### 4.2 User Guides

- Create markdown files for each feature
- Include screenshots and examples
- Use clear, concise language
- Structure guides with headings, lists, and code blocks
- Include troubleshooting sections for common issues
- Update guides when features change

### 4.3 User Guide Structure

Each user guide should follow this structure:

1. **Overview**: Brief description of the feature
2. **Getting Started**: Basic usage instructions
3. **Key Concepts**: Explanation of important concepts
4. **Step-by-Step Guide**: Detailed instructions with examples
5. **Advanced Usage**: More complex use cases
6. **Troubleshooting**: Common issues and solutions
7. **Reference**: Detailed reference information

### 4.4 Documentation Process

- Create documentation alongside feature development
- Review and update documentation during code review
- Maintain a changelog for significant updates
- Use consistent terminology throughout documentation
- Include version information when relevant

## 5. Git Workflow

### 5.1 Branching Strategy

- Use `main` branch for production-ready code
- Use `develop` branch for development
- Create feature branches from `develop`
- Use pull requests for code review
- Merge back to `develop` after review
- Periodically merge `develop` to `main` for releases

### 5.2 Commit Guidelines

- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issue numbers in commit messages
- Keep commits focused on a single change
- Use conventional commit format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks

### 5.3 Pull Request Process

- Create descriptive pull request titles
- Include a summary of changes
- Reference related issues
- Add appropriate reviewers
- Ensure all tests pass
- Address review comments
- Squash commits before merging if necessary

## 6. Performance Guidelines

### 6.1 Frontend Performance

- Use Next.js image optimization
- Implement code splitting and lazy loading
- Optimize component rendering
- Use memoization for expensive calculations
- Implement virtualization for long lists
- Monitor and optimize bundle size

### 6.2 Procedural Generation Performance

- Implement caching for generated content
- Use web workers for intensive calculations
- Optimize algorithms for performance
- Implement pagination and lazy loading for large datasets
- Add progress indicators for long-running operations

## 7. Accessibility Guidelines

- Follow WCAG 2.1 AA standards
- Implement proper semantic HTML
- Use appropriate ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast
- Provide text alternatives for non-text content
- Ensure responsive design works at all screen sizes

## 8. Security Guidelines

- Validate all user input
- Implement proper authentication and authorization
- Use HTTPS for all API requests
- Avoid storing sensitive data in local storage
- Keep dependencies updated
- Follow security best practices for Next.js applications