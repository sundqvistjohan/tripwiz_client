import React, { useState } from "react";
import { getCoords, initializeTrip } from "../modules/destination";
import { connect } from "react-redux";
import EmbedMap from "./EmbedMap.jsx";
import { Redirect } from "react-router-dom";

const Destination = props => {
  const [redirect, setRedirect] = useState(false);

  const submitPlace = async e => {
    e.preventDefault();
    let response = await getCoords(e.target.place.value);
    if (!response.error) {
      if (response.data.status !== "ZERO_RESULTS") {
        response = response.data.results[0];
        props.setLat(response.geometry.location.lat);
        props.setLng(response.geometry.location.lng);
        props.setMessage("Destination successfully selected");
      } else {
        props.setMessage("Can't go there. Zero Results");
      }
    } else {
      props.setMessage(response.message);
    }
  };

  const onClickHandler = async () => {
    const response = await initializeTrip(props);
    if (response.status === 200) {
      props.setDestination(response.data.destination);
      props.setTripId(response.data.id)
      setRedirect(true);
    } else {
      return props.setMessage("Something went wrong.");
    }
  };

  return (
    <>
      <h2>To get started...</h2>
      <form onSubmit={submitPlace} id="place-form">
        <label>Choose your destination here! </label>
        <input name="place" type="text" id="place" placeholder="City"></input>
        <button id="submit">Submit</button>
      </form>
      <p>Or pick a spot on the map!</p>
      {props.message}
      <button id="create-trip" onClick={onClickHandler}>
        Let's Go!
      </button>
      <EmbedMap />
      {redirect && <Redirect to="/activities" />}
    </>
  );
};

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    destination: state.destination,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLat: lat => {
      dispatch({ type: "CHANGE_LAT", payload: lat });
    },
    setLng: lng => {
      dispatch({ type: "CHANGE_LNG", payload: lng });
    },
    setDestination: dest => {
      dispatch({ type: "SET_DEST", payload: dest });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    },
    setTripId: id => {
      dispatch({ type: "SET_TRIP_ID", payload: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
