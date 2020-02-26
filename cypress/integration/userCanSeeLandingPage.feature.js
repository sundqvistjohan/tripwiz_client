describe("User can see restaurants", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/landing");
  });

  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips**",
      response: "fixture:trips_response.json",
      status: 200
    });

    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/trips**",
      response: "fixture:landing_page_cards.json",
      status: 200
    });
    
    cy.get('.hero').should('contain', 'Welcome')
  });
});