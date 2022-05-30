
describe('installation', () => {
  beforeEach(() => {
    cy.visit('/installation/index.php');
  });

  it('should install joomla successfully', () => {
    cy.get('select[name=jform[language]]').should('contain', 'Deutsch');
    cy.get('input[name=jform[site_name]]').type('e2e-testing');
    cy.get('button').contains('Zugangsdaten einrichten').click();

    cy.get('input[name=jform[admin_user]]').type('Tester');
    cy.get('input[name=jform[admin_username]]').type(Cypress.env('username'));
    cy.get('input[name=jform[admin_password]]').type(Cypress.env('password'), { log: false });
    cy.get('input[name=jform[admin_email]]').type(Cypress.env('email'), { log: false });
    cy.get('button').contains('Datenbankverbindung einrichten').click();

    cy.get('select[name=jform[db_type]]').should('contain', 'MySQLi');
    cy.get('input[name=jform[db_host]]').type(Cypress.env('dbHost'), { log: false });
    cy.get('input[name=jform[db_user]]').type(Cypress.env('dbUser'), { log: false });
    cy.get('input[name=jform[db_pass]]').type(Cypress.env('dbPass'), { log: false });
    cy.get('input[name=jform[db_name]]').type(Cypress.env('dbName'), { log: false });
    cy.get('input[name=jform[db_prefix]]').should('not.be.empty');
    cy.get('select[name=jform[db_encryption]]').should('contain', 'Standard (servergesteuert)');
    cy.get('button').contains('Joomla! installieren').click();

    cy.get('legend').should('contain', 'Herzlichen Glückwunsch');
    cy.get('h2').should('contain', 'Joomla! wurde vollständig installiert');
    cy.get('button').contains('Backend öffnen').click();
  });
});