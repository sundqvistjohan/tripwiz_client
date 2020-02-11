Cypress.Commands.add(
  "visitWithMockGeolocation",
  (latitude = 59.334591, longitude = 18.06324) => {
    const mockGeolocation = (win, latitude, longitude) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition", cb => {
        return cb({ coords: { latitude, longitude } });
      });
    };
    cy.visit("/", {
      onBeforeLoad: win => {
        mockGeolocation(win, latitude, longitude);
      }
    });
  }
);

Cypress.Commands.add("createTrip", () => {
  cy.server();
  cy.visit("/");

  let destination = "Rome";
  cy.route({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?**",
    response: "fixture:inputDest.json",
    params: {
      address: destination,
      key: process.env.REACT_APP_GOOGLE_APIKEY
    }
  });
  cy.get("#place-form").within(() => {
    cy.get("#place").type("Rome");
    cy.get("#submit").click();
  });
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/trip**",
    response: "fixtures:inputDest.json"
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/v1/trip**",
    response: "fixtures:inputDest.json"
  });
  cy.get("#days").click();
  cy.get("#days > .visible > :nth-child(3)").click();
  cy.get("#days").should("contain", "3");
  cy.get("#create-trip").click();
});

Cypress.Commands.add("chooseActivityType", () => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/activity_type**",
    response: "fixtures:inputDest.json"
  });
  cy.get(".activities > :nth-child(3)")
    .first()
    .click();
  cy.get(".active > .visible > :nth-child(3)").click();

  cy.get(".activities > :nth-child(5)").click();
  cy.get(".active > .visible > :nth-child(3)").click();

  cy.get(".activities")
    .should("contain", "Art Gallery")
    .should("contain", "Three");

  cy.get(":nth-child(1) > .button")
    .should("contain", "Find activities")
    .click();
});

Cypress.Commands.add("chooseHotel", () => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/hotels**",
    response: "fixtures:inputDest.json"
  });
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  const changeRangeInputValue = $range => value => {
    nativeInputValueSetter.call($range[0], value);
    $range[0].dispatchEvent(new Event("change", { value, bubbles: true }));
  };
  cy.get("#slider[type=range]").then(input => changeRangeInputValue(input)(4));
  cy.get(".grid > :nth-child(2) > .ui").click();
  cy.get("#root").should("contain", "Found Hotels!");
});

Cypress.Commands.add("chooseRestaurants", () => {
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/v1/activity_type**",
    response: "fixtures:inputDest.json"
  });
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  const changeRangeInputValue = $range => value => {
    nativeInputValueSetter.call($range[0], value);
    $range[0].dispatchEvent(new Event("change", { value, bubbles: true }));
  };
  cy.get(":nth-child(7) > .fluid > .dropdown").click();
  cy.get(".active > .visible > :nth-child(3)").click();
  cy.get("#food-slider[type=range]").then(input =>
    changeRangeInputValue(input)(3)
  );
  cy.get(":nth-child(7) > .food-choice > .ui").click();
  cy.get("#root").should("contain", "Restaurants added!");
});
