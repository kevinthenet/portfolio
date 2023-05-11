import { SKILLS } from "../constants";

describe("Skills page", () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(SKILLS.route);
  });

  it("displays the title correctly", () => {
    page.get("title").should("have.text", SKILLS.title);
  });
});
