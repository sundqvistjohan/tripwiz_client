describe("User can see activities", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/trip");
  });

  it("successfully", () => {
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel();
    cy.chooseRestaurants();
    cy.get(".result-right").contains("Activities").click();
    cy.get('#root').should('contain', 'Vasa Gallery')

  });
});
