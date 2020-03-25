import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import { rateTrip, getRatingsData } from "../modules/destination.js";

const Rating = props => {
  const [rating, setRating] = useState([null, null, null, null]);
  const [ratingMessage, setRatingMessage] = useState(null);
  let [rateData, setRateData] = useState(null);
  const [toggleButton, setToggleButton] = useState([
    false,
    false,
    false,
    false
  ]);

  const clickHandler = async () => {
    if (props) {
      //props.authenticated usually here
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
      setRateData(false);
    } else {
      setRateData(response.data);
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

  useEffect(() => {
    getRatings();
  }, [props.destination]);

  return (
    <>
      <h3>Rating of {props.destination} trip</h3>
      {rateData && rateData.destination_rating && !toggleButton[0] ? (
        <>
          <div className="rating-div">
            <p>Destination rating: {rateData.destination_rating}</p>
            <Button
              className="toggle-rating"
              onClick={() => {
                setToggleButton([
                  true,
                  toggleButton[1],
                  toggleButton[2],
                  toggleButton[3]
                ]);
              }}
            >
              Edit rating
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rating-div">
            <p>Destination rating: {rateData && rateData.destination_rating}</p>
            <Dropdown
              id="dropdown1"
              placeholder="Poor - 1, Excellent - 5"
              fluid
              selection
              options={options}
              onChange={(e, data) => {
                setRating([data.value, rating[1], rating[2], rating[3]]);
              }}
            />
          </div>
        </>
      )}
      {rateData && rateData.activities_rating && !toggleButton[1] ? (
        <>
          <div className="rating-div">
            <p>Activities rating: {rateData.activities_rating}</p>
            <Button
              className="toggle-rating"
              onClick={() => {
                setToggleButton([
                  toggleButton[0],
                  true,
                  toggleButton[2],
                  toggleButton[3]
                ]);
              }}
            >
              Edit rating
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rating-div">
            <p>Activities rating: {rateData && rateData.activities_rating}</p>
            <Dropdown
              id="dropdown1"
              placeholder="Poor - 1, Excellent - 5"
              fluid
              selection
              options={options}
              onChange={(e, data) => {
                setRating([rating[0], data.value, rating[2], rating[3]]);
              }}
            />
          </div>
        </>
      )}
      <br />
      {rateData && rateData.restaurants_rating && !toggleButton[2] ? (
        <>
          <div className="rating-div">
            <p>Restaurants rating: {rateData.restaurants_rating}</p>
            <Button
              className="toggle-rating"
              onClick={() => {
                setToggleButton([
                  toggleButton[0],
                  toggleButton[1],
                  true,
                  toggleButton[3]
                ]);
              }}
            >
              Edit rating
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rating-div">
            <p>Activities rating: {rateData && rateData.restaurants_rating}</p>
            <Dropdown
              id="dropdown1"
              placeholder="Poor - 1, Excellent - 5"
              fluid
              selection
              options={options}
              onChange={(e, data) => {
                setRating([rating[0], rating[1], data.value, rating[3]]);
              }}
            />
          </div>
        </>
      )}
      {rateData && rateData.restaurants_rating && !toggleButton[2] ? (
        <>
          <div className="rating-div">
            <p>Restaurants rating: {rateData.restaurants_rating}</p>
            <Button
              className="toggle-rating"
              onClick={() => {
                setToggleButton([
                  toggleButton[0],
                  toggleButton[1],
                  true,
                  toggleButton[3]
                ]);
              }}
            >
              Edit rating
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rating-div">
            <p>Hotel rating: {rateData && rateData.hotel_rating}</p>
            <Dropdown
              id="dropdown1"
              placeholder="Poor - 1, Excellent - 5"
              fluid
              selection
              options={options}
              onChange={(e, data) => {
                setRating([rating[0], rating[1], rating[2], data.value]);
              }}
            />
          </div>
        </>
      )}
      <br />
      <Button id="rate-trip" onClick={clickHandler}>
        Send rating!
      </Button>
      <h3 id="rating-message">{ratingMessage}</h3>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  destination: state.destination,
  trip: state.trip,
  activityType: state.activityType
});
const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
