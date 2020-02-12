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

    cy.get("#back-button-4").click()
    cy.wait(100)
    cy.get("#back-button-2").click()
    cy.wait(100)
    cy.get("#root").should("contain", "pick a spot");
  });
});
