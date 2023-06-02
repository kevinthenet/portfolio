import { PAGES } from '../constants';

describe('Header', () => {
  it('replaces the href with "#" for the page the user is currently on', () => {
    Object.entries(PAGES).map(([pageName, { route, friendlyText }]) => {
      cy.log(`Testing ${pageName} page`);
      const currentPage = cy.visit(route);
      currentPage
        .get('header > nav > a[href="#"]')
        .invoke('text')
        .should('equal', friendlyText);
    });
  });
});
