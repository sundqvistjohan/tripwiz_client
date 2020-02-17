# TripWiz Client

TripWiz is a trip planner, mainly for city get-aways, where a suggested itinerary is provided to you based on a few of your preferences. User authentication is through facebook login, and the client interface is built on React with redux, while the backend is Rails with various google and amedeus API's attached.

## Deployed Site
https://tripwiz.netlify.com/

## Dependencies
- React 16.12.0
- react-redux 7.1.3
- axios 
- j-tockauth
- google-maps-react
- react-facebook
- react-scroll

## To run locally
#### Clone repository
```
$ git clone https://github.com/EevanR/tripwiz_client.git
$ cd tripwiz_client
```

#### Install dependencies
Install Cypress and dependencies
```
$ yarn
```
Install Cypress Testing
```
$ yarn add cypress --dev
```

## Run testing frameworks
In console:
Initialize and run cypress 
```
$ yarn cy:open
```

## Actions available to the user

Head to the deployed address listed above, or your local host with frontend running, run through the preferences to create your trip.

## Updates/Improvement plans
- Monetization through subscriptions and Stripe payments
- Your trips saved to your account
- suggestions for most booked destinations
- hotel and flight booking through amadeus

## License
Created under the <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>.