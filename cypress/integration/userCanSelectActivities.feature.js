describe("Activities", () => {
  it("are added to trip succesfully", () => {
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Found activities");
  });
});
