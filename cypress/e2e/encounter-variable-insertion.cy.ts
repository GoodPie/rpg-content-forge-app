describe('Encounter Variable Insertion', () => {
  beforeEach(() => {
    // Create a test variable library and variable if they don't exist
    cy.request('POST', '/api/test/setup-variable-library', {
      name: 'Test Library',
      description: 'Test library for e2e tests',
      variables: [
        {
          name: 'test_variable',
          description: 'Test variable for e2e tests',
          values: [
            { text: 'test value 1', weight: 1 },
            { text: 'test value 2', weight: 1 }
          ]
        }
      ]
    });

    // Visit the new encounter page
    cy.visit('/template-editor/encounters/new');
  });

  it('displays the Insert Variable button', () => {
    // Check that the Insert Variable button is displayed
    cy.contains('button', 'Insert Variable').should('be.visible');
  });

  it('opens the variable selector modal when the Insert Variable button is clicked', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Check that the modal is displayed
    cy.contains('h2', 'Insert Variable').should('be.visible');
    cy.get('input[placeholder="Search variables..."]').should('be.visible');
  });

  it('displays variable libraries in the modal', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Check that the test library is displayed
    cy.contains('Test Library').should('be.visible');
  });

  it('displays variables for the selected library', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Check that the test variable is displayed
    cy.contains('test_variable').should('be.visible');
    cy.contains('Test variable for e2e tests').should('be.visible');
  });

  it('inserts a variable at the cursor position when selected', () => {
    // Type some text in the content textarea
    cy.get('textarea[name="content"]').clear().type('The forest has trees.');
    
    // Place cursor after "has " (before "trees")
    cy.get('textarea[name="content"]').then($textarea => {
      const textarea = $textarea[0];
      textarea.setSelectionRange(13, 13);
      textarea.focus();
    });
    
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Click on the test variable
    cy.contains('test_variable').click();
    
    // Check that the variable was inserted at the cursor position
    cy.get('textarea[name="content"]').should('have.value', 'The forest has {{test_variable}} trees.');
  });

  it('replaces selected text with the variable when text is selected', () => {
    // Type some text in the content textarea
    cy.get('textarea[name="content"]').clear().type('The forest has oak trees.');
    
    // Select "oak"
    cy.get('textarea[name="content"]').then($textarea => {
      const textarea = $textarea[0];
      textarea.setSelectionRange(14, 17);
      textarea.focus();
    });
    
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Click on the test variable
    cy.contains('test_variable').click();
    
    // Check that the selected text was replaced with the variable
    cy.get('textarea[name="content"]').should('have.value', 'The forest has {{test_variable}} trees.');
  });

  it('closes the modal when a variable is selected', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Check that the modal is displayed
    cy.contains('h2', 'Insert Variable').should('be.visible');
    
    // Click on the test variable
    cy.contains('test_variable').click();
    
    // Check that the modal is closed
    cy.contains('h2', 'Insert Variable').should('not.exist');
  });

  it('closes the modal when the Cancel button is clicked', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Check that the modal is displayed
    cy.contains('h2', 'Insert Variable').should('be.visible');
    
    // Click the Cancel button
    cy.contains('button', 'Cancel').click();
    
    // Check that the modal is closed
    cy.contains('h2', 'Insert Variable').should('not.exist');
  });

  it('filters variables based on search term', () => {
    // Click the Insert Variable button
    cy.contains('button', 'Insert Variable').click();
    
    // Type in the search input
    cy.get('input[placeholder="Search variables..."]').type('test');
    
    // Check that the test variable is displayed
    cy.contains('test_variable').should('be.visible');
    
    // Clear the search and type something that won't match
    cy.get('input[placeholder="Search variables..."]').clear().type('nonexistent');
    
    // Check that the test variable is not displayed
    cy.contains('test_variable').should('not.exist');
    cy.contains('No variables match your search.').should('be.visible');
  });
});