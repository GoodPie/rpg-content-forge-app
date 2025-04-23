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