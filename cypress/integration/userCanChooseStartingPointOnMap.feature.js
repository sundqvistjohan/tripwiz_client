describe("Choose location by clicking on map", () => {
  it("successfully", () => {
    cy.visitWithMockGeolocation();
    cy.get("#embed-map").within(() => {
      cy.get('button[title="Zoom out"]')
        .click()
    });
    cy.wait(1000);
    cy.get("#embed-map > div > div > div").click(50, 59);
    cy.get("#root").should(
      "contain",
      "Destination successfully chosen from map"
    );
  });
});
