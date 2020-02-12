describe("See activities on a map", () => {
  it("successfully", () => {
    cy.createTrip();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/activity_types",
      response: "fixture:activities_for_map.json",
      status: 200
    });
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get('img[src="/mapIcons/art_gallery.png"]')
      .last()
      .click({ force: true });
    cy.get(".gm-style-iw.gm-style-iw-c").contains("makemake");
  });
});

