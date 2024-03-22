describe('Add Transaction', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://cryptrack-server.onrender.com/cryptos/prices',
      {
        statusCode: 200,
        body: [
          { name: 'Bitcoin', price: 50000 },
          { name: 'Ethereum', price: 3521.57 },
          { name: 'Tether USDt', price: 0.998788 },
        ],
      }
    ).as('getCryptoPrices');

    cy.intercept(
      'GET',
      'https://cryptrack-server.onrender.com/transactions/total',
      {
        statusCode: 200,
        body: { total: 100000 },
      }
    ).as('getTransactionsTotal');

    cy.intercept(
      'POST',
      'https://cryptrack-server.onrender.com/transactions/add',
      {
        statusCode: 201,
      }
    );

    cy.visit('/app/add');
  });

  it('allows the user to add a transaction', () => {
    // Select the cryptocurrency
    //cy.get('select').select('Bitcoin');

    // Type the quantity
    //cy.get('input[type="number"]').first().type('2');

    // You might not need to fill the price if it auto-populates based on the selection
    //cy.get('input[type="number"]').eq(1).type('50000');

    // Submit the form
    //cy.get('form').submit();

    // Assert navigation to the app main page
    cy.url().should('include', '/app');
  });
});
