describe('Navigation', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('highlights active link in header', () => {
    // Check that no navigation link is highlighted on home page
    cy.get('header a.border-(--primary)').should('not.exist');

    // Navigate to Template Editor
    cy.contains('Template Editor').click();
    
    // Check URL
    cy.url().should('include', '/template-editor');
    
    // Check that Template Editor link is highlighted in header
    cy.get('header a.border-(--primary)').should('contain', 'Template Editor');
    
    // Navigate to Content Simulator
    cy.contains('Content Simulator').click();
    
    // Check URL
    cy.url().should('include', '/content-simulator');
    
    // Check that Content Simulator link is highlighted in header
    cy.get('header a.border-(--primary)').should('contain', 'Content Simulator');
    
    // Check that Template Editor link is no longer highlighted
    cy.get('header a.border-(--primary)').should('not.contain', 'Template Editor');
  });

  it('shows correct sidebar navigation based on current section', () => {
    // Navigate to Template Editor
    cy.contains('Template Editor').click();
    
    // Check that sidebar shows Template Editor navigation
    cy.get('aside h2').should('contain', 'Template Editor');
    cy.get('aside').should('contain', 'Encounters');
    cy.get('aside').should('contain', 'Locations');
    
    // Navigate to Content Simulator
    cy.contains('Content Simulator').click();
    
    // Check that sidebar shows Content Simulator navigation
    cy.get('aside h2').should('contain', 'Content Simulator');
    cy.get('aside').should('contain', 'Character Sheet');
    cy.get('aside').should('contain', 'Inventory');
    
    // Navigate to Procedural Generator
    cy.contains('Procedural Generator').click();
    
    // Check that sidebar shows Procedural Generator navigation
    cy.get('aside h2').should('contain', 'Procedural Generator');
    cy.get('aside').should('contain', 'Text Variation');
    cy.get('aside').should('contain', 'Structural Variation');
  });

  it('highlights active link in sidebar', () => {
    // Navigate to Template Editor
    cy.contains('Template Editor').click();
    
    // Check that Overview link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Overview');
    
    // Navigate to Encounters page
    cy.contains('Encounters').click();
    
    // Check URL
    cy.url().should('include', '/template-editor/encounters');
    
    // Check that Encounters link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Encounters');
    
    // Check that Overview link is no longer highlighted
    cy.get('aside a.bg-(--sidebar-accent)').should('not.contain', 'Overview');
  });

  it('mobile menu works correctly', () => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    
    // Check that mobile menu is initially hidden
    cy.get('#mobile-menu').should('not.be.visible');
    
    // Open mobile menu
    cy.get('button[aria-controls="mobile-menu"]').click();
    
    // Check that mobile menu is visible
    cy.get('#mobile-menu').should('be.visible');
    
    // Check that all main navigation links are in the mobile menu
    cy.get('#mobile-menu').should('contain', 'Template Editor');
    cy.get('#mobile-menu').should('contain', 'Procedural Generator');
    cy.get('#mobile-menu').should('contain', 'Content Simulator');
    cy.get('#mobile-menu').should('contain', 'Content Database');
    cy.get('#mobile-menu').should('contain', 'Export Manager');
    
    // Navigate to Content Simulator using mobile menu
    cy.get('#mobile-menu').contains('Content Simulator').click();
    
    // Check URL
    cy.url().should('include', '/content-simulator');
    
    // Check that mobile menu is closed after navigation
    cy.get('#mobile-menu').should('not.be.visible');
    
    // Open mobile menu again
    cy.get('button[aria-controls="mobile-menu"]').click();
    
    // Check that Content Simulator link is highlighted in mobile menu
    cy.get('#mobile-menu a.border-(--primary)').should('contain', 'Content Simulator');
  });

  it('navigates through sidebar links', () => {
    // Navigate to Content Simulator
    cy.contains('Content Simulator').click();
    
    // Check URL
    cy.url().should('include', '/content-simulator');
    
    // Navigate to Character Sheet through sidebar
    cy.get('aside').contains('Character Sheet').click();
    
    // Check URL
    cy.url().should('include', '/content-simulator/character');
    
    // Check that Character Sheet link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Character Sheet');
    
    // Navigate to Inventory through sidebar
    cy.get('aside').contains('Inventory').click();
    
    // Check URL
    cy.url().should('include', '/content-simulator/inventory');
    
    // Check that Inventory link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Inventory');
  });

  it('maintains correct active state when navigating between sections', () => {
    // Navigate to Template Editor
    cy.contains('Template Editor').click();
    
    // Navigate to Encounters
    cy.get('aside').contains('Encounters').click();
    
    // Check that Encounters link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Encounters');
    
    // Navigate to Content Simulator through header
    cy.get('header').contains('Content Simulator').click();
    
    // Check that Content Simulator link is highlighted in header
    cy.get('header a.border-(--primary)').should('contain', 'Content Simulator');
    
    // Check that Overview link is highlighted in sidebar
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Overview');
    
    // Navigate back to Template Editor through header
    cy.get('header').contains('Template Editor').click();
    
    // Check that Template Editor link is highlighted in header
    cy.get('header a.border-(--primary)').should('contain', 'Template Editor');
    
    // Check that Overview link is highlighted in sidebar (not Encounters)
    // This is because we navigated to the main Template Editor page, not the Encounters page
    cy.get('aside a.bg-(--sidebar-accent)').should('contain', 'Overview');
  });
});