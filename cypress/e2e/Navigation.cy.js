describe("Navigation and Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/home");
  });

  it("should display the logo", () => {
    cy.get('img[alt="logo"]').should("be.visible");
  });

  it("should navigate to home page when Home link is clicked", () => {
    cy.get("a").contains("Home").click();
    cy.url().should("include", "/home");
  });

  it("should navigate to about page when About link is clicked", () => {
    cy.get("a").contains("About").click();
    cy.url().should("include", "/about");
  });

  it("should not display Fetch Vehicle Data link when user is not logged in", () => {
    cy.get("a").contains("Fetch Vehicle Data").should("not.exist");
  });

  it("should not display Account link when user is not logged in", () => {
    cy.get("a").contains("Account").should("not.exist");
  });

  it("should not display Admin link when user is not a superuser", () => {
    cy.get("a").contains("Admin").should("not.exist");
  });

  describe("when logged in", () => {
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

    it("should display the user's name", () => {
      cy.get("a").contains("fake-name").should("be.visible");
    });

    it("should navigate to account page when user's name is clicked", () => {
      cy.get("a").contains("fake-name").click();
      cy.url().should("include", "/account");
    });

    it("should navigate to vehicle insurance rates page when Vehicle Insurance Rates link is clicked", () => {
      cy.get("a").contains("Vehicle Insurance Rates").click();
      cy.url().should("include", "/vehicle_insurance_rates");
    });

    it("should not display Admin link when user is not a superuser", () => {
      cy.get("a").contains("Admin").should("not.exist");
    });

    it("should log out when Logout link is clicked", () => {
      cy.get("a").contains("Logout").click();
      cy.window().its("localStorage").should("be.empty");
    });
  });
});
