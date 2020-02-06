describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });
  it("successfully login", () => {
    cy.visit("/login") 
    cy.route({
      method: "POST",
      url: "http://localhost:3000/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get('button').contains('Submit').click()
    });
    cy.get("#login").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
  });
})
