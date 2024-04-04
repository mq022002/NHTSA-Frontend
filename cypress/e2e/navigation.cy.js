describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the logo", () => {
    cy.get('img[alt="logo"]').should("be.visible");
  });

  it("should navigate to home page when Home link is clicked", () => {
    cy.get("a").contains("Home").click();
    cy.url().should("include", "/");
  });

  it("should navigate to the correct URL when Login / Register link is clicked", () => {
    cy.get("a").contains("Login / Register").click();
    cy.url().should(
      "include",
      "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
    );
  });

  it("should navigate to fetch vehicle data page when Fetch Vehicle Data link is clicked", () => {
    cy.simulateNextAuthSession({
      user: { name: "Test User", email: "test@example.com" },
      accessToken: "mockAccessToken",
      expires: "2022-01-01T00:00:00.000Z",
    });

    cy.visit("http://localhost:3000");

    cy.get("a").contains("Fetch Vehicle Data").click();
    cy.url().should("include", "/fetch_vehicle_data");
  });

  it("should navigate to account page when user name link is clicked", () => {
    cy.simulateNextAuthSession({
      user: { name: "Test User", email: "test@example.com" },
      accessToken: "mockAccessToken",
      expires: "2022-01-01T00:00:00.000Z",
    });

    cy.visit("http://localhost:3000");

    cy.get("a").contains("Test User").click();
    cy.url().should("include", "/account");
  });

  it("should display the Logout link when the session exists", () => {
    cy.simulateNextAuthSession({
      user: { name: "Test User", email: "test@example.com" },
      accessToken: "mockAccessToken",
      expires: "2022-01-01T00:00:00.000Z",
    });

    cy.visit("http://localhost:3000");
    cy.get("a").contains("Logout").should("be.visible");
  });
});
