describe('landing page', () => {
  it('successfully load', () => {
    cy.visit('/');
  });

  it('contains the logo', () => {
    cy.visit('/');
    cy.get('img[alt="logo"]').should('be.visible');
  });

  it('navigates to login page on clicking login', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('navigates to register page on clicking Get Started', () => {
    cy.visit('/');
    cy.contains('Get started...').click();
    cy.url().should('include', '/register');
  });
});
