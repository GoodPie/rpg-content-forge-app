describe('Procedural Generator', () => {
  beforeEach(() => {
    // Visit the procedural generator page before each test
    cy.visit('/procedural-generator');
  });

  it('displays the title and description', () => {
    // Check that the title is displayed
    cy.contains('h1', 'Procedural Generator').should('be.visible');
    
    // Check that the description is displayed
    cy.contains('p', 'Preview and test variations of templates').should('be.visible');
  });

  it('displays all generator features', () => {
    // Check that all generator features are displayed
    cy.contains('Text Variation Viewer').should('be.visible');
    cy.contains('Structural Variation Analyzer').should('be.visible');
    cy.contains('Conditional Logic Tester').should('be.visible');
    cy.contains('Seed Explorer').should('be.visible');
    cy.contains('Template Analyzer').should('be.visible');
  });

  it('displays recent templates section', () => {
    // Check that the recent templates section is displayed
    cy.contains('Recent Templates').should('be.visible');
  });

  it('navigates to text variation page', () => {
    // Click on the Text Variation Viewer card
    cy.contains('Text Variation Viewer').click();
    
    // Check that we're on the Text Variation page
    cy.url().should('include', '/procedural-generator/text-variation');
  });

  describe('Text Variation Page', () => {
    beforeEach(() => {
      // Visit the text variation page before each test
      cy.visit('/procedural-generator/text-variation');
    });

    it('displays the template selector', () => {
      // Check that the template selector is displayed
      cy.contains('label', 'Select Template').should('be.visible');
      cy.get('select#template').should('be.visible');
    });

    it('displays the variation count input', () => {
      // Check that the variation count input is displayed
      cy.contains('label', 'Number of Variations').should('be.visible');
      cy.get('input#count').should('be.visible');
    });

    it('displays the seed input', () => {
      // Check that the seed input is displayed
      cy.contains('label', 'Seed').should('be.visible');
      cy.get('input#seed').should('be.visible');
    });

    it('displays the generate button', () => {
      // Check that the generate button is displayed
      cy.contains('button', 'Generate Variations').should('be.visible');
    });
  });
});