describe("User can login", () => {
  beforeEach(() => {
    cy.server()
  })
  it("unsuccessfully with invalid credentials", () => {
    cy.visit("/") ,
    cy.route({
      method: "GET",
      url: "v3.1/me?access_token*",
      status: "200",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.route({
      method: "POST",
      url: "/auth",
      status: "200",
    });
    cy.get("#login-button").click();
    cy.get("h2").should("contain", "Let's get started")
  });
})



