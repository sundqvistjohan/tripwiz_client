describe("See activities on a map", () => {
  it("successfully", () => {
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get('img[src="/mapIcons/art_gallery.png"]')
      .last()
      .click({ force: true });
    cy.get(".gm-style-iw.gm-style-iw-c").contains("Fotografiska Gallery");
  });
});

