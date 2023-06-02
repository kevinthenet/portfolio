import { PROJECTS, TEST_PROJECT_SLUG } from '../constants';

describe('Project highlight page', async () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${PROJECTS.route}/${TEST_PROJECT_SLUG}`);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', PROJECTS.title);
  });

  it('contains some text content on the page', () => {
    page.get('.text-content').should('exist');
  });

  it(`should 404 if trying to reach a slug that doesn't exist`, () => {
    const nonExistentPage = cy.visit(`${PROJECTS.route}/should-not-exist`, {
      failOnStatusCode: false,
    });
    nonExistentPage.get('title').should('have.text', '404: Not Found');
    nonExistentPage.get('h1').should('contain.text', 'Not found');
  });
});
