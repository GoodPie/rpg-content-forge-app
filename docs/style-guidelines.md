# Style Guidelines for Content Generation Project

## Introduction

This document outlines the style guidelines for the Content Generation project. We use [shadcn/ui](https://ui.shadcn.com/) as our component library, which is built on top of Tailwind CSS. These guidelines will help ensure consistency across the project.

## Design System

### Colors

We use a design system based on CSS variables, which allows for easy theming and dark mode support. The color palette is defined in `src/app/globals.css`:

- **Primary**: Used for primary actions and emphasis
- **Secondary**: Used for secondary actions and less emphasis
- **Accent**: Used for accents and highlights
- **Destructive**: Used for destructive actions (delete, remove)
- **Muted**: Used for backgrounds and less important elements
- **Card**: Used for card backgrounds
- **Popover**: Used for popover backgrounds
- **Border**: Used for borders
- **Input**: Used for input borders
- **Ring**: Used for focus rings

Each color has a foreground variant for text that appears on that color.

#### Using CSS Variables with Tailwind 4

Tailwind 4 introduces a new way to use CSS variables in class names. Instead of using predefined color classes like `bg-background`, we now use the CSS variable directly with the syntax `bg-(--variable-name)`.

Examples:
- Old syntax: `bg-background`, `text-foreground`, `border-border`
- New syntax: `bg-(--background)`, `text-(--foreground)`, `border-(--border)`

This approach provides more flexibility and allows us to use CSS variables directly in our Tailwind classes without having to define them in the theme configuration.

### Typography

We use the Geist font family:

- **Geist Sans**: For regular text
- **Geist Mono**: For code and monospaced text

Font sizes follow the Tailwind CSS scale.

### Spacing

We follow the Tailwind CSS spacing scale for consistency.

### Border Radius

We use the following border radius values:

- **sm**: `calc(var(--radius) - 4px)`
- **md**: `calc(var(--radius) - 2px)`
- **lg**: `var(--radius)`

Where `--radius` is set to `0.5rem` by default.

## Components

### Button

The Button component is a versatile component that can be used for actions. It supports different variants, sizes, and states.

#### Variants

- **default/primary**: Used for primary actions
- **secondary**: Used for secondary actions
- **outline**: Used for less emphasized actions
- **ghost**: Used for the least emphasized actions
- **link**: Used for actions that look like links
- **destructive**: Used for destructive actions

#### Sizes

- **default/md**: Standard size
- **sm**: Small size
- **lg**: Large size
- **icon**: Square button for icons

#### Props

- **variant**: The button variant
- **size**: The button size
- **isLoading**: Whether the button is in a loading state
- **leftIcon**: Icon to display on the left side of the button
- **rightIcon**: Icon to display on the right side of the button
- **asChild**: Whether to render the button as a child component
- **disabled**: Whether the button is disabled

#### Example

```tsx
import { Button } from "@/components/ui/button";

// Primary button
<Button>Click me</Button>

// Secondary button
<Button variant="secondary">Click me</Button>

// Outline button
<Button variant="outline">Click me</Button>

// Ghost button
<Button variant="ghost">Click me</Button>

// Link button
<Button variant="link">Click me</Button>

// Destructive button
<Button variant="destructive">Delete</Button>

// Small button
<Button size="sm">Small</Button>

// Large button
<Button size="lg">Large</Button>

// Icon button
<Button size="icon">🔍</Button>

// Loading button
<Button isLoading>Loading</Button>

// Disabled button
<Button disabled>Disabled</Button>

// Button with left icon
<Button leftIcon="🔍">Search</Button>

// Button with right icon
<Button rightIcon="→">Next</Button>
```

## Utility Functions

### cn

The `cn` function is a utility function that combines multiple class names and properly merges Tailwind CSS classes. It's used throughout the project for combining class names.

```tsx
import { cn } from "@/lib/utils";

// Combine class names
const className = cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
);
```

## Storybook

We use Storybook for developing and testing UI components in isolation. To run Storybook:

```bash
npm run storybook
```

This will start Storybook on port 6006. You can view the components and their documentation at http://localhost:6006.

## CSS Variables Best Practices

1. **Use the new syntax for CSS variables**: When applying CSS variables directly in your HTML or component templates, use the new Tailwind 4 syntax: `bg-(--background)` instead of `bg-background`.

2. **Define CSS variables outside of @layer base**: In Tailwind 4, CSS variables should be defined outside of @layer base. Move your `:root` and `.dark` selectors out of @layer base.

3. **Wrap color values in hsl() or oklch()**: When defining color values in CSS variables, wrap them in hsl() or oklch() functions:
   ```css
   :root {
     --background: hsl(0 0% 100%);
     /* or */
     --background: oklch(1 0 0);
   }
   ```

4. **Use @theme inline directive**: Use the @theme inline directive to define theme variables that reference your CSS variables:
   ```css
   @theme inline {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
   }
   ```

5. **Remove hsl() wrappers from @theme variables**: When using the @theme directive, don't wrap the variables in hsl():
   ```css
   /* Correct */
   @theme inline {
     --color-background: var(--background);
   }

   /* Incorrect */
   @theme inline {
     --color-background: hsl(var(--background));
   }
   ```

6. **Use the size-* utility**: Tailwind 4 introduces the size-* utility which can replace w-* and h-* when both dimensions are the same:
   ```html
   <!-- Old syntax -->
   <div class="w-4 h-4"></div>

   <!-- New syntax -->
   <div class="size-4"></div>
   ```

7. **Use function components instead of forwardRef**: In shadcn/ui components, use function components instead of forwardRef:
   ```tsx
   // Old syntax with forwardRef
   const Component = React.forwardRef<HTMLDivElement, Props>(
     ({ className, ...props }, ref) => (
       <div ref={ref} className={cn("...", className)} {...props} />
     )
   );

   // New syntax with function component
   function Component({ className, ...props }: Props) {
     return (
       <div data-slot="component" className={cn("...", className)} {...props} />
     );
   }
   ```

8. **Add data-slot attributes**: Add data-slot attributes to components to make them easier to style with Tailwind:
   ```tsx
   <div data-slot="card" className="...">...</div>
   ```

9. **Avoid mixing syntaxes**: Try to be consistent with the syntax you use. If you're working on a new component, use the new syntax. If you're modifying an existing component that uses the old syntax, consider updating it to the new syntax.

10. **Custom CSS variables**: When creating custom CSS variables, define them in the `:root` selector in `globals.css` and use them with the new syntax.

## Example of Using CSS Variables

```tsx
// Using CSS variables in a component
<div className="bg-(--background) text-(--foreground) border-(--border)">
  <h1 className="text-(--primary)">Hello World</h1>
  <p className="text-(--muted-foreground)">This is a paragraph with muted text.</p>
  <button className="bg-(--primary) text-(--primary-foreground) hover:bg-(--primary)/90">
    Click me
  </button>
</div>
```

## Component Definitions

When defining components, use arrow function notation instead of function declarations. This provides better consistency and aligns with modern React practices.

### Preferred (Arrow Function):

```tsx
export interface MyComponentProps {
  title: string;
  description: string;
}

export const MyComponent = ({ title, description }: MyComponentProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
```

### Avoid (Function Declaration):

```tsx
export interface MyComponentProps {
  title: string;
  description: string;
}

export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

### Benefits of Arrow Functions:

1. **Consistency**: Provides a consistent style across the codebase
2. **Conciseness**: More concise syntax, especially for simple components
3. **Explicit exports**: Makes exports more explicit when combined with named exports
4. **TypeScript integration**: Works well with TypeScript interfaces and type definitions

## Best Practices

1. **Use the design system**: Stick to the colors, typography, and spacing defined in the design system.
2. **Use the components**: Use the provided components instead of creating new ones when possible.
3. **Use the utility functions**: Use the provided utility functions for consistency.
4. **Document components**: Add documentation to components using JSDoc comments.
5. **Create stories**: Create Storybook stories for new components to showcase their usage.
6. **Follow accessibility guidelines**: Ensure components are accessible by using proper ARIA attributes and keyboard navigation.
7. **Test components**: Test components in different states and edge cases.
8. **Responsive design**: Ensure components work well on different screen sizes.
9. **Dark mode**: Ensure components work well in both light and dark mode.
10. **Performance**: Optimize components for performance by minimizing re-renders and using memoization when necessary.

## Conclusion

Following these style guidelines will help ensure consistency across the project and make it easier for developers to work together. If you have any questions or suggestions, please reach out to the team.
