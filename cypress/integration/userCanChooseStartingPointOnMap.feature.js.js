describe("Choose location by clicking on map", () => {
  it("successfully", () => {
    cy.visitWithMockGeolocation();
    cy.get("#map").within(() => {
      cy.get('button[title="Zoom out"]')
        .click()
        .click()
        .click()
        .click()
        .click();
    });
    cy.wait(1000);
    cy.get("#map > div > div > div").click(389, 615);
    cy.get("#location").contains("52.054, 21.095")
  });
});
