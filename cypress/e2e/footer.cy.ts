import { PAGES } from '../constants';

describe('Footer', () => {
  it('hides social links if on the homepage', () => {
    const page = cy.visit(PAGES.HOME.route);
    page.get('footer > .social-links').should('not.exist');
  });

  it('displays social links on all other pages', () => {
    const { HOME, ...otherPages } = PAGES;

    Object.entries(otherPages).map(([pageName, { route }]) => {
      const page = cy.visit(route);
      cy.log(`Testing ${pageName} page`);
      page.get('footer > .social-links').should('exist');
    });
  });
});
