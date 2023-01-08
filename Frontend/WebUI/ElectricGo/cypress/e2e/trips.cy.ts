describe("Test the trips", () => {
  it("Should load the page and have the right title", () => {
    cy.visit("http://localhost:4200");
    cy.contains("ElectricGo");
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    // cy.login('WarehouseManager', 'as')
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[9]/span[1]").click();
    cy.xpath("/html/body/app-root/div/app-list-trips/div/mat-form-field/div/div[1]/div/mat-select/div/div[1]/span").click().get('mat-option').contains('All').click();
    cy.wait(1000)
    cy.get('tr').eq(3).contains("T01");
    cy.get('tr').eq(3).contains("T01/13/02/2023");

  });
});
