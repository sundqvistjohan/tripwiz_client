describe("User can see suggested hotels as cards", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/hotels**",
      response: {
        status: 200
      }
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/hotels**",
      response: "fixture:hotels_list_shown.json"
    });
    cy.get('#hotel5 > h3').click()
    cy.get('#slider').as('range')
      .invoke('val', 25)
      .trigger('change')
    cy.get("#find-hotels").click()

    cy.get('.stackable').should('contain', 'Berns Hotel')
  });

});