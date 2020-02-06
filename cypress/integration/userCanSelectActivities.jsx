describe("Activities", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/activities");
  });
  it("can see the destination chosen", () => {
    cy.get(".activities").within(() => {
      cy.get(".seven > :nth-child(2)").click();
      cy.get(".active > .visible > :nth-child(3)").click();
      cy.get(".seven > :nth-child(4)").click();
      cy.get(".active > .visible > :nth-child(3)").click();
    });
    cy.get(".activities")
      .should("contain", "Art Gallery")
      .should("contain", "Three");
  });
});
