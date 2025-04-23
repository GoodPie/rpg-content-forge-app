# Navigation Components Testing

This directory contains tests for the navigation components of the application. The tests are organized into three levels:

1. **Unit Tests**: Testing individual components and functions in isolation
2. **Integration Tests**: Testing how components work together
3. **End-to-End Tests**: Testing the complete user experience in a browser environment

## Test Files

- `navigation-links.test.tsx`: Unit tests for the navigation links components and utilities
- `header.test.tsx`: Integration tests for the header component
- `sidebar.test.tsx`: Integration tests for the sidebar component
- `/cypress/e2e/navigation.cy.ts`: End-to-end tests for navigation functionality

## Testing Strategy

### Unit Tests

The unit tests focus on testing individual components and functions in isolation:

- Testing the `NavigationItem` type and `mainNavigationItems` array
- Testing the `getFeatureNavigationItems` function for different features
- Testing the `DesktopNavLink`, `MobileNavLink`, and `SidebarNavLink` components in both active and inactive states

### Integration Tests

The integration tests focus on how components work together:

- Testing the header component with its navigation links
- Testing the sidebar component with its feature-specific navigation sections
- Testing the mobile menu functionality
- Testing the active link highlighting

### End-to-End Tests

The end-to-end tests focus on the complete user experience:

- Testing navigation between different sections
- Testing that the correct sidebar navigation is shown for each section
- Testing that active links are highlighted correctly
- Testing the mobile menu functionality in a real browser environment

## Running the Tests

### Unit and Integration Tests

To run the unit and integration tests:

```bash
npm test
```

Or to run tests for a specific file:

```bash
npm test -- src/components/layout/__tests__/navigation-links.test.tsx
npm test -- src/components/layout/__tests__/header.test.tsx
npm test -- src/components/layout/__tests__/sidebar.test.tsx
```

### End-to-End Tests

To run the end-to-end tests:

```bash
npm run cypress:open
```

Then select the `navigation.cy.ts` test file to run.

## Test Coverage

These tests cover:

- All navigation components (desktop, mobile, sidebar)
- All navigation link states (active, inactive)
- All navigation sections (template editor, procedural generator, content simulator, content database, export manager)
- Mobile responsiveness and menu functionality
- Navigation between different sections
- Active link highlighting

## Maintenance

When making changes to the navigation components:

1. Update the unit tests if you change the component props or behavior
2. Update the integration tests if you change how components interact
3. Update the end-to-end tests if you change the user experience

Always run the tests after making changes to ensure everything still works correctly.