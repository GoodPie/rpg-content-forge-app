# Prisma Database Setup

This project uses Prisma ORM with SQLite for data persistence. This README explains how the database is set up and how to work with it.

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Currently, it includes the following models:

### Encounter

Represents an encounter template with the following fields:
- `id`: String (UUID) - Primary key
- `name`: String - Name of the encounter
- `description`: String - Description of the encounter
- `tags`: String - Comma-separated list of tags
- `content`: String - The content/body of the encounter
- `createdAt`: DateTime - When the encounter was created
- `updatedAt`: DateTime - When the encounter was last updated

## Database File

The SQLite database file is located at `prisma/dev.db`. This is a local file-based database.

## Working with the Database

### Prisma Client

The Prisma Client is generated in the `generated/prisma` directory. It provides type-safe access to the database.

A singleton instance of the Prisma Client is exported from `src/lib/prisma.ts`. Import it in your code like this:

```typescript
import { prisma } from '@/lib/prisma';
```

### Server Actions

Database operations are performed through server actions. The following server actions are available:

- `createEncounter`: Creates a new encounter in the database (defined in `src/app/template-editor/encounters/actions.ts`)

### Migrations

To make changes to the database schema:

1. Edit the `prisma/schema.prisma` file
2. Run `npx prisma migrate dev --name <migration-name>` to create and apply a migration

### Prisma Studio

You can use Prisma Studio to view and edit the database directly:

```
npx prisma studio
```

## Implementation Details

- The encounters list page (`src/app/template-editor/encounters/page.tsx`) fetches encounters from the database.
- The new encounter page (`src/app/template-editor/encounters/new/page.tsx`) saves new encounters to the database using the `createEncounter` server action.
- Tags are stored as comma-separated values in the database and converted to/from arrays in the application code.