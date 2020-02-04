describe("User is shown destination input field", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("can submit destination successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/**",
      response: 200
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/**",
      response: 200
    });
  
    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    })
    cy.get("#root").should("contain", "Destination Submitted")
  });

  it("can submit destination successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/**",
      response: {
        errors: "Submit Failed",
        success: false
      }
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/**",
      response: {
        errors: "Submit Failed",
        success: false
      }
    });
  
    cy.get("#place-form").within(() => {
      cy.get("#place").type("Rome");
      cy.get("#submit").click();
    })
    cy.get("#root").should("contain", "Submit Failed")
  });

});