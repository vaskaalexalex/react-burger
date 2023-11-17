describe("Desktop constructor E2E unauthorized tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
    cy.intercept("POST", "https://norma.nomoreparties.space/api/auth/login").as(
      "login"
    );
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders").as(
      "getOrder"
    );
  });

  it("Should open and close ingredient info modal", () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').click();

    cy.get('[data-testid="modal-close-icon"]', { timeout: 1000 }).should(
      "be.visible"
    );

    cy.get('[data-testid="modal-close-icon"]').click();

    cy.get('[data-testid="modal-close-icon"]').should("not.exist");
  });

  it("Should drop bun to constructor and then remove it", () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="top643d69a5c3f7b9001cfa093c"]').should("be.visible");

    cy.get('[data-testid="top643d69a5c3f7b9001cfa093c"]')
      .find('*[class^="constructor-element__action"]')
      .trigger("click");

    cy.get('[data-testid="top60d3b41abdacab0026a733c6"]').should("not.exist");
  });

  it("Should drop ingredient to constructor and remove it", () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093e"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="inner643d69a5c3f7b9001cfa093e"]').should(
      "be.visible"
    );

    cy.get('[data-testid="inner643d69a5c3f7b9001cfa093e"]')
      .find('*[class^="constructor-element__action"]')
      .trigger("click");

    cy.get('[data-testid="inner643d69a5c3f7b9001cfa093e"]').should("not.exist");
  });

  it("Should place order if user is not logged in", () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.get('[data-testid="643d69a5c3f7b9001cfa093e"]').drag(
      '[data-testid="constructor-drop-target"]'
    );

    cy.log(Cypress.env("username"));

    cy.get("button").contains("Заказать").click();

    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));

    cy.get('button[type="submit"]').click();

    cy.wait("@login", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("button").contains("Заказать").click();

    cy.wait("@getOrder", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get('[data-testid="placed-order-number"]').should("be.visible");

    cy.get('[data-testid="modal-close-icon"]').click();
  });
});
