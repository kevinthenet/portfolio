import { getCollection } from "astro:content";
import { BLOG } from "../constants";

describe("Blog post page", async () => {
  const blogPosts = await getCollection("blog");
  const getRandomBlogPost = () =>
    blogPosts[Math.floor(Math.random() * blogPosts.length)];

  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${BLOG.route}/${getRandomBlogPost().slug}`);
  });

  it("displays the title correctly", () => {
    page.get("title").should("have.text", BLOG.title);
  });

  it("contains some text content on the page", () => {
    page.get(".text-content").should("exist");
  });

  it(`should 404 if trying to reach a slug that doesn't exist`, () => {
    const nonExistentPage = cy.visit(`${BLOG.route}/should-not-exist`, {
      failOnStatusCode: false,
    });
    nonExistentPage.get("title").should("have.text", "404: Not Found");
    nonExistentPage.get("h1").should("contain.text", "Not found");
  });
});
