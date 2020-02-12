describe("User", () => {
  it("can click his way backwards", () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    const changeRangeInputValue = $range => value => {
      nativeInputValueSetter.call($range[0], value);
      $range[0].dispatchEvent(new Event("change", { value, bubbles: true }));
    };
    cy.createTrip();
    cy.chooseActivityType();
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

    cy.get(".App > :nth-child(2)").click()
    cy.get(".activities > .button").click()
    cy.get("#root").should("contain", "pick a spot");
  });
});
