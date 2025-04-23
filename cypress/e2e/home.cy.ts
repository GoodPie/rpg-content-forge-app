describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('displays the title and description', () => {
    // Check that the title is displayed
    cy.contains('h1', 'Content Creation Tool').should('be.visible');
    
    // Check that the description is displayed
    cy.contains('p', 'A comprehensive environment for developing procedurally generated content').should('be.visible');
  });

  it('displays all core features', () => {
    // Check that all core features are displayed
    cy.contains('Template Editor').should('be.visible');
    cy.contains('Procedural Generator').should('be.visible');
    cy.contains('Content Simulator').should('be.visible');
    cy.contains('Content Database').should('be.visible');
    cy.contains('Export Manager').should('be.visible');
  });

  it('navigates to Template Editor page', () => {
    // Click on the Template Editor card
    cy.contains('Template Editor').click();
    
    // Check that we're on the Template Editor page
    cy.url().should('include', '/template-editor');
    cy.contains('h1', 'Template Editor').should('be.visible');
  });

  it('navigates to Procedural Generator page', () => {
    // Click on the Procedural Generator card
    cy.contains('Procedural Generator').click();
    
    // Check that we're on the Procedural Generator page
    cy.url().should('include', '/procedural-generator');
    cy.contains('h1', 'Procedural Generator').should('be.visible');
  });

  it('navigates to Content Simulator page', () => {
    // Click on the Content Simulator card
    cy.contains('Content Simulator').click();
    
    // Check that we're on the Content Simulator page
    cy.url().should('include', '/content-simulator');
    cy.contains('h1', 'Content Simulator').should('be.visible');
  });

  it('navigates to Content Database page', () => {
    // Click on the Content Database card
    cy.contains('Content Database').click();
    
    // Check that we're on the Content Database page
    cy.url().should('include', '/content-database');
    cy.contains('h1', 'Content Database').should('be.visible');
  });

  it('navigates to Export Manager page', () => {
    // Click on the Export Manager card
    cy.contains('Export Manager').click();
    
    // Check that we're on the Export Manager page
    cy.url().should('include', '/export-manager');
    cy.contains('h1', 'Export Manager').should('be.visible');
  });

  it('has working "Start Creating" button', () => {
    // Find and click the "Start Creating" button
    cy.contains('Start Creating').click();
    
    // Check that we're on the Template Editor page
    cy.url().should('include', '/template-editor');
  });

  it('has working "View Documentation" button', () => {
    // Find and click the "View Documentation" button
    cy.contains('View Documentation').click();
    
    // Check that we're on the docs page
    cy.url().should('include', '/docs');
  });

  it('displays core principles section', () => {
    // Check that the core principles section is displayed
    cy.contains('h2', 'Core Principles').should('be.visible');
    
    // Check that all principles are displayed
    cy.contains('Procedurality').should('be.visible');
    cy.contains('Modularity').should('be.visible');
    cy.contains('Extensibility').should('be.visible');
    cy.contains('Usability').should('be.visible');
    cy.contains('Portability').should('be.visible');
    cy.contains('Collaboration').should('be.visible');
  });

  it('is responsive', () => {
    // Test on mobile viewport
    cy.viewport('iphone-x');
    
    // Check that the title is still visible
    cy.contains('h1', 'Content Creation Tool').should('be.visible');
    
    // Check that the features are stacked in a single column
    cy.get('.grid-cols-1').should('exist');
    
    // Test on tablet viewport
    cy.viewport('ipad-2');
    
    // Check that the title is still visible
    cy.contains('h1', 'Content Creation Tool').should('be.visible');
    
    // Test on desktop viewport
    cy.viewport(1280, 720);
    
    // Check that the title is still visible
    cy.contains('h1', 'Content Creation Tool').should('be.visible');
  });
});