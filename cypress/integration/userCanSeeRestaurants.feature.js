describe("User can see restaurants", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    cy.login();
    cy.createTrip();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips/1",
      response: "fixture:showcard_response.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/activity_types**",
      response: "fixture:3_restaurants_displayed.json",
      status: 200
    });
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/activity_types**",
      response: "fixture:3_restaurants_displayed.json",
      status: 200
    });
    cy.chooseRestaurants();
    cy.get("a").contains("Restaurants").click();
    cy.get('#root').should('contain', 'Valentyne')
  });
});