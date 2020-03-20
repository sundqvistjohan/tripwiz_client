import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import { sliderChoice } from "../helpers/methods.js";
import { rateTrip, getRatingsData } from "../modules/destination.js";

const Rating = props => {
  const [rating, setRating] = useState([null, null, null, null]);
  const [ratingMessage, setRatingMessage] = useState(null);
  const [rate, setRate] = useState(null);

  const clickHandler = async () => {
    if (props.authenticated) {
      let response = await rateTrip(props.trip, rating);
      if (response.status === 200) {
        setRatingMessage("Thank you for your rating!");
      } else {
        setRatingMessage("Something went wrong.");
      }
    } else {
      setRatingMessage("You must login to rate a trip!");
      setTimeout(() => {
        setRatingMessage("");
      }, 2000);
    }
  };

  const getRatings = async () => {
    let response = await getRatingsData(props.trip);
    if (response.status === 200 && response.data === null) {
      setRate(false);
    }
  };

  const options = [
    { key: 1, text: "1", value: 1 },
    { key: 2, text: "2", value: 2 },
    { key: 3, text: "3", value: 3 },
    { key: 4, text: "4", value: 4 },
    { key: 5, text: "5", value: 5 }
  ];

  useEffect(() => {
    getRatings();
  }, []);
  debugger

  return (
    <>
      {rate ? (
        "show rating"
      ) : (
        <>
          <div className="rating-div">
            <h3 id="rating-h3">Rate trip to {props.destination}</h3>
            <p>Scale: 1 - Poor, 5 - Excellent</p>
            <div className="rating-destination">
              <p>Destination rating: x</p>
              <Dropdown
                id="dropdown1"
                text="Rating"
                fluid
                selection
                options={options}
                onChange={(e, data) => {
                  setRating([data.value, rating[1], rating[2], rating[3]])
                }}
              />
            </div>
            <div className="rating-activities">
              <p>Activity rating: x</p>
              <Dropdown
                id="dropdown1"
                text="Rating"
                fluid
                selection
                options={options}
                onChange={(e, data) => {
                  setRating([rating[0], data.value, rating[2], rating[3]])
                }}
              />
            </div>
            <div className="rating-restaurant">
              <p>Restaurants rating: x</p>
              <Dropdown
                id="dropdown1"
                text="Rating"
                fluid
                selection
                options={options}
                onChange={(e, data) => {
                  setRating([rating[0], rating[1], data.value, rating[3]])
                }}
              />
            </div>
            <div className="rating-hotel">
              <p>Hotel rating: x</p>
              <Dropdown
                id="dropdown1"
                text="Rating"
                fluid
                selection
                options={options}
                onChange={(e, data) => {
                  setRating([rating[0], rating[1], rating[2], data.value])
                }}
              />
            </div>
          </div>
          <Button id="rate-trip" onClick={clickHandler}>
            Send rating!
          </Button>
          <h3 id="rating-message">{ratingMessage}</h3>{" "}
        </>
      )}
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
