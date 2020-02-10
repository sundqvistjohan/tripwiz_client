describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });
  it("unsuccessfully with invalid credentials", () => {
    cy.visit("/") 
    cy.route({
      method: "POST",
      url: "http://localhost:3000/auth/sign_in",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.get("#login-button").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("pass");
      cy.get('button').contains('Submit').click()
    });
    cy.get("#login").should(
      "contain",
      "Invalid login credentials. Please try again."
    );
  });
  it("successfully with valid credentials", () => {
    cy.visit("/");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/auth/sign_in",
      response: "fixture:login_user.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/**",
      response: "fixture:login_user.json"
    });
    cy.get("#login-button").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    });
    cy.get("#login").should("contain", "Logged in as: user@mail.com");
  });
})
describe("User can log out", () =>{
  it("successfully", () => {
    cy.server();
    cy.visit("/");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/auth/sign_in",
      response: "fixture:login_user.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/**",
      response: "fixture:login_user.json"
    });
    cy.get("#login-button").click();
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Submit")
        .click();
    }); 
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/auth/sign_in",
      response: "fixture:login_user.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/auth/**",
      response: "fixture:login_user.json"
    });
    cy.get("#logout-link").click();
    cy.get("#login-button").click()
  });
});


