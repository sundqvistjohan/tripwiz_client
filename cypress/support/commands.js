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
    url: "http://localhost:3000/api/**",
    response: "fixtures:inputDest.json"
  });
  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/**",
    response: "fixtures:inputDest.json"
  });
  cy.get("#days").click();
  cy.get("#days > .visible > :nth-child(3)").click();
  cy.get("#days").should("contain", "3");
  cy.get("#create-trip").click();
});

Cypress.Commands.add("chooseActivityType", () => {
  cy.get(".grid > :nth-child(1) > :nth-child(3) > .dropdown")
    .first()
    .click();
  cy.get(".active > .visible > :nth-child(3)").click();

  cy.get(".grid > :nth-child(1) > :nth-child(5) > .dropdown").click();
  cy.get(".active > .visible > :nth-child(3)").click();

  cy.get(".activities")
    .should("contain", "Art Gallery")
    .should("contain", "Three");

  cy.get(":nth-child(1) > .button")
    .should("contain", "Find activities")
    .click();
});
