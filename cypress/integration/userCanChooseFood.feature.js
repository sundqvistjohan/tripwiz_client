describe("Restaurants", () => {
  it("needs a budget input", () => {
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
    cy.get(':nth-child(2) > :nth-child(1) > .fluid').click();
    cy.get(".active > .visible > :nth-child(3)").click();

    cy.get("#food-slider[type=range]").then(input =>
      changeRangeInputValue(input)(3)
    );
    cy.get(":nth-child(1) > .food-choice > .ui").click()
    cy.get("#root").should("contain", "Restaurants added!");
  });

  it("needs a budget input", () => {
    cy.createTrip();
    cy.chooseActivityType();
    cy.get(':nth-child(2) > :nth-child(1) > .fluid').click();
    cy.get(".active > .visible > :nth-child(3)").click();
    cy.get(":nth-child(1) > .food-choice > .ui").click()
    cy.get("#root").should("contain", "Please add your budget");
  });


})