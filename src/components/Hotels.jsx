import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { addHotels } from "../modules/destination.js";
import { sliderChoice } from "../helpers/methods.js";

const Hotels = props => {
  const [hotelBudget, setHotelBudget] = useState(null);
  const [hotelsMessage, setHotelsMessage] = useState("");

  const findHotels = async () => {
    if (hotelBudget) {
      let response = await addHotels(hotelBudget, props.trip);
      if (response.status === 200) {
        props.gotHotels(true);
        setHotelsMessage("Found Hotels!");
      } else {
        setHotelsMessage("Couldn't find any hotels");
      }
    } else {
      setHotelsMessage("Your forgot to add a budget");
    }
  };

  return (
    <>
      <h2>Details of trip:</h2>
      <h4>Hotel budget</h4>
      <input
        type="range"
        name="hotel"
        min="1"
        max="5"
        id="slider"
        onChange={event => {
          sliderChoice(event);
          setHotelBudget(event.target.value);
        }}
      ></input>
      <div className="range-values-hotel">
        <div className="scale" id="hotel1">
          <h3>✩</h3>
        </div>
        <div className="scale" id="hotel2">
          <h3>✩✩</h3>
        </div>
        <div className="scale" id="hotel3">
          <h3>✩✩✩</h3>
        </div>
        <div className="scale" id="hotel4">
          <h3>✩✩✩✩</h3>
        </div>
        <div className="scale" id="hotel5">
          <h3>✩✩✩✩✩</h3>
        </div>
      </div>
      <Button onClick={findHotels}>Check for hotels</Button>
      <p>{hotelsMessage}</p>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    gotHotels: bool => {
      dispatch({ type: "GOT_HOTELS", payload: bool });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
