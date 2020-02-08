// React overrides the DOM node's setter, so get the original, as per the linked Stack Overflow
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;
describe("Range", () => {
  it("Updates the value and UI when changing a range input", () => {
    cy.server();
    cy.visit("/trip");
    cy.get('#slider').then($range => {
      const range = $range[3];
      // set the value manually
      nativeInputValueSetter.call(range, 12);
      // now dispatch the event
      range.dispatchEvent(new Event("change", { value: 12, bubbles: true }));
    });
  });
});

// describe("Hotels", () => {
//   it("are added to trip succesfully", () => {
//     cy.createTrip();
//     cy.chooseActivityType();
//     cy.get('#slider[type=range]').invoke('val', 4).trigger('input');

//     cy.get(".grid > :nth-child(2) > .ui").click()
//     cy.get("#root").should("contain", "Found Hotels!");
//   });

//   it("unsuccesfully adds activity type when no trip created", () => {
//     cy.server();
//     cy.visit("/trip");
//     cy.chooseActivityType();

//     cy.get(".grid > :nth-child(2) > .ui").click()
//     cy.get("#root").should("contain", "Couldn't find any hotels");
//   });
// });
