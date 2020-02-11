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
    cy.createTrip();
    cy.chooseActivityType();
    cy.get("#slider[type=range]").then(input =>
      changeRangeInputValue(input)(4)
    );

    cy.get("#find-hotels").click();
    cy.get("#root").should("contain", "Found Hotels!");
  });

  it("needs a budget input", () => {
    cy.createTrip();
    cy.chooseActivityType();

    cy.get("#find-hotels").click();
    cy.get("#root").should("contain", "Your forgot to add a budget");
  });
});
