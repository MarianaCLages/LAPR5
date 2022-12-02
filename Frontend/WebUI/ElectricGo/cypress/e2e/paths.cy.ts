describe('Paths Entity', () => {
  it('Should create an instance of Paths and list it', () => {
    cy.visit('http://localhost:4200')
    cy.login('LogisticManager', 'as')
    cy.xpath('/html/body/app-root/div/app-log-manager/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon').click()
    cy.xpath('/html/body/app-root/div/app-log-manager/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]').click()
    cy.contains('Create Path')
    cy.wait(1000)
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[1]/div/div[1]/div/mat-select').click().type('{downarrow}{enter}')
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[2]/div/div[1]/div/mat-select').click().type('{downarrow}{downarrow}{enter}')
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[3]/div/div[1]/div/input').click().type('5')
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[4]/div/div[1]/div/input').click().type('5')
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[5]/div/div[1]/div/input').click().type('5')
    cy.xpath('/html/body/app-root/div/app-create-path/div/mat-form-field[6]/div/div[1]/div/input').click().type('5')
    cy.xpath('/html/body/app-root/div/app-create-path/div/button[1]').click()

    cy.xpath('/html/body/app-root/div/app-log-manager/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon').click()
    cy.xpath('/html/body/app-root/div/app-log-manager/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[4]').click()

    cy.contains('Paths')

    cy.xpath('/html/body/app-root/div/app-list-paths/div/mat-paginator/div/div/div[2]/button[4]/span[1]/svg/path').click()

    //TODO: Assert that the path is in the list, need to implement a search function




  })
})
