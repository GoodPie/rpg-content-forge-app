# Encounter Components

This directory contains components related to encounters in the RPG Content Forge application.

## EncounterTag Component

The `EncounterTag` component is used to display tags associated with encounters. It builds on the common `Tag` component and provides a specialized interface for encounter tags.

### Usage

```tsx
import EncounterTag from "@/components/features/encounters/encounter-tag";

// Basic usage
<EncounterTag tag="forest" />

// With color
<EncounterTag tag="combat" color="red" />
<EncounterTag tag="quest" color="blue" />
<EncounterTag tag="npc" color="green" />
<EncounterTag tag="treasure" color="yellow" />
<EncounterTag tag="magic" color="purple" />
<EncounterTag tag="trap" color="gray" />

// With variant
<EncounterTag tag="forest" variant="default" />
<EncounterTag tag="forest" variant="secondary" />
<EncounterTag tag="forest" variant="destructive" />
<EncounterTag tag="forest" variant="outline" />

// Combined
<EncounterTag tag="forest" variant="secondary" color="blue" />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | `string` | - | The tag text to display |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline"` | `"outline"` | The visual style variant of the tag |
| `color` | `"default" \| "red" \| "green" \| "blue" \| "yellow" \| "purple" \| "gray"` | `"default"` | The color of the tag |
| `className` | `string` | - | Additional CSS classes to apply |

### Implementation Details

The `EncounterTag` component is built on top of the common `Tag` component, which itself uses the `Badge` component from shadcn/ui. It provides a specialized interface for encounter tags, taking a `tag` prop instead of `children`.

### Example: Automatic Color Assignment

You can automatically assign colors to tags based on their content for visual variety:

```tsx
{tags.map((tag) => {
  // Assign different colors based on tag content
  const colors = ["red", "green", "blue", "yellow", "purple", "gray"];
  const colorIndex = tag.length % colors.length;
  return (
    <EncounterTag 
      key={tag} 
      tag={tag} 
      color={colors[colorIndex]}
    />
  );
})}
```

This approach creates a visually appealing and consistent color scheme for tags while maintaining readability.