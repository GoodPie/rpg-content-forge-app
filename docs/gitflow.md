# Gitflow Workflow for Content Generation Project

## Introduction

This document outlines the gitflow workflow we'll be using for the Content Generation project. Gitflow is a branching model that provides a robust framework for managing larger projects. It defines specific branch roles and how they should interact.

## Branch Structure

### Main Branches

- **main**: The production branch containing the stable, released code.
- **develop**: The integration branch for features in development.

### Supporting Branches

- **feature/**: For developing new features. Branch from `develop` and merge back into `develop`.
  - Naming convention: `feature/feature-name`
  - Example: `feature/shadcn-ui-implementation`

- **release/**: For preparing a new production release. Branch from `develop` and merge into both `main` and `develop`.
  - Naming convention: `release/version-number`
  - Example: `release/1.0.0`

- **hotfix/**: For fixing critical bugs in production. Branch from `main` and merge into both `main` and `develop`.
  - Naming convention: `hotfix/bug-description`
  - Example: `hotfix/login-error`

## Workflow

### Feature Development

1. Create a feature branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b feature/feature-name
   ```

2. Develop the feature with regular commits.

3. When the feature is complete, create a pull request to merge into `develop`.

4. After code review and approval, merge the feature branch into `develop`.

### Release Process

1. Create a release branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b release/version-number
   ```

2. Make any final adjustments, version bumps, and documentation updates.

3. Create a pull request to merge into `main`.

4. After approval, merge the release branch into `main` and tag the release:
   ```
   git tag -a v1.0.0 -m "Version 1.0.0"
   git push origin v1.0.0
   ```

5. Also merge the release branch back into `develop` to incorporate any changes made during the release process.

### Hotfix Process

1. Create a hotfix branch from `main`:
   ```
   git checkout main
   git pull
   git checkout -b hotfix/bug-description
   ```

2. Fix the bug with minimal changes.

3. Create pull requests to merge into both `main` and `develop`.

4. After approval, merge the hotfix branch into both branches and tag the new version on `main`.

## Commit Message Guidelines

We follow the Conventional Commits specification for commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

Format: `type(scope): description`

Example: `feat(ui): add button component`

## Pull Request Process

1. Ensure all tests pass before submitting a pull request.
2. Update documentation as necessary.
3. Require at least one code review before merging.
4. Use squash merging to keep the history clean.

## Conclusion

Following this gitflow workflow will help us maintain a clean, organized codebase and streamline our development process. It provides clear guidelines for how to handle different types of changes and ensures that our main branch always contains stable, production-ready code.