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

    cy.get(".result-right")
      .contains("Rating")
      .click();

    cy.get("#destination-rating").click();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/ratings?trip**",
      response: {
        status: 200
      }
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/ratings/**",
      response: "fixture:ratings_response",
      status: 200
    });
    cy.get(".active > .visible > :nth-child(3)").click();
    cy.get("#rate-trip").click();
    cy.get("#destination-rating").contains("Destination rating: 4");


    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/ratings/**",
      response: "fixture:ratings_response_2.json",
      status: 200
    });
    cy.get("#destination-rating").click();
    cy.get("#destination-rating").click();
    cy.get(".active > .visible > :nth-child(5)").click();
    cy.get("#rate-trip").click();
    cy.get("#destination-rating").contains("Destination rating: 5");
  });
});
