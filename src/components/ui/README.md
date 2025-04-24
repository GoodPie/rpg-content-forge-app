# UI Components

This directory contains reusable UI components for the Content Generation project. These components are designed to be used across multiple pages to ensure consistency and reduce duplication.

## Core Components

### PageHeader

A consistent page header with title and description.

```tsx
import { PageHeader } from "@/components/ui/page-header";

<PageHeader 
  title="Page Title" 
  description="Page description text goes here."
/>
```

### FeatureGrid

A grid of feature cards for showcasing features or options.

```tsx
import { FeatureGrid } from "@/components/ui/feature-grid";

const features = [
  {
    title: "Feature 1",
    description: "Description of feature 1",
    href: "/feature-1",
    icon: <SomeIcon />
  },
  // More features...
];

<FeatureGrid features={features} />
```

### EmptyState

A message shown when no data is available.

```tsx
import { EmptyState } from "@/components/ui/empty-state";

<EmptyState 
  title="Optional Title"
  message="No items found." 
  submessage="Create a new item to get started."
  actions={[
    { label: "Create Item", href: "/create", variant: "default" },
    { label: "Learn More", href: "/docs", variant: "outline" }
  ]}
/>
```

### InfoCard

A card with title and description for displaying information.

```tsx
import { InfoCard } from "@/components/ui/info-card";

<InfoCard 
  title="Card Title" 
  description="Card description text."
>
  {/* Optional additional content */}
</InfoCard>
```

### StatCard

A card showing statistics with progress bars.

```tsx
import { StatCard } from "@/components/ui/stat-card";

const stats = [
  { label: "Completed", value: "5", percentage: 50 },
  { label: "In Progress", value: "3", percentage: 30 },
  { label: "Not Started", value: "2", percentage: 20 }
];

<StatCard title="Project Stats" stats={stats} />
```

### StepIndicator

A numbered step with title and description.

```tsx
import { StepIndicator } from "@/components/ui/step-indicator";

<StepIndicator 
  number={1} 
  title="Step Title" 
  description="Step description text."
/>
```

### StepList

A list of numbered steps.

```tsx
import { StepList } from "@/components/ui/step-list";

const steps = [
  { title: "Step 1", description: "Description of step 1" },
  { title: "Step 2", description: "Description of step 2" },
  // More steps...
];

<StepList title="Getting Started" steps={steps} />
```

### SectionTitle

A consistent section title.

```tsx
import { SectionTitle } from "@/components/ui/section-title";

<SectionTitle title="Section Title" />
```

## Form Components

### SelectField

A labeled select input field.

```tsx
import { SelectField } from "@/components/ui/select-field";

<SelectField 
  id="my-select" 
  label="Select Option" 
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" }
  ]}
  defaultValue="option1"
  onChange={(e) => console.log(e.target.value)}
/>
```

### CheckboxField

A labeled checkbox input.

```tsx
import { CheckboxField } from "@/components/ui/checkbox-field";

<CheckboxField 
  id="my-checkbox" 
  label="Enable Feature" 
  defaultChecked={true}
  onChange={(e) => console.log(e.target.checked)}
/>
```

### Tag

A versatile component for displaying labels, categories, or statuses with customizable colors and variants.

```tsx
import { Tag } from "@/components/ui/tag";

// Basic usage
<Tag>Default Tag</Tag>

// With color
<Tag color="red">Red Tag</Tag>
<Tag color="green">Green Tag</Tag>
<Tag color="blue">Blue Tag</Tag>
<Tag color="yellow">Yellow Tag</Tag>
<Tag color="purple">Purple Tag</Tag>
<Tag color="gray">Gray Tag</Tag>

// With variant
<Tag variant="default">Default Variant</Tag>
<Tag variant="secondary">Secondary Variant</Tag>
<Tag variant="destructive">Destructive Variant</Tag>
<Tag variant="outline">Outline Variant</Tag>

// Combined
<Tag color="blue" variant="secondary">Blue Secondary Tag</Tag>
```

Props:
- `children`: React.ReactNode - The content of the tag
- `variant`: "default" | "secondary" | "destructive" | "outline" - The visual style variant (default: "outline")
- `color`: "default" | "red" | "green" | "blue" | "yellow" | "purple" | "gray" - The color of the tag (default: "default")
- `className`: string - Additional CSS classes to apply

## Best Practices

1. **Use Consistent Components**: Use these components instead of creating new ones for similar purposes.
2. **Follow DRY Principles**: Don't repeat yourself. If you find yourself copying and pasting UI code, consider extracting it into a reusable component.
3. **Maintain Styling Consistency**: These components use the project's design system. Maintain this consistency when creating new components.
4. **Document New Components**: If you create a new reusable component, add it to this README with usage examples.
