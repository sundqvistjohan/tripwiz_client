import React, { useState, useEffect } from "react";
import { getTrips } from "../modules/destination.js";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

const TripsList = (props) => {
  const [trips, setTrips] = useState(null);
  const [gotTrips, setGotTrips] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [viewCard, setViewCard] = useState(null);
  const [viewList, setViewList] = useState(null);

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      props.setSelectedCard(response.data[0]);
      props.setTrips(response.data)
      setGotTrips(true);
    }
  };

  const onClickHandler = event => {
    let pos = props.trips
      .map(e => {
        return e.id;
      })
      .indexOf(event);
    props.setSelectedCard(props.trips[pos]);
  };

  useEffect(() => {
    getTripsData();
  }, []);

  useEffect(() => {
    generateCard(props.selectedCard);
    generateTripList(trips);
  }, [gotTrips]);

  useEffect(() => {
    generateCard(props.selectedCard);
    generateTripList(trips);
  }, [props.selectedCard]);

  const generateCard = () => {
    let tripCard;
    if (gotTrips && props.selectedCard) {
      tripCard = (
        <div key={props.selectedCard.id} className={`trip-header-first-${props.selectedCard.destination}`}>
          <div id="trip-cards" className="ui card">
            <div className="image">
              <img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" />
            </div>
            <div className="content">
              <div className="header">{props.selectedCard.destination}</div>
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
    if (gotTrips && props.trips) {
      let filteredList = props.trips.filter(trip => trip.id !== props.selectedCard.id);
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

const mapStateToProps = state => {
  return {
    selectedCard: state.selectedCard,
    trips: state.trips
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedCard: data => {
      dispatch({ type: "SET_SELECTEDCARD", payload: data });
    },
    setTrips: data => {
      dispatch({ type: "SET_TRIPS", payload: data });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
