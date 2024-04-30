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

  it("should change the value of the year select field to 2017, click the button, and verify the text is visible", () => {
    cy.visit("http://localhost:3000/vehicle_insurance_rates");
    cy.wait(500);
    cy.get('[data-testid="model-select"]').should("be.disabled");
    cy.get('[data-testid="year-select"]')
      .should("not.be.disabled")
      .select("2017");
    cy.get('[data-testid="fetch-data-button"]').click();
    cy.contains("Please provide a year, make, and model.").should("be.visible");
  });
});
