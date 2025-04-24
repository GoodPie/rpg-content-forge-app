describe('Template Editor', () => {
  beforeEach(() => {
    // Visit the template editor page before each test
    cy.visit('/template-editor');
  });

  it('displays the title and description', () => {
    // Check that the title is displayed
    cy.contains('h1', 'Template Editor').should('be.visible');
    
    // Check that the description is displayed
    cy.contains('p', 'Create and edit procedural content templates').should('be.visible');
  });

  it('displays all template types', () => {
    // Check that all template types are displayed
    cy.contains('Encounters').should('be.visible');
    cy.contains('Locations').should('be.visible');
    cy.contains('NPCs').should('be.visible');
    cy.contains('Items').should('be.visible');
    cy.contains('Quests').should('be.visible');
  });

  it('displays encounter count', () => {
    // Check that the encounter count is displayed
    // Note: This test might fail if there are no encounters in the database
    // or if the count is different than expected
    cy.get('a[href="/template-editor/encounters"]')
      .find('span')
      .should('exist');
  });

  it('displays recent templates section', () => {
    // Check that the recent templates section is displayed
    cy.contains('Recent Templates').should('be.visible');
  });

  it('navigates to encounters page', () => {
    // Click on the Encounters card
    cy.contains('Encounters').click();
    
    // Check that we're on the Encounters page
    cy.url().should('include', '/template-editor/encounters');
  });
});