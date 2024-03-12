describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('successfully logs in', () => {
    // Fill in the login form
    cy.get('input[type="email"]').type('user@example.com'); // user's email
    cy.get('input[type="password"]').type('Password123@'); // user's password

    cy.get('form').submit();
  });

  it(' invalid login', () => {
    // Fill in the login form with invalid credentials
    cy.get('input[type="email"]').type('wronguser@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Submit the form
    cy.get('form').submit();

    // Check that the application did not redirect
    cy.url().should('include', '/login'); // Make sure we're still on the login page
  });
});
