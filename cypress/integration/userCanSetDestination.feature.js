describe("User is shown destination input field", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("can submit destination", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/trips/**",
      response: {
        success: true
      }
    });
  
    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    })
  });

});