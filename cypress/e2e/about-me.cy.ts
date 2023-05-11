import { ABOUT_ME } from "../constants";

describe("About Me Page", () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(ABOUT_ME.route);
  });

  it("displays the title correctly", () => {
    page.get("title").should("have.text", ABOUT_ME.title);
  });

  it("contains some text content on the page", () => {
    page.get(".text-content").should("exist");
  });
});
