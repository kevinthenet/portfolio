import { PROJECTS } from '../constants';

describe('Projects page', async () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(`${PROJECTS.route}`);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', PROJECTS.title);
  });

  it('contains some clickable cards with project information on the page', () => {
    const card = page.get('.card').first();
    card.should('exist');
    // navigates away from current page
    card.click();
    // verify that we are no longer on the projects page
    cy.location('pathname').should('not.equal', `${PROJECTS.route}`);
  });
});
