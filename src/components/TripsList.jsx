import React, { useState, useEffect } from "react";
import {
  getTrips,
  getActivities,
  getRestaurants,
  getHotels,
  getTrip
} from "../modules/destination.js";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";

const TripsList = props => {
  const [gotTrips, setGotTrips] = useState(false);
  const [viewCard, setViewCard] = useState(null);
  const [viewList, setViewList] = useState(null);

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      props.setSelectedCard(response.data[0]);
      props.setTrips(response.data);
      setGotTrips(true);
    }
  };

  const onClickHandler = async event => {
    let pos = props.trips
      .map(e => {
        return e.id;
      })
      .indexOf(event);
    props.setSelectedCard(props.trips[pos]);
  };

  const onButtonHandler = async () => {
    props.setTrip(props.selectedCard.id);
    props.setLng(props.selectedCard.lng);
    props.setLat(props.selectedCard.lat);
    let response = await getActivities(props.selectedCard.id);
    if (response.status === 200) {
      props.setActivities(response.data);
    }
    let response2 = await getRestaurants(props.selectedCard.id);
    if (response2.status === 200) {
      props.setRestaurants(response2.data);
    }
    let response3 = await getHotels(props.selectedCard.id);
    if (response3.status === 200) {
      props.setHotels(response3.data);
    }
  };

  useEffect(() => {
    getTripsData();
  }, []);

  useEffect(() => {
    generateCard(props.selectedCard);
    generateTripList(props.trips);
  }, [gotTrips]);

  useEffect(() => {
    generateCard(props.selectedCard);
    generateTripList(props.trips);
  }, [props.selectedCard]);

  const generateCard = () => {
    let tripCard;
    if (gotTrips && props.selectedCard) {
      tripCard = (
        <div key={props.selectedCard.id} className={`trip-header`}>
          <div id="trip-cards" className="ui card">
            <div className="image">
              <img src="https://thumbnails.trvl-media.com/PUrr-BSAcHRWzkWDuOP2XTmK80I=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/1000000/600000/598500/598487/30a71d36_z.jpg" />
            </div>
            <div className="content">
              <div className="header">{props.selectedCard.destination}</div>
              <div className="description"></div>
            </div>
            <div className="extra content">
              <Button onClick={onButtonHandler}>View trip</Button>
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
      let filteredList = props.trips.filter(
        trip => trip.id !== props.selectedCard.id
      );
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
    trips: state.trips,
    activityType: state.activityType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedCard: data => {
      dispatch({ type: "SET_SELECTEDCARD", payload: data });
    },
    setTrips: data => {
      dispatch({ type: "SET_TRIPS", payload: data });
    },
    setTrip: id => {
      dispatch({ type: "SET_TRIP", payload: id });
    },
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat });
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng });
    },
    setRestaurants: data => {
      dispatch({ type: "SET_RESTAURANTS", payload: data });
    },
    setHotels: data => {
      dispatch({ type: "SET_HOTELS", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripsList);
