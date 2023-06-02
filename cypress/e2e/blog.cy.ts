import { BLOG } from '../constants';

describe('Blog page', () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(BLOG.route);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', BLOG.title);
  });

  it('contains some cards for blog posts on the page', () => {
    page.get('.text-content').should('exist');
  });
});
