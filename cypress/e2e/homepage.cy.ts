it('title is correct', () => {
  const page = cy.visit('/');

  page.get('title').should('have.text', `Kevin Castro's Portfolio`);
  page.get('h1').should('contain.text', 'Kevin Castro');
});
