describe("Paths Entity", () => {
  it("Should create an instance of Paths and list it", () => {
    //Preconditions: There should exist 2 different Warehouse entities in the system and an Path entity with this 2 Warehouses
    const begWarehouse = "C05";
    const endWarehouse = "C55";
    const energyNeeded = "5";
    const totalDistance = "5";
    const totalTime = "5";
    const timeToCharge = "5";

    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(endWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[3]/div/div[1]/div/input").click().type(energyNeeded);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[4]/div/div[1]/div/input").click().type(totalDistance);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[5]/div/div[1]/div/input").click().type(totalTime);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[6]/div/div[1]/div/input").click().type(timeToCharge);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/button[1]/span[1]").click();
    cy.wait(5000);

    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[4]/span[1]").click();

    cy.contains("Paths");

    cy.get("mat-select").first().click().get("mat-option").contains("Path by Beginning and Ending Warehouse").click();

    cy.xpath("/html/body/app-root/div/app-list-paths/div/mat-form-field[2]/div/div[1]/div/input").click().type(begWarehouse).type("{enter}");

    cy.xpath("/html/body/app-root/div/app-list-paths/div/mat-form-field[3]/div/div[1]/div/input").click().type(endWarehouse).type("{enter}");

    cy.wait(1000);
    //verify that the path is in the table
    cy.get("tr").eq(2).contains(new RegExp("^ " + begWarehouse + " $")).parent("tr").within(() => {
      cy.contains(new RegExp("^ " + endWarehouse + " $")).parent("tr").within(() => {
        cy.contains(new RegExp("^ " + energyNeeded + " $")).parent("tr").within(() => {
          cy.contains(new RegExp("^ " + totalDistance + " $")).parent("tr").within(() => {
            cy.contains(new RegExp("^ " + totalTime + " $")).parent("tr").within(() => {
              cy.contains(new RegExp("^ " + timeToCharge + " $")).parent("tr");
            });
          });
        });
      });
    });
  });

  it("Should display an error message when trying to create a Path with the same beginning and ending Warehouse", () => {
    //Preconditions: There should exist at least 1 Warehouse entity in the system
    const begWarehouse = "C05";
    const endWarehouse = "C05";
    const energyNeeded = "5";
    const totalDistance = "5";
    const totalTime = "5";
    const timeToCharge = "5";


    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(endWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/button[1]/span[1]").click();


  });

  it("should display an error message when trying to create a Path with a negative value for energy needed", () => {
    //Preconditions: There should exist at least 1 Warehouse entity in the system
    const begWarehouse = "C05";
    const endWarehouse = "C55";
    const energyNeeded = "-5";
    const totalDistance = "5";
    const totalTime = "5";
    const timeToCharge = "5";


    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(endWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[3]/div/div[1]/div/input").click().type(energyNeeded);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/button[1]/span[1]").click();

  });

  it("should display an error message when trying to create a Path with a negative value for total distance", () => {
    //Preconditions: There should exist at least 1 Warehouse entity in the system
    const begWarehouse = "C05";
    const endWarehouse = "C55";
    const energyNeeded = "5";
    const totalDistance = "-5";
    const totalTime = "5";
    const timeToCharge = "5";

    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(endWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[3]/div/div[1]/div/input").click().type(energyNeeded);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[4]/div/div[1]/div/input").click().type(totalDistance);
    cy.xpath("/html/body/app-root/div/app-create-path/div/button[1]").click();
    cy.wait(1000);
    cy.contains("Error");


  });

  it("should display an error message when trying to create a Path with a negative value for total time", () => {
    //Preconditions: There should exist at least 1 Warehouse entity in the system
    const begWarehouse = "C05";
    const enndWarehouse = "C55";
    const energyNeeded = "5";
    const totalDistance = "5";
    const totalTime = "-5";
    const timeToCharge = "5";

    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(enndWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[3]/div/div[1]/div/input").click().type(energyNeeded);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[4]/div/div[1]/div/input").click().type(totalDistance);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[5]/div/div[1]/div/input").click().type(totalTime);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/button[1]/span[1]").click();
    cy.wait(2000);

    cy.contains("Error");
    //check if an alert is displayed

  });

  it("should display an error message when trying to create a Path with a negative value for time to charge", () => {
    //Preconditions: There should exist at least 1 Warehouse entity in the system
    const begWarehouse = "C05";
    const enndWarehouse = "C55";
    const energyNeeded = "5";
    const totalDistance = "5";
    const totalTime = "5";
    const timeToCharge = "-5";

    cy.visit("http://localhost:4200");
    // @ts-ignore
    // cy.login('LogisticManager', 'as')
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVkdWFyZG8gU291c2EiLCJlbWFpbCI6ImVkdWFyZG9hcHNvdWFAZ21haWwuY29tIiwibmJmIjoxNjcyOTExMTI4LCJleHAiOjE2NzM1MTU5MjgsImlhdCI6MTY3MjkxMTEyOH0.70OGxuMIIFNZueiuKpQ2SjYF-SBfWsFRFxxKSxUqLfw");
    cy.visit("http://localhost:4200/#/LogisticManager");
    cy.visit("http://localhost:4200/#/LogisticManager");


    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-toolbar/button/span[1]/mat-icon").click();
    cy.xpath("/html/body/app-root/div/app-log-manager/div/app-log-side-bar/div/mat-sidenav-container/mat-sidenav/div/mat-nav-list/button[3]/span[1]").click();
    cy.contains("Create Path");
    cy.wait(1000);

    cy.get("mat-select").first().click().get("mat-option").contains(begWarehouse).click();
    cy.get("mat-select").eq(1).click().get("mat-option").contains(enndWarehouse).click();
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[3]/div/div[1]/div/input").click().type(energyNeeded);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[4]/div/div[1]/div/input").click().type(totalDistance);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[5]/div/div[1]/div/input").click().type(totalTime);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/mat-form-field[6]/div/div[1]/div/input").click().type(timeToCharge);
    cy.xpath("/html/body/app-root/div/app-create-path/div/div/button[1]/span[1]").click();
    cy.wait(200);
    cy.contains("Error");
    //check if an alert is displayed});
  });
});
