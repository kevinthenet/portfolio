import { PROJECTS } from "../constants";
import { getCollection } from "astro:content";

describe("Projects page", async () => {
  const projects = await getCollection("projects");
  const getRandomProject = () =>
    projects[Math.floor(Math.random() * projects.length)];

  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${PROJECTS.route}/${getRandomProject().slug}`);
  });

  it("displays the title correctly", () => {
    page.get("title").should("have.text", PROJECTS.title);
  });

  it("contains some cards with project information on the page", () => {
    page.get(".text-content").should("exist");
  });

  it(`should 404 if trying to reach a slug that doesn't exist`, () => {
    const nonExistentPage = cy.visit(`${PROJECTS.route}/should-not-exist`, {
      failOnStatusCode: false,
    });
    nonExistentPage.get("title").should("have.text", "404: Not Found");
    nonExistentPage.get("h1").should("contain.text", "Not found");
  });
});
