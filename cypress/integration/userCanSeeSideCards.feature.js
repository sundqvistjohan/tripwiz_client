describe("User can see side cards", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    cy.login();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips/**",
      response: "fixture:showcard_response.json",
      status: 200
    });
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants(); 
    cy.get('#trip-card').should('contain', 'View trip')
  });
});
