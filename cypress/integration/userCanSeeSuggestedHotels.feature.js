describe("User can see suggested hotels as cards", () => {
  beforeEach(() => {
    cy.viewport(1200, 660)
    cy.server();
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
      response: "fixture:hotels_list_shown.json",
      status: 200
    });
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/hotels**",
      response: "fixture:hotels_list_shown_deleted.json",
      status: 200
    });
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();

    cy.get('#slider').as('range')
      .invoke('val', 25)
      .trigger('change')
    cy.get("#find-hotels").click()

    cy.chooseRestaurants()

    cy.get('.tabular > :nth-child(4)').click()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/hotels**",
      response: "fixture:hotels_list_shown_deleted.json",
      status: 200
    });
    cy.get(':nth-child(1) > #hotel-cards > .extra > .ui').click()
    cy.get('.stackable').children().should('have.length', 1)
  });

});