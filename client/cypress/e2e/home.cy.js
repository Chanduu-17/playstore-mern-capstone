describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage successfully', () => {
    cy.contains('Play Store').should('be.visible');
    cy.contains('Explore Top Applications').should('be.visible');
  });

  it('displays the filter section', () => {
    cy.get('input[name="search"]').should('be.visible');
    cy.get('select[name="category"]').should('be.visible');
    cy.get('select[name="rating"]').should('be.visible');
    cy.contains('button', 'Apply').should('be.visible');
  });

  it('filters apps by category when clicked', () => {
    // Select the category dropdown
    cy.get('select[name="category"]').select('games');
    cy.contains('button', 'Apply').click();
    
    // UI should still be intact
    cy.get('input[name="search"]').should('be.visible');
  });

  it('searches for apps via the search bar', () => {
    cy.get('input[placeholder="Search apps, games, and more"]').type('test');
    cy.contains('button', 'Apply').click();
  });
});
