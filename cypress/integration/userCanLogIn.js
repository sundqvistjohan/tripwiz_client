describe("User can login", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });
  it("successfully login", () => {
    cy.visit("/login") 
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get('button').contains('Submit').click()
    });
  });
})
