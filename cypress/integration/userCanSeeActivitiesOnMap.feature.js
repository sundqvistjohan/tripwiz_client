describe("See activities on a map", () => {
  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/activities**",
      response: "fixtures:art_galleries.json"
    });
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get("#finalize-trip").click();
    cy.get("#result").contains("Mmmm nice trip you have there...")
  });
});
