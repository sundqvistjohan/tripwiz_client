import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { addActivityType, addHotels } from "../modules/destination.js";

const Activities = props => {
  const [activityType, setActivityType] = useState(null);
  const [actTimes, setActTimes] = useState(null);
  const [gotActivities, setGotActivities] = useState(false);
  const [activitiesMessage, setActivitiesMessage] = useState("");
  const [hotelBudget, setHotelBudget] = useState("4");

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
      document.getElementsByClassName("range-values")[0].children
    ).forEach(div => (div.style.color = "black"));
    let divId = `d${event.target.value}`;
    document.getElementById(divId).style.color = "green";
    setHotelBudget(event.target.value);
  };

  return (
    <div className="activities">
      <h1>{props.destination}</h1>
      <Grid>
        <Grid.Column width={7}>
          <h2>Focus of trip:</h2>
          <Dropdown
            placeholder="Select Activity"
            clearable
            fluid
            selection
            options={activities}
            onChange={(e, data) => setActivityType(data.value)}
          />
          <h3>Number of times:</h3>
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
        {gotActivities && (
          <Grid.Column width={7}>
            <h2>Details of trip:</h2>
            <h4>Hotel budget</h4>
            <input
              type="range"
              name="budget"
              min="1"
              max="5"
              id="slider"
              onChange={changeActive}
            ></input>
            <div className="range-values">
              <div className="dollar" id="d1">
                <h3>$</h3>
              </div>
              <div className="dollar" id="d2">
                <h3>$$</h3>
              </div>
              <div className="dollar" id="d3">
                <h3>$$$</h3>
              </div>
              <div className="dollar" id="d4">
                <h3>$$$$</h3>
              </div>
              <div className="dollar" id="d5">
                <h3>$$$$$</h3>
              </div>
            </div>
          </Grid.Column>
        )}
      </Grid>
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
