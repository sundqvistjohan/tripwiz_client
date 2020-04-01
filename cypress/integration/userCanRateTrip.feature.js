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
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/ratings/**",
      response: "fixture:ratings_response_unrated",
      status: 200
    });
    cy.get(".result-right").contains("Rating").click();
  });
});


