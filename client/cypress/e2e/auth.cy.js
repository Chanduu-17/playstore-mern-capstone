describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the login page', () => {
    cy.contains('Login / Register').click();
    cy.url().should('include', '/login');
    cy.contains('Login to your account').should('be.visible');
  });

  it('should show an error for invalid login credentials', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('invalid@test.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-danger').should('be.visible').and('contain', 'Invalid credentials');
  });
});
