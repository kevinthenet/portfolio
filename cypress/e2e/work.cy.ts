import { WORK, FIRST_WORK_SLUG, LAST_WORK_SLUG } from '../constants';

describe('Work page', () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(WORK.route);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', WORK.title);
  });

  it('contains a scannable row for every project', () => {
    const row = page.get('.scan-item').first();
    row.should('exist');
    // navigates away from current page
    row.click();
    // verify that we are no longer on the work page
    cy.location('pathname').should('not.equal', `${WORK.route}`);
  });

  it('orders projects from most recent engagement to oldest', () => {
    page
      .get('.scan-item')
      .first()
      .should('have.attr', 'href', `/work/${FIRST_WORK_SLUG}`);
    page
      .get('.scan-item')
      .last()
      .should('have.attr', 'href', `/work/${LAST_WORK_SLUG}`);
  });
});
