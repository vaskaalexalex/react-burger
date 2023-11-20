import { BASE_URL } from "../../../src/utils";
import {
  BUN_INGREDIENT_SELECTOR,
  CLOSE_BUTTON_SELECTOR,
  DROP_TARGET_SELECTOR,
  MAIN_INGREDIENT_SELECTOR,
  ORDER_NUMBER_SELECTOR,
} from "./constants";

describe("Desktop constructor E2E authorized tests", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept("POST", `${BASE_URL}/auth/login`).as("login");

    cy.intercept("POST", `${BASE_URL}/orders`).as("getOrder");
    cy.visit("/");
  });

  it("Should be able to place order", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type(Cypress.env("email"));
    cy.get('input[name="password"]').type(Cypress.env("password"));
    cy.get('button[type="submit').click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);

    cy.getCookie("accessToken").get("value").should("not.be.empty");
    cy.getCookie("refreshToken").get("value").should("not.be.empty");

    cy.getCookie("accessToken").get("value").should("not.be.empty");
    cy.getCookie("refreshToken").get("value").should("not.be.empty");

    cy.get(BUN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

    cy.get(MAIN_INGREDIENT_SELECTOR).drag(DROP_TARGET_SELECTOR);

    cy.get("button").contains("Заказать").click();

    cy.wait("@getOrder", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.get(ORDER_NUMBER_SELECTOR).should("be.visible");

    cy.get(CLOSE_BUTTON_SELECTOR).click();
  });
});
