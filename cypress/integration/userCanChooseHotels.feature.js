describe("Hotels", () => {
  it("are added to trip succesfully", () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    const changeRangeInputValue = $range => value => {
      nativeInputValueSetter.call($range[0], value);
      $range[0].dispatchEvent(new Event("change", { value, bubbles: true }));
    };
    cy.login();
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
    cy.get("#slider[type=range]").then(input =>
      changeRangeInputValue(input)(4)
    );
  });

  it("needs a budget input", () => {
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/hotels**",
      response: {
        status: 200
      }
    });
    cy.get("#find-hotels").click();
    cy.get("#root").should("contain", "Your forgot to add a budget");
  });
});
