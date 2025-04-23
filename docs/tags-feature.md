# Tags Feature Documentation

## Overview

The tags feature allows users to categorize and filter encounter templates using descriptive keywords. Tags are stored in a dedicated database table and have a many-to-many relationship with encounters, enabling efficient querying and organization of content.

## Implementation Details

### Database Schema

Tags are implemented using a many-to-many relationship between the `Encounter` and `Tag` models:

```prisma
model Encounter {
  id          String             @id @default(uuid())
  name        String
  description String
  content     String
  tags        EncounterTag[]     // Relation to tags
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt
}

model Tag {
  id           String             @id @default(uuid())
  name         String             @unique
  encounters   EncounterTag[]     // Relation to encounters
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
}

// Junction table for many-to-many relationship between Encounter and Tag
model EncounterTag {
  encounter     Encounter     @relation(fields: [encounterId], references: [id], onDelete: Cascade)
  encounterId   String
  tag           Tag           @relation(fields: [tagId], references: [id], onDelete: Cascade)
  tagId         String

  @@id([encounterId, tagId])
}
```

### Key Features

1. **Unique Tags**: Each tag name is unique in the database, preventing duplication.
2. **Automatic Creation**: When a user adds a new tag to an encounter, the tag is automatically created if it doesn't exist.
3. **Cascading Deletion**: When an encounter is deleted, its tag relationships are automatically removed.
4. **Efficient Querying**: The dedicated tags table allows for efficient filtering and searching of encounters by tags.

### User Interface

In the encounter form, users can add tags as a comma-separated list:

```tsx
<FormField
  control={form.control}
  name="tags"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tags (comma separated)</FormLabel>
      <FormControl>
        <Input placeholder="forest, npc, level1-5" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Data Flow

1. **Form Submission**: Tags are submitted as a comma-separated string.
2. **Backend Processing**: 
   - The string is parsed into an array of tag names.
   - For each tag name, the system either connects to an existing tag or creates a new one.
   - The relationships between encounters and tags are managed through the junction table.
3. **Data Retrieval**: When retrieving encounters, tags are included and transformed into the appropriate format for display.

## Usage Examples

### Adding Tags to an Encounter

When creating or editing an encounter, simply enter tags as a comma-separated list:

```
forest, npc, level1-5
```

### Filtering Encounters by Tags

(Future feature) Users will be able to filter the encounter list by selecting specific tags, making it easier to find relevant content.

## Best Practices

1. **Use Descriptive Tags**: Choose clear, descriptive tags that accurately represent the content.
2. **Consistent Naming**: Use consistent naming conventions for tags (e.g., lowercase, singular form).
3. **Avoid Excessive Tags**: Limit the number of tags per encounter to maintain clarity and relevance.
4. **Categorization**: Consider using tags for different categories:
   - Content type (e.g., combat, puzzle, social)
   - Setting (e.g., forest, dungeon, city)
   - Level range (e.g., level1-5, level6-10)
   - Theme (e.g., mystery, horror, adventure)

## Future Enhancements

1. **Tag Suggestions**: Implement auto-complete suggestions based on existing tags.
2. **Tag Management**: Add a dedicated interface for managing tags (renaming, merging, deleting).
3. **Tag Statistics**: Show usage statistics for tags to help users understand content distribution.
4. **Advanced Filtering**: Allow filtering encounters by multiple tags with AND/OR logic.