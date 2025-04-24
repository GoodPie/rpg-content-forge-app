# Variables User Guide

## Overview

Variables are a powerful feature in RPG Content Forge that allow you to create dynamic, procedurally generated content. By defining variables with multiple possible values, you can create templates that produce different text each time they're used, greatly increasing the variety and replayability of your content.

## Key Concepts

### Variable Libraries

Variable libraries are collections of related variables. For example, you might create a "Forest Descriptions" library containing variables for forest states, sounds, features, and atmospheres.

Libraries help you:
- Organize variables by theme or purpose
- Reuse variables across multiple templates
- Share variables with other content creators

### Variables

A variable is a named placeholder that can be replaced with different values. For example, a variable named `forest_state` might be replaced with "misty", "dense", "shadowy", or other descriptive terms.

Variables have:
- A unique name (must start with a letter and contain only letters, numbers, and underscores)
- An optional description explaining their purpose
- Multiple possible values

### Variable Values

Each variable can have multiple possible values. When the variable is used in a template, one of these values is randomly selected.

Values can have:
- Text content (the text that replaces the variable)
- An optional condition (determines when this value can be used)
- A weight (controls how likely this value is to be selected)

## Creating and Managing Variables

### Creating a Variable Library

1. Navigate to **Content Database > Variable Libraries**
2. Click the **New Library** button
3. Enter a name and description for your library
4. Optionally add tags to help categorize your library
5. Click **Create Library**

### Adding Variables to a Library

1. Open a variable library
2. Click the **Variables** tab
3. Click the **Add Variable** button
4. Enter a name and optional description for your variable
5. Click **Create Variable**

### Adding Values to a Variable

1. Open a variable
2. Click the **Add Value** button
3. Enter the text for this value
4. Optionally add a condition and weight
5. Click **Add Value**

## Using Variables in Templates

To use a variable in a template, wrap the variable name in double curly braces:

```
As you walk through the {{forest_state}} forest, you hear {{forest_sounds}} in the distance.
```

When this template is processed, the variables will be replaced with random values:

```
As you walk through the misty forest, you hear rustling leaves in the distance.
```

Or:

```
As you walk through the dense forest, you hear bird calls in the distance.
```

### Conditional Values

Conditional values are only used when their condition is true. This allows you to create context-sensitive content that adapts to the game state.

For example, you might have a value for `forest_state` that's only used at night:

- Value: "moonlit"
- Condition: "time_of_day == night"

Conditions can use various operators:
- Equality: `==`, `!=`
- Comparison: `>`, `<`, `>=`, `<=`
- Contains: `contains`
- In: `in`

Examples:
- `time_of_day == night`
- `player_level > 5`
- `season == winter`
- `player_class == wizard`
- `location_type contains forest`

### Weighted Values

Weights control how likely a value is to be selected. Higher weights make a value more likely to appear.

For example, if you want "dense" to appear more often than other forest states:

- Value: "dense", Weight: 2.0
- Value: "misty", Weight: 1.0
- Value: "shadowy", Weight: 1.0

In this example, "dense" is twice as likely to be selected as "misty" or "shadowy".

## Advanced Usage

### Nested Variables

You can use variables within other variable values to create even more variation:

```
Variable: weather_condition
Values:
- "{{rain_intensity}} rain"
- "{{snow_intensity}} snow"
- "clear skies"

Variable: rain_intensity
Values:
- "light"
- "moderate"
- "heavy"
- "torrential"

Variable: snow_intensity
Values:
- "light"
- "moderate"
- "heavy"
- "blizzard-like"
```

When `{{weather_condition}}` is used, it might be replaced with "heavy rain", "light snow", or "clear skies".

### Seasonal and Time-Based Variations

Use conditions to create variations based on season or time of day:

```
Variable: forest_description
Values:
- "The trees are bare, their branches reaching like skeletal fingers into the gray sky." (Condition: "season == winter")
- "Vibrant green leaves rustle in the gentle breeze, and wildflowers dot the forest floor." (Condition: "season == spring")
- "Thick foliage provides welcome shade from the summer heat." (Condition: "season == summer")
- "A carpet of red and gold leaves crunches underfoot." (Condition: "season == autumn")
- "Long shadows stretch across the path as the sun hangs low in the sky." (Condition: "time_of_day == dusk")
- "The forest is bathed in silvery moonlight, transforming familiar shapes into mysterious silhouettes." (Condition: "time_of_day == night")
```

## Best Practices

1. **Use descriptive variable names** that clearly indicate their purpose (e.g., `forest_state` rather than `fs`).

2. **Create focused variables** with a single purpose rather than trying to combine multiple concepts.

3. **Provide diverse options** for each variable to increase variety.

4. **Use conditions judiciously** to create context-sensitive content without making templates too complex.

5. **Balance weights carefully** to ensure a good mix of common and rare variations.

6. **Organize related variables into libraries** for better management and reuse.

7. **Document your variables** with clear descriptions to help others understand how to use them.

## Troubleshooting

### Variable Not Being Replaced

If a variable isn't being replaced in your template:

1. Check that the variable name is spelled correctly and matches the case.
2. Ensure the variable is properly enclosed in double curly braces: `{{variable_name}}`.
3. Verify that the variable has at least one value.
4. If using conditional values, check that at least one value's condition evaluates to true.

### Unexpected Values

If you're seeing unexpected values:

1. Review the variable's values to ensure they're appropriate.
2. Check conditions to make sure they're correctly formatted.
3. Adjust weights if certain values are appearing too frequently or rarely.

## Examples

### Character Description

```
The {{character_age}} {{character_gender}} has {{hair_description}} and {{eye_description}}. {{character_pronoun_subject}} wears {{clothing_description}} and carries {{weapon_description}}.
```

### Weather Description

```
The day is {{temperature}} and {{sky_condition}}. {{weather_effect}}.
```

### Location Description

```
You find yourself in a {{location_size}} {{location_type}}. {{location_feature}} dominates the area. {{location_atmosphere}}.
```

By combining these variables with diverse values and conditions, you can create richly varied descriptions that adapt to different contexts and never feel repetitive.