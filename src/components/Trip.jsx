import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { addActivityType, addHotels } from "../modules/destination.js";

const Activities = props => {
  const [activityType, setActivityType] = useState(null);
  const [actTimes, setActTimes] = useState(null);
  const [gotActivities, setGotActivities] = useState(false);
  const [activitiesMessage, setActivitiesMessage] = useState("");
  const [hotelBudget, setHotelBudget] = useState("5");
  const [foodBudget, setFoodBudget] = useState("4");
  const [food, setFood] = useState(null);

  const activities = [
    { key: 1, value: "amusement_park", text: "Amusement Park" },
    { key: 2, value: "aquarium", text: "Aquarium" },
    { key: 3, value: "art_gallery", text: "Art Gallery" },
    { key: 4, value: "beauty_salon", text: "Beauty Salon" },
    { key: 5, value: "casino", text: "Casino" },
    { key: 6, value: "museum", text: "Museum" },
    { key: 7, value: "night_club", text: "Night Club" },
    { key: 8, value: "park", text: "Park" },
    { key: 9, value: "zoo", text: "Zoo" }
  ];

  const number = [
    { key: 1, value: "1", text: "One" },
    { key: 2, value: "2", text: "Two" },
    { key: 3, value: "3", text: "Three" }
  ];

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

  const onFindActivities = async () => {
    let response = await addActivityType(activityType, actTimes, props.trip);
    if (response.status === 200) {
      setGotActivities(true);
      setActivitiesMessage("Found activities!");
    } else {
      setActivitiesMessage("Couldn't add activity, try something more popular");
    }
  };

  const changeActive = event => {
    Array.from(
      document.getElementsByClassName(`range-values-${event.target.name}`)[0]
        .children
    ).forEach(div => (div.style.color = "black"));
    let divId = `${event.target.name}${event.target.value}`;
    if (event.target.name === "hotel") {
      document.getElementById(divId).style.color = "green";
      setHotelBudget(event.target.value);
    } else {
      document.getElementById(divId).style.color = "gold";
      setFoodBudget(event.target.value);
    }
  };

  const finalizeTrip = async () => {
    
  }



  return (
    <div className="activities">
      <h1>{props.destination}</h1>
      <Grid>
        <Grid.Column width={8}>
          <h2>Focus of trip:</h2>
          <h4>Select activity</h4>
          <Dropdown
            placeholder="Select Activity"
            clearable
            fluid
            selection
            options={activities}
            onChange={(e, data) => setActivityType(data.value)}
          />
          <h4>Number of times:</h4>
          <Dropdown
            placeholder="How many times?"
            fluid
            selection
            options={number}
            onChange={(e, data) => setActTimes(data.value)}
          />
          <Button onClick={onFindActivities}>Find activities</Button>
          {activitiesMessage}
        </Grid.Column>
        <Grid.Column width={8}>
          <h2>Details of trip:</h2>
          <h4>Hotel budget</h4>
          <input
            type="range"
            name="hotel"
            min="1"
            max="5"
            id="slider"
            onChange={changeActive}
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
          <div className="food-choice">
            <h4>What food do you prefer? </h4>
            <Dropdown
              placeholder="Mediterreanean"
              fluid
              selection
              options={cuisines}
              onChange={(e, data) => setFood(data.value)}
            />
            <h4>Food budget</h4>
            <input
              type="range"
              name="food"
              min="1"
              max="4"
              id="food-slider"
              onChange={changeActive}
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
          </div>
        </Grid.Column>
        )
      </Grid>
      <div id="center-screen">
        <Button id="create-trip" onClick={finalizeTrip}>Finalize Trip</Button>
      </div>
    </div>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
