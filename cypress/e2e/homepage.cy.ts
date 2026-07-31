import { HOME } from '../constants';

describe('Home page', () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit(HOME.route);
  });

  it('displays the title correctly', () => {
    page.get('title').should('have.text', HOME.title);
  });

  it('displays an h1 with my name', () => {
    page.get('h1').should('contain.text', 'Kevin Castro');
  });

  context('Hero CTAs', () => {
    it('has a working email CTA', () => {
      page
        .get('.cta-row a')
        .first()
        .should('have.attr', 'href', 'mailto:hello@kevincastro.dev');
    });

    it('has a working LinkedIn CTA', () => {
      page
        .get('.cta-row a')
        .last()
        .should(
          'have.attr',
          'href',
          'https://www.linkedin.com/in/ortsacnivek/'
        );
    });
  });

  it('hides social links in the footer', () => {
    page.get('footer > .social-links').should('not.exist');
  });

  context('Selected Work section', () => {
    it('displays a scannable row for each selected project', () => {
      page.get('.scan-list .scan-item').should('have.length', 3);
    });

    it('every selected-work row links to a work detail page', () => {
      page.get('.scan-list .scan-item').each((row) => {
        expect(row.attr('href')).to.match(/^\/work\//);
      });
    });

    it('links out to the full work listing', () => {
      page.get('.all-work-link').should('have.attr', 'href', '/work');
    });
  });

  context('Recommendations section', () => {
    let recommendations: Cypress.Chainable;
    beforeEach(() => {
      recommendations = page.get('.recommendations');
    });

    it('every recommendation has an image that loads', () => {
      recommendations.children().each((recommendation) => {
        const image = recommendation.find('img');
        expect(image).to.be.visible;
      });
    });

    it('every recommendation contains a title, a subtitle, a relation, and some text content', () => {
      recommendations.children().each((recommendation) => {
        const title = recommendation.find('h2');
        const subtitle = recommendation.find('h4');
        const relation = recommendation.find('.relation');
        const content = recommendation.find('.content');

        [title, subtitle, relation, content].forEach((el) => {
          expect(el).to.exist;
          expect(el).to.contain.text;
        });
      });
    });
  });
});
