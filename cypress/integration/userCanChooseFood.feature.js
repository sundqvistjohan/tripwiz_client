describe("Restaurants", () => {
  it("can be succesfully found", () => {
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
    cy.chooseHotel()
    cy.get(".fluid > .dropdown").click();
    cy.get(".active > .visible > :nth-child(3)").click();
    

    cy.get("#food-slider[type=range]").then(input =>
      changeRangeInputValue(input)(3)
    );
    cy.get("#find-restaurants").click()
  });

  it("can be chosen two times", () => {
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
    cy.chooseHotel()
    cy.get(".fluid > .dropdown").click();
    cy.get(".active > .visible > :nth-child(3)").click();
    cy.get("#dropdown2").click();
    cy.get(".active > .visible > :nth-child(3)").click();
    

    cy.get("#food-slider[type=range]").then(input =>
      changeRangeInputValue(input)(3)
    );
    cy.get("#find-restaurants").click()
  });

  it("needs a budget input", () => {
    cy.login();
    cy.createTrip();
    cy.chooseActivityType();
    cy.chooseHotel()
    cy.get(".fluid > .dropdown").click();
    cy.get(".active > .visible > :nth-child(3)").click();
    cy.get("#find-restaurants").click()
    cy.get("#root").should("contain", "Please add your budget");
  });


})