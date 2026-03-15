describe('Contact Us Form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens the contact modal from the footer and submits a message', () => {
    // Scroll to bottom
    cy.scrollTo('bottom');
    
    // Click the Contact Us link
    cy.contains('button', 'Contact Us').click();
    
    // Fill out the form
    cy.get('input[placeholder="Enter your name"]').type('Cypress User');
    cy.get('input[placeholder="Enter your email"]').type('cypress@test.com');
    cy.get('select').select('Support');
    cy.get('textarea[placeholder="How can we help you?"]').type('This is a test message from Cypress E2E framework.');
    
    // Submit the form
    cy.get('.modal-content').contains('button', 'Send Message').click();
    
    // Wait for the success alert inside the modal
    cy.get('.alert-success').should('be.visible').and('contain', 'Message sent successfully');
    
    // The modal should close shortly after automatically (if programmed that way) 
    // or we just verify it succeeded.
  });
});
