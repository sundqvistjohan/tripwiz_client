describe("Hotels", () => {
  it("are added to trip succesfully", () => {
    cy.createTrip();
    cy.chooseActivityType();
    cy.get('#slider[type=range]').invoke('val', 4).trigger('change');

    cy.get(".grid > :nth-child(2) > .ui").click()
    cy.get("#root").should("contain", "Found Hotels!");
  });

  it("unsuccesfully adds activity type when no trip created", () => {
    cy.server();
    cy.visit("/trip");
    cy.chooseActivityType();

    cy.get(".grid > :nth-child(2) > .ui").click()
    cy.get("#root").should("contain", "Couldn't find any hotels");
  });
});
