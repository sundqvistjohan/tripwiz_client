describe("Activities", () => {
  it("are added to trip succesfully", () => {
    cy.createTrip();
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Found activities");
  });

  it("unsuccesfully adds activity type when no trip created", () => {
    cy.server();
    cy.visit("/trip");
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Couldn't add activity, try something more popular");
  });
});
