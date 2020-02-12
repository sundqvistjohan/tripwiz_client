describe("Activities", () => {
  it("are added to trip succesfully", () => {
    cy.createTrip();
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Found activities");
  });
});
