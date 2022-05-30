
describe('com_installer', () => {
  beforeEach(() => {
    cy.visit('/administrator');
    cy.get('input[name=username]').type(Cypress.env('username'));
    cy.get('input[name=passwd]').type(Cypress.env('password'), { log: false });
    cy.get('button').contains('Log in').click();
  });

  it('should Install a component via "Browse for File"', () => {
    cy.get('h1').should('contain', 'Home Dashboard');
    cy.get('nav').contains('System').click();
    cy.get('h2').contains('Install').siblings().contains('Extensions').click();
    cy.contains('Install from Folder').click();
    cy.get('#install_directory').type(Cypress.env('extensionPath'));
    cy.get('button').contains('Check & Install').click();
    cy.get('joomla-alert[type=success]').should('exist');
  });

  it('should uninstall a component', () => {
    cy.get('nav').contains('System').click();
    cy.get('#menu-collapse').click();
    cy.get('h2').contains('Manage').siblings().contains('Extensions').click();
    cy.get('#filter_search').should('be.visible');
    cy.get('input[name="filter[search]"]').type(Cypress.env('extensionPath'), { force: true });
    cy.get('.filter-search-bar__button').click({ force: true });
    cy.get('#manageList').find('tr').should('contain', Cypress.env('extensionName'));
    cy.get('#cb0').click();
    cy.get('button').contains('Uninstall').click();
    cy.get('joomla-alert[type=info]').should('contain', 'Uninstalling the component was successful.');
  });
});