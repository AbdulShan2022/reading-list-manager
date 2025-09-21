Cypress.Commands.add("", (username: string, password: string) => {
  cy.request("POST", "/", { username, password });
});
