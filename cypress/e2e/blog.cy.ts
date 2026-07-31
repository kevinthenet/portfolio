import { BLOG } from '../constants';

describe('Blog page', () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(BLOG.route);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', BLOG.title);
  });

  // No posts are published yet (tracked in the content backlog), so this
  // suite covers the empty state rather than a populated blog grid.
  context('Empty state', () => {
    it('displays the empty-state message instead of a blog grid', () => {
      page.get('.empty-state').should('exist');
      page.get('.blog-grid').should('not.exist');
    });

    it('renders the prompt and status lines as separate elements', () => {
      page.get('.empty-state p').should('have.length', 3);
    });
  });
});
