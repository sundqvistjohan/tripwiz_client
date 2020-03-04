import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import { addRestaurants, objectEraser } from "../modules/destination.js";
import { sliderChoice } from "../helpers/methods.js";
import { Redirect } from "react-router";

const Rating = props => {
  const [foodBudget, setFoodBudget] = useState(null);

  const rateTrip = () => {
    
  }

  return (
    <>
      <h3 id="rating-h3">Rate this trip to {props.destination}</h3>
      <p>Scale: 1 - Poor, 5 - Excellent</p>
      <input
        type="range"
        name="rating"
        min="1"
        max="5"
        id="rating-slider"
        onChange={event => {
          sliderChoice(event);
          setFoodBudget(event.target.value);
          debugger;
        }}
      ></input>
      <div className="range-values-rating">
        <div className="scale" id="rating1">
          <h3>✩</h3>
        </div>
        <div className="scale" id="rating2">
          <h3>✩✩</h3>
        </div>
        <div className="scale" id="rating3">
          <h3>✩✩✩</h3>
        </div>
        <div className="scale" id="rating4">
          <h3>✩✩✩✩</h3>
        </div>
        <div className="scale" id="rating5">
          <h3>✩✩✩✩✩</h3>
        </div>
      </div>
      <Button id="rate-trip" onClick={rateTrip}>
        Send rating!
      </Button>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  destination: state.destination
});
const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
