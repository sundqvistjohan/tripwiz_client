import React, { useState, useEffect } from "react";
import { getTrips } from "../modules/destination.js";
import { Button } from "semantic-ui-react";

const TripsList = () => {
  const [trips, setTrips] = useState(null);
  const [gotTrips, setGotTrips] = useState(false);

  const getTripsData = async () => {
    let response = await getTrips();
    debugger
    if (response.status === 200) {
      debugger
      setTrips(response.data);
      setGotTrips(true);
    }
  };

  const onClickHandler = event => {
    let slicedTrips = trips;
    slicedTrips.splice(
      slicedTrips.length - 1,
      0,
      slicedTrips.splice(event - 1, 1)[0]
    );
    setTrips(slicedTrips);
  };

  let tripHeaders = [];

  useEffect(() => {
    debugger
    getTripsData();
  }, []);

  if (gotTrips) {
    let tripsLen = trips.length;
    trips.forEach((trip, i) => {
      if (tripsLen - 1 === i) {
        debugger
        tripHeaders.push(
          <div
            key={trip.id}
            className={`trip-header-first-${trip.destination}`}
          >
            <div id="trip-cards" className="ui card">
              <div className="image">
                <img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" />
              </div>
              <div className="content">
                <div className="header">{trip.destination}</div>
                <div className="description">
                  <p>hejhej</p>
                </div>
              </div>
              <div className="extra content">
                <Button>View trip</Button>
              </div>
            </div>
          </div>
        );
      } else {
        tripHeaders.push(
          <div key={trip.id} className={`trip-header-not-header-${i}`}>
            <div
              id="trip-headers"
              onClick={() => onClickHandler(trip.id)}
              className="ui card"
            >
              <div className="content">
                <div className="header">
                  <h5>
                    {trip.days} days in {trip.destination}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    debugger
  }

  return <>{tripHeaders}</>;
};

export default TripsList;
