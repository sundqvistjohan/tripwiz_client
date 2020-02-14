import React, { useState, useEffect } from "react";
import { getTrips } from "../modules/destination.js";
import { Button } from "semantic-ui-react";

const TripsList = () => {
  const [trips, setTrips] = useState(null);
  const [gotTrips, setGotTrips] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [viewCard, setViewCard] = useState(null);
  const [viewList, setViewList] = useState(null);

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      setTrips(response.data);
      setSelectedCard(response.data[4]);
      setGotTrips(true);
    }
  };

  const onClickHandler = event => {
    let pos = trips
      .map(e => {
        return e.id;
      })
      .indexOf(event);
    setSelectedCard(trips[pos]);
  };

  useEffect(() => {
    getTripsData();
  }, []);

  useEffect(() => {
    generateCard(selectedCard);
    generateTripList(trips);
  }, [gotTrips]);

  useEffect(() => {
    generateCard(selectedCard);
    generateTripList(trips);
  }, [selectedCard]);

  const generateCard = trip => {
    let tripCard;
    if (gotTrips) {
      tripCard = (
        <div key={trip.id} className={`trip-header-first-${trip.destination}`}>
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
    }
    setViewCard(tripCard);
  };

  const generateTripList = trips => {
    let tripHeaders;
    if (gotTrips) {
      let filteredList = trips.filter(trip => trip.id !== selectedCard.id);
      tripHeaders = filteredList.map(trip => {
        return (
          <div key={trip.id} className={`trip-header`}>
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
      });
    }
    setViewList(tripHeaders);
  };

  return (
    <>
      {viewList}
      {viewCard}
    </>
  );
};

export default TripsList;
