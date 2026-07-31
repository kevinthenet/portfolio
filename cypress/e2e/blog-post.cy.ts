import { BLOG } from '../constants';

// No blog posts are published yet (tracked in the content backlog), so
// there's no real slug to test a populated post page against. This only
// covers 404 handling for the dynamic [...slug] route; expand once a
// real post ships.
describe('Blog post page', () => {
  it(`should 404 if trying to reach a slug that doesn't exist`, () => {
    const nonExistentPage = cy.visit(`${BLOG.route}/should-not-exist`, {
      failOnStatusCode: false,
    });
    nonExistentPage.get('title').should('have.text', '404: Not Found');
    nonExistentPage.get('h1').should('contain.text', 'Not found');
  });
});
