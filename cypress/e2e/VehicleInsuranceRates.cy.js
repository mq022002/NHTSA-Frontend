describe("Vehicle Insurance Rates Flow", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem("accessToken", "fake_access_token");
      win.localStorage.setItem("idToken", "fake_id_token");
      win.localStorage.setItem("refreshToken", "fake_refresh_token");
      win.localStorage.setItem(
        "cognitoUser",
        JSON.stringify({
          sub: "fake-sub",
          aud: "fake-aud",
          email: "fake-email@example.com",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          iat: Math.floor(Date.now() / 1000),
          name: "fake-name",
        })
      );
    });

    cy.visit("http://localhost:3000/home");
  });

  it("should navigate to vehicle insurance rates page when Vehicle Insurance Rates link is clicked", () => {
    cy.get("a").contains("Vehicle Insurance Rates").click();
    cy.url().should("include", "/vehicle_insurance_rates");
  });

  it("should select a vehicle, fetch data, and display vehicle details and insurance rate", () => {
    cy.visit("http://localhost:3000/vehicle_insurance_rates");
    cy.wait(2000);
    cy.get('[data-testid="make-select"]').should("be.disabled");
    cy.get('[data-testid="model-select"]').should("be.disabled");
    cy.get('[data-testid="year-select"]')
      .should("not.be.disabled")
      .select("2017");
    cy.get('[data-testid="make-select"]').should("not.be.disabled");
    cy.get('[data-testid="fetch-data-button"]').click();
    cy.contains("Please provide a year, make, and model.").should("be.visible");
    cy.get('[data-testid="make-select"]')
      .should("not.be.disabled")
      .select("Honda");
    cy.get('[data-testid="fetch-data-button"]').click();
    cy.contains("Please provide a year, make, and model.").should("be.visible");
    cy.get('[data-testid="model-select"]')
      .should("not.be.disabled")
      .select("Civic");
    cy.get('[data-testid="fetch-data-button"]').click();
    cy.wait(2000);
    cy.contains("Please provide a year, make, and model.").should("not.exist");
    cy.contains("Vehicle: 2017 Honda Civic 2 DR FWD", {
      timeout: 20000,
    }).should("be.visible");
    cy.contains("Vehicle: 2017 Honda Civic 2 DR FWD").click();
    cy.contains("Insurance Rate").should("be.visible");
  });
});
