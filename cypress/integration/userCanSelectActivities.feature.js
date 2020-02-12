describe("Activities", () => {
  it("are added to trip succesfully", () => {
    cy.createTrip();
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Found activities");
  });

  it("unsuccesfully adds activity type when no trip created", () => {
    cy.server();
    cy.createTrip();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/activity_types?activity_type=art_gallery&activity_visits=3",
      status: 422
    });
    cy.chooseActivityType();
    cy.get("#root").should("contain", "Couldn't add activity, try something more popular");
  });
});
