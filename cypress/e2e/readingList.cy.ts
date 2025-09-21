/// <reference types="cypress" />

describe("Reading List E2E", () => {
  beforeEach(() => {
    // Mock API responses
    cy.intercept("GET", "**/books", { fixture: "books.json" }).as("getBooks");
    cy.intercept("GET", "**/users/*", { fixture: "users.json" }).as("getUser");

    // Visit the app
    cy.visit("/");

    // Wait for API calls
    cy.wait(["@getBooks", "@getUser"]);
  });

  it("adds a book depending on button state", () => {
    // Check if the first "Add" button is disabled
    cy.get("[data-testid='add-to-list']").first().then(($btn) => {
      if ($btn.is(":disabled")) {
        // Add second book
        cy.get("[data-testid='add-to-list']").eq(1).click();
      } else {
        // Add first book
        $btn.click();
      }
    });

    // Verify badge updates
    cy.get("[data-testid='reading-list-count']")
      .should("exist")
      .and("not.be.empty");

    // Verify reading list has at least one item
    cy.get("[data-testid='reading-list-item']").should("have.length.at.least", 1);
  });

  it("removes all items from reading list", () => {
    // Add a couple of books to ensure the list has items
    cy.get("[data-testid='add-to-list']").eq(0).click({ force: true });
    cy.get("[data-testid='add-to-list']").eq(1).click({ force: true });

    // Remove all items
    cy.get("[data-testid='reading-list-item']").then(($items) => {
      const itemCount = $items.length;
      for (let i = 0; i < itemCount; i++) {
        cy.get("[data-testid='remove-from-list']").first().click({ force: true });
      }
    });

    // Confirm the list is empty
    cy.contains("Your reading list is empty").should("exist");
  });
});
