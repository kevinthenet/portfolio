import { WORK, TEST_PROJECT_SLUG, TEST_PROJECT_NAME } from '../constants';

describe('Project highlight page', async () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${WORK.route}/${TEST_PROJECT_SLUG}`);
  });

  it('displays the title correctly', () => {
    page
      .get('title')
      .should('have.text', `Kevin Castro // ${TEST_PROJECT_NAME}`);
  });

  it('contains some text content on the page', () => {
    page.get('.text-content').should('exist');
  });

  it('contains technology and skill chips', () => {
    page.get('.chip-group .chip').should('have.length.greaterThan', 0);
  });

  it('links back to the work listing', () => {
    page.get('.return-breadcrumb').should('have.attr', 'href', '/work');
  });

  it(`should 404 if trying to reach a slug that doesn't exist`, () => {
    const nonExistentPage = cy.visit(`${WORK.route}/should-not-exist`, {
      failOnStatusCode: false,
    });
    nonExistentPage.get('title').should('have.text', '404: Not Found');
    nonExistentPage.get('h1').should('contain.text', 'Not found');
  });
});
