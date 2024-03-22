describe('Login Page', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://cryptrack-server.onrender.com/auth/login', {
      statusCode: 200,
      body: {
        message: 'Login successful',
      },
    }).as('loginRequest');

    cy.visit('/login');
  });

  it('allows user to log in', () => {
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('password');

    cy.get('form').submit();

    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
      email: 'user@example.com',
      password: 'password',
    });

    cy.url().should('include', '/App');
  });

  it('navigates to the registration page when the link is clicked', () => {
    cy.contains('Not register yet?').click();
    cy.url().should('include', '/register');
  });
});
