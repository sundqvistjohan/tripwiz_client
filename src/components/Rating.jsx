import React, { useState } from "react";
import { connect } from "react-redux";
import { Button} from "semantic-ui-react";
import { sliderChoice } from "../helpers/methods.js";
import { rateTrip } from "../modules/destination.js"


const Rating = props => {
  const [rating, setRating] = useState(null);
  const [ratingMessage, setRatingMessage] = useState(null)

  const clickHandler = async () => {
    if (props.authenticated) {
      let response = await rateTrip(props.trip, rating)
      if (response.status === 200) {
        setRatingMessage("Thank you for your rating!")
        document.getElementById("rating-div").style.visibility = "hidden";
      } else {
        setRatingMessage("Something went wrong.")
      }
    } else {
      setRatingMessage("You must login to rate a trip!")
      setTimeout(() => {
        setRatingMessage("")
      }, 2000);
    }
  }

  return (
    <>
      <h3 id="rating-h3">Rate trip to {props.destination}</h3>
      <div id="rating-div">
      <p>Scale: 1 - Poor, 5 - Excellent</p>
      <input
        type="range"
        name="rating"
        min="1"
        max="5"
        id="rating-slider"
        onChange={event => {
          sliderChoice(event);
          setRating(event.target.value);
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
      <Button id="rate-trip" onClick={clickHandler}>
        Send rating!
      </Button>
      </div>
      <h3 id="rating-message">{ratingMessage}</h3>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  destination: state.destination,
  trip: state.trip
});
const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
