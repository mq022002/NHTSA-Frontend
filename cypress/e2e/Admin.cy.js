describe("Admin Functionality Flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/home");

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
          "cognito:groups": ["superusers"],
        })
      );
    });

    cy.visit("http://localhost:3000/home");
  });

  it("should navigate to admin page when Admin link is clicked", () => {
    cy.get("a").contains("Admin").click();
    cy.url().should("include", "/admin");
  });
});
