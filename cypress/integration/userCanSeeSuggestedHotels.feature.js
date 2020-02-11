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
      response: "fixture:hotels_list_shown.json",
      status: 200
    });
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/v1/hotels**",
      response: "fixture:hotels_list_shown_deleted.json",
      status: 200
    });
    cy.get('#hotel5 > h3').click()
    cy.get('#slider').as('range')
      .invoke('val', 25)
      .trigger('change')
    cy.get("#find-hotels").click()
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/hotels**",
      response: "fixture:hotels_list_shown_deleted.json",
      status: 200
    });
    cy.get(':nth-child(2) > #hotel-cards > .extra > .ui').click()
  });

});