Cypress.Commands.add('visitWithMockGeolocation', (latitude = 59.334591, longitude = 18.063240) => {
  const mockGeolocation = (win, latitude, longitude) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
      return cb({ coords: { latitude, longitude } });
    });
  };
  cy.visit('/', {
    onBeforeLoad: win => {
      mockGeolocation(win, latitude, longitude);
    }
  });
});