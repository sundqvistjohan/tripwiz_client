describe("User is shown destination input field", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/");
  });

  it("can select destination successfully", () => {
    let destination = "Rome"
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
    })
    cy.get("#root").should("contain", "Destination successfully selected")
  });

  it("can select destination unsuccessfully", () => {
    let destination = "sdfsdfsdf"
    cy.route({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?**",
      response: "fixture:inputDest0Results.json",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });

    cy.get("#place-form").within(() => {
      cy.get("#place").type("sdfsdfsdf");
      cy.get("#submit").click();
    })
    cy.get("#root").should("contain", "Can't go there. Zero Results")
  });

});