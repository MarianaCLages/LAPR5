describe('Loads the page', () => {
  it('Should load the page and have the right title', () => {
    cy.visit('http://localhost:4200')
    cy.contains('ElectricGo')
    cy.login('WarehouseManager', 'as')
    cy.contains('Warehouse Manager Menu')
  })

  it('Should have a login button', () => {
    cy.visit('http://localhost:4200')
    cy.contains('ElectricGo')
    cy.get('button').contains('Login')
  })
})
