describe("Loads the page", () => {
  it("Should load the page and have the right title", () => {
    cy.visit("http://localhost:4200");
    cy.contains("ElectricGo");
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    // cy.login('WarehouseManager', 'as')
    cy.visit("http://localhost:4200/#" +
      "WarehouseManager");
    cy.contains("Warehouse Manager Menu");
  });

  it("Should have a login button", () => {
    cy.visit("http://localhost:4200");
    cy.contains("ElectricGo");
    cy.contains("Login");
  });
});
