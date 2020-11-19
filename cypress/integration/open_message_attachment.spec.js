/// <reference types="Cypress" />

describe('Secure Messages', () => {
  it('can open secure messages', () => {
    cy.visit('http://localhost:8080/securemessages/cb#');
  });
});
