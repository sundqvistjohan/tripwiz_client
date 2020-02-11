describe("See activities on a map", () => {
  it("successfully", () => {
    cy.createTrip();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/activity_type**",
      response: "fixtures:art_galleries.json"
    });
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get("button#finalize-trip").click();
    cy.get("#result").contains("Mmmm nice trip you have there...")
  });
});
