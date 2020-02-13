import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Button } from "semantic-ui-react";
import { addRestaurants, objectEraser } from "../modules/destination.js";
import { sliderChoice } from "../helpers/methods.js";

const Trip = props => {
  const [foodBudget, setFoodBudget] = useState(null);
  const [foodPreference, setFoodPreference] = useState("");
  const [restaurantsMessage, setRestaurantsMessage] = useState("");

  const cuisines = [
    { key: 1, value: "mediterranean", text: "Mediterranean" },
    { key: 2, value: "french", text: "French" },
    { key: 3, value: "chinese", text: "Chinese" },
    { key: 4, value: "sushi", text: "Sushi" },
    { key: 5, value: "pizza", text: "Pizza" },
    { key: 6, value: "fine dining", text: "Fine dining" },
    { key: 7, value: "indian", text: "Indian" },
    { key: 8, value: "carribean", text: "Carribean" },
    { key: 9, value: "", text: "Everything!" }
  ];

  const findRestaurants = async () => {
    if (foodBudget && foodPreference) {
      let response = await addRestaurants(
        foodPreference,
        foodBudget,
        props.trip
      );
      if (response.status === 200) {
        props.setMessage("Trip succesfully created!");
        props.updateProgression(props.progression + 1);
      } else {
        setRestaurantsMessage(
          "Couldn't find restaurants. Try some other food."
        );
        props.setFinalizeMessage(null);
      }
    } else if (foodBudget) {
      setRestaurantsMessage("Please add your preference");
    } else {
      setRestaurantsMessage("Please add your budget");
    }
  };

  return (
    <>
      {props.message} We move on to...
      <Button id="back-button-5"
        onClick={async () => {
          await objectEraser("hotels", props.trip);
          props.updateProgression(props.progression - 1);
        }}
      >
        Back one step
      </Button>
      <div className="food-choice">
        <h2>Food preference:</h2>
        <h4>What food do you prefer? </h4>
        <Dropdown
          placeholder="Everything"
          fluid
          selection
          options={cuisines}
          onChange={(e, data) => setFoodPreference(data.value)}
        />
        <div className="food-choice">
          <h4>Food budget</h4>
          <input
            type="range"
            name="food"
            min="1"
            max="4"
            id="food-slider"
            onChange={event => {
              sliderChoice(event);
              setFoodBudget(event.target.value);
            }}
          ></input>
          <div className="range-values-food">
            <div className="scale" id="food1">
              <h3>$</h3>
            </div>
            <div className="scale" id="food2">
              <h3>$$</h3>
            </div>
            <div className="scale" id="food3">
              <h3>$$$</h3>
            </div>
            <div className="scale" id="food4">
              <h3>$$$$</h3>
            </div>
          </div>
          <Button id="find-restaurants" onClick={findRestaurants}>Find Restaurants</Button>
          <br />
          {restaurantsMessage}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message,
    progression: state.progression
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    gotRestaurants: bool => {
      dispatch({ type: "GOT_RESTAURANTS", payload: bool });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
