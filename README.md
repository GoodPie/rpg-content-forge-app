# RPG Content Forge

A Next.js application for creating, managing, and exporting modular content packs for text-based adventure games with a focus on procedural generation.

## Overview

RPG Content Forge provides a comprehensive environment for developing procedurally generated encounters, locations, NPCs, items, and other game elements through a template-based approach. The tool emphasizes procedural generation at every level, allowing a small amount of authored content to create virtually unlimited unique player experiences.

### Core Principles

- **Procedurality**: All content is designed for maximum procedural variation
- **Modularity**: Content is organized in discrete, combinable packs
- **Extensibility**: The system can be expanded to support new content types
- **Usability**: Accessible for both technical and non-technical content creators
- **Portability**: Content packs can be exported in standard formats
- **Collaboration**: Support for team-based content development
- **Open Standards**: Well-documented formats for community extension

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- SQLite (included, no separate installation required)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/GoodPie/rpg-content-forge-app
   cd rpg-content-forge-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3001](http://localhost:3000) in your browser to see the application.

## Features

### Template Editor
GUI for creating and editing procedural content templates with support for variables, conditions, and branching narratives.

### Procedural Generator
Previews and tests variations of templates with tools for analyzing procedural potential and optimizing variation.

### Content Simulator
Tests content with the D20 system in simulated gameplay to ensure quality and balance.

### Content Database
Persistent storage for all templates and assets with organization and metadata management. Uses Prisma ORM with SQLite for efficient data storage and retrieval.

### Export Manager
Packages content for use in games with multiple export formats and optimization options.

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [Project Summary](./docs/project-summary.md): Overview of the project, its components, and development approach
- [Requirements Analysis](./docs/requirements-analysis.md): Detailed analysis of the project requirements
- [Task List](./docs/task-list.md): Comprehensive list of tasks for each development phase
- [Project Guidelines](./docs/project-guidelines.md): Standards and best practices for development
- [User Guides](./docs/user-guides/): Documentation for each feature
- [Database Setup](./prisma/README.md): Information about the Prisma ORM setup and database schema

## Development

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Shared components
│   ├── ui/                 # UI components
│   ├── layout/             # Layout components
│   └── features/           # Feature-specific components
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions and libraries
│   └── prisma.ts           # Prisma client singleton
├── types/                  # TypeScript type definitions
├── styles/                 # Global styles and Tailwind config
└── docs/                   # Documentation
    ├── user-guides/        # User guides for features
    └── ...
prisma/                     # Prisma ORM configuration
├── schema.prisma           # Database schema
├── migrations/             # Database migrations
└── dev.db                  # SQLite database file
generated/                  # Generated code
└── prisma/                 # Generated Prisma client
```

### Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues

### Database Commands

- `npx prisma studio`: Open Prisma Studio to view and edit the database
- `npx prisma migrate dev`: Create and apply a new migration after schema changes
- `npx prisma generate`: Generate the Prisma client after schema changes

## Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Prisma
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma ORM.
- [Prisma with Next.js](https://www.prisma.io/nextjs) - best practices for using Prisma with Next.js.
