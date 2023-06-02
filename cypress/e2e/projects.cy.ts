import { PROJECTS } from '../constants';

describe('Projects page', async () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${PROJECTS.route}`);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', PROJECTS.title);
  });

  it('contains some cards with project information on the page', () => {
    page.get('.text-content').should('exist');
  });
});
