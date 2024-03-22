describe('Register Page', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      'https://cryptrack-server.onrender.com/auth/Register',
      {
        statusCode: 201,
        body: {
          message: 'Registration succesful',
        },
      }
    ).as('registerRequest');

    cy.visit('/register');
  });

  it('allows user to register', () => {
    cy.get('input[placeholder="Email"]').type('newuser@example.com');
    cy.get('input[placeholder="Username"]').type('newusername');
    cy.get('input[placeholder="Password"]').type('newpassword');

    cy.get('form').submit();

    cy.wait('@registerRequest').its('request.body').should('deep.equal', {
      email: 'newuser@example.com',
      username: 'newusername',
      password: 'newpassword',
    });

    cy.url().should('include', '/App');
  });

  it('navigates to the login page when the link is clicked', () => {
    cy.contains('Already have a account?').click();
    cy.url().should('include', '/login');
  });
});
