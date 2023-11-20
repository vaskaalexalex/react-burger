import { BASE_URL } from "../../../src/utils";
import {
  BUN_INGREDIENT_SELECTOR,
  CLOSE_BUTTON_SELECTOR,
  DROP_TARGET_SELECTOR,
  INNER_BUN_INGREDIENT_SELECTOR,
  INNER_MAIN_INGREDIENT_SELECTOR,
  MAIN_INGREDIENT_SELECTOR,
  ORDER_NUMBER_SELECTOR,
} from "./constants";

describe("Desktop constructor E2E unauthorized tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 720);
    cy.intercept("POST", `${BASE_URL}/auth/login`).as("login");
    cy.intercept("POST", `${BASE_URL}/orders`).as("getOrder");
  });

  it("Should open and close ingredient info modal", () => {
    cy.get(BUN_INGREDIENT_SELECTOR).click();

    cy.get(CLOSE_BUTTON_SELECTOR, { timeout: 1000 }).should("be.visible");

    cy.get(CLOSE_BUTTON_SELECTOR).click();

    cy.get(CLOSE_BUTTON_SELECTOR).should("not.exist");
  });

  it("Should drop bun to constructor and then remove it", () => {
    cy.get(BUN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

    cy.get(INNER_BUN_INGREDIENT_SELECTOR).should("be.visible");

    cy.get(INNER_BUN_INGREDIENT_SELECTOR)
      .find('*[class^="constructor-element__action"]')
      .trigger("click");

    cy.get(INNER_BUN_INGREDIENT_SELECTOR).should("not.exist");
  });

  it("Should drop ingredient to constructor and remove it", () => {
    cy.get(MAIN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

    cy.get(INNER_MAIN_INGREDIENT_SELECTOR).should("be.visible");

    cy.get(INNER_MAIN_INGREDIENT_SELECTOR)
      .find('*[class^="constructor-element__action"]')
      .trigger("click");

    cy.get(INNER_MAIN_INGREDIENT_SELECTOR).should("not.exist");
  });

  it("Should place order if user is not logged in", () => {
    cy.get(BUN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

    cy.get(MAIN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

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

    cy.get(ORDER_NUMBER_SELECTOR).should("be.visible");

    cy.get(CLOSE_BUTTON_SELECTOR).click();
  });
});
