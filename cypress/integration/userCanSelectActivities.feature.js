describe("Activities", () => {
  it("are added to trip succesfully", () => {
    cy.createTrip();
    cy.choseActivityType();
    cy.get("#root").not("contain", "Something went wrong");
  });

  it("unsuccesfully adds activity type when no trip created", () => {
    cy.server();
    cy.visit("/activities");
    cy.choseActivityType();
    cy.get("#root").should("contain", "Something went wrong");
  });
});
