import React, { useState } from "react";
import { getCoords, initializeTrip } from "../modules/destination";
import { connect } from "react-redux";
import EmbedMap from "./EmbedMap.jsx";
import { Redirect } from "react-router-dom";
import { Dropdown, Grid, Form, Button } from "semantic-ui-react";

const Destination = props => {
  const [redirect, setRedirect] = useState(false);

  const number = [
    { key: 1, value: "1", text: "1" },
    { key: 2, value: "2", text: "2" },
    { key: 3, value: "3", text: "3" },
    { key: 4, value: "4", text: "4" },
    { key: 5, value: "5", text: "5" },
    { key: 6, value: "6", text: "6" },
    { key: 7, value: "7", text: "7" },
    { key: 8, value: "8", text: "8" },
    { key: 9, value: "9", text: "9" },
    { key: 10, value: "10", text: "10" },
    { key: 11, value: "11", text: "11" },
    { key: 12, value: "12", text: "12" },
    { key: 13, value: "13", text: "13" },
    { key: 14, value: "14", text: "14" }
  ];

  const submitPlace = async e => {
    e.preventDefault();
    let response = await getCoords(e.target.place.value);
    if (!response.error) {
      if (response.data.status != "ZERO_RESULTS") {
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
    debugger
    if (response.status == 200) {
      props.setDestination(response.data.destination);
      setRedirect(true);
    } else {
      return props.setMessage("Something went wrong.");
    }
  };

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <h2>To get started...</h2>
          <Form onSubmit={submitPlace} id="place-form">
            <label>Choose your destination here! </label>
            <input name="place" type="text" id="place" placeholder="City"></input>
            <Button id="submit">Look for Destination</Button>
          </Form>
          <h5>Or pick a spot on the map!</h5>
          {props.message}
        </Grid.Column>
        <Grid.Column width={7}>
          <h3>..and how many days would you like to go for?</h3>
          <Dropdown
            placeholder="Days"
            id="days"
            clearable
            fluid
            selection
            scrolling options={number}
            onChange={(e, data) => props.setDays(data.value)}
          />
        </Grid.Column>
      </Grid>
      <div id="center-screen">
        <Button id="create-trip" onClick={onClickHandler}>
          Let's Go!
        </Button>
        <EmbedMap />
      </div>
      {redirect && <Redirect to="/activities" />}
    </>
  );
};

const mapStateToProps = state => {
  return {
    lat: state.lat,
    lng: state.lng,
    destination: state.destination,
    message: state.message,
    days: state.days
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
    setDays: days => {
      dispatch({ type: "SET_DAYS", payload: days });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Destination);
