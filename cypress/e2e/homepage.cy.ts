import path = require('path');

import { RESUME_FILE_NAME, HOME } from '../constants';

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

  it('changes the position title every so often', () => {
    let originalPosition: string;
    page
      .get('#position')
      .invoke('text')
      .then((positionText) => {
        originalPosition = positionText;
      });
    // move forward 3s in time
    cy.clock();
    cy.tick(3000);
    page.get('#position').invoke('text').should('not.equal', originalPosition);
  });

  it('displays social links in the main section', () => {
    page.get('.social-links > a').should('be.visible');
  });

  it('hides social links in the footer', () => {
    page.get('footer > .social-links').should('not.exist');
  });

  context('Resume section', () => {
    const downloadsFolder = Cypress.config('downloadsFolder');

    let link: Cypress.Chainable;
    beforeEach(() => {
      link = page.get('.resume > a');
    });

    it('displays a link for the user to download a copy', () => {
      link.should('have.attr', 'download');
      link.should('have.attr', 'href');
    });

    it('allows for a download of the file to take place', () => {
      link.click();

      const resumeFile = path.join(downloadsFolder, RESUME_FILE_NAME);
      cy.log(resumeFile);
      cy.readFile(resumeFile, { timeout: 15000 }).should('exist');
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

    it('every recommendation contains a title, a subtitle, an annotation, and some text content', () => {
      recommendations.children().each((recommendation) => {
        const title = recommendation.find('h2');
        const subtitle = recommendation.find('h4');
        const annotation = recommendation.find('sub');
        const content = recommendation.find('.content');

        [title, subtitle, annotation, content].forEach((el) => {
          expect(el).to.exist;
          expect(el).to.contain.text;
        });
      });
    });
  });
});
