# Content Creation Tool

A Next.js application for creating, managing, and exporting modular content packs for text-based adventure games with a focus on procedural generation.

## Overview

The Content Creation Tool (CCT) provides a comprehensive environment for developing procedurally generated encounters, locations, NPCs, items, and other game elements through a template-based approach. The tool emphasizes procedural generation at every level, allowing a small amount of authored content to create virtually unlimited unique player experiences.

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

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/content-creation-tool.git
   cd content-creation-tool
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

### Template Editor
GUI for creating and editing procedural content templates with support for variables, conditions, and branching narratives.

### Procedural Generator
Previews and tests variations of templates with tools for analyzing procedural potential and optimizing variation.

### Content Simulator
Tests content with the D20 system in simulated gameplay to ensure quality and balance.

### Content Database
Local storage for all templates and assets with organization and metadata management.

### Export Manager
Packages content for use in games with multiple export formats and optimization options.

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [Project Summary](./docs/project-summary.md): Overview of the project, its components, and development approach
- [Requirements Analysis](./docs/requirements-analysis.md): Detailed analysis of the project requirements
- [Task List](./docs/task-list.md): Comprehensive list of tasks for each development phase
- [Project Guidelines](./docs/project-guidelines.md): Standards and best practices for development
- [User Guides](./docs/user-guides/): Documentation for each feature

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
├── types/                  # TypeScript type definitions
├── styles/                 # Global styles and Tailwind config
└── docs/                   # Documentation
    ├── user-guides/        # User guides for features
    └── ...
```

### Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues

## Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
