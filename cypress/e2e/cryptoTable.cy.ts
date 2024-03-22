describe('CryptoTable Component', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://cryptrack-server.onrender.com/cryptos/prices',
      {
        fixture: 'cryptoPrices.json',
      }
    ).as('getCryptoPrices');

    cy.intercept(
      'GET',
      'https://cryptrack-server.onrender.com/transactions/total',
      {
        fixture: 'totalHoldingData.json',
      }
    ).as('getTotalHoldingData');

    cy.visit('/app');
    cy.wait(['@getCryptoPrices', '@getTotalHoldingData']);
  });

  it('displays the data in the table', () => {
    cy.get('.crypto-table thead').within(() => {
      cy.get('th').eq(0).should('contain', 'Coin');
      cy.get('th').eq(1).should('contain', 'Price');
      cy.get('th').eq(2).should('contain', 'Holding');
    });
  });
});
