
describe('com_categories / com_content / com_contenthistory', () => {
  beforeEach(() => {
    cy.visit('/administrator');
    cy.get('input[name=username]').type(Cypress.env('username'));
    cy.get('input[name=passwd]').type(Cypress.env('password'), {log: false});
    cy.get('button').contains('Log in').click();
  });

  it('should create a new article', () => {
    cy.location('pathname').should('include', 'administrator').and('include', 'index.php');
    cy.get('h1').should('contain', 'Home Dashboard');
    cy.get('nav').contains('Content').click();
    cy.get('nav').contains('Articles').click();
    cy.get('button').contains('New').click();
    cy.get('input[name="jform[title]"]').type('Butterflies like to lorem', {force: true});

    // getIframeBody().find('#tinymce').type('Lorem ipsum dolor sit amet');

    cy.get('joomla-toolbar-button').contains('Save & Close').click();
    cy.get('joomla-alert[type=success]').should('contain', 'Article saved.');
  });

  it('should toggle featured status on article', () => {
    cy.location('pathname').should('include', 'administrator').and('include', 'index.php');
    cy.get('nav').contains('Content').click();
    cy.get('nav').contains('Articles').click();
    cy.get('a[title="Edit Butterflies like to lorem"').click();

    cy.get('#jform_featured').contains('No').click({ force: true});
    cy.get('#jform_featured').should('contain', 'Yes');

    cy.get('joomla-toolbar-button').contains('Save & Close').click();
    cy.get('joomla-alert[type=success]').should('contain', 'Article saved.');
  });
});

const getIframeDocument = () => {
  return cy
  .get('iframe')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap)
}