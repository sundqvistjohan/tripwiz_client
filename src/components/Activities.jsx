import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Button } from "semantic-ui-react";
import { addActivityType } from "../modules/destination.js";

const Activities = props => {
  const [activityType, setActivityType] = useState(null);
  const [activityVisits, setActivityVisits] = useState(null);
  const [activitiesMessage, setActivitiesMessage] = useState("");
  const [activityChosen, setActivityChosen] = useState(null);

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

  const findActivities = async () => {
    if (activityType && activityVisits) {
      let response = await addActivityType(
        activityType,
        activityVisits,
        props.trip
      );
      if (response.status === 200) {
        props.gotActivities(true);
        props.setMessage("Found activities!");
        props.updateProgression(props.progression + 1);
      } else {
        setActivitiesMessage(
          "Couldn't add activity, try something more popular"
        );
      }
    } else if (!activityType) {
      setActivitiesMessage("You forgot to choose your activity");
    } else {
      setActivitiesMessage("You forgot to set how many times");
    }
  };

  const onChangeHandler = (e, data) => {
    setActivityType(data.value);
    if (data.value !== "art_gallery") {
      setActivityChosen(data.value.split("_").join(" ") + "s");
    } else {
      setActivityChosen("art galleries");
    }
    props.updateProgression(props.progression + 1);
  };

  return (
    <div className="activities">
      {props.progression === 2 && (
        <>
          <h2>Focus of trip to {props.destination}:</h2>
          <h4>Select activity below!</h4>
          <Dropdown
            placeholder="Select Activity"
            clearable
            fluid
            selection
            options={activities}
            onChange={onChangeHandler}
          />
        </>
      )}
      {props.progression === 3 && (
        <>
          <h4>How many {activityChosen} would you like to visit?</h4>
          <Dropdown
            placeholder="Number of visits?"
            fluid
            selection
            options={number}
            onChange={(e, data) => {
              setActivityVisits(data.value);
            }}
          />
          <Button id="find-activities" onClick={findActivities}>Find activities</Button>
          {activitiesMessage}
        </>
      )}
    </div>
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
    gotActivities: data => {
      dispatch({ type: "GOT_ACTIVITIES", payload: data });
    },
    updateProgression: value => {
      dispatch({ type: "UPDATE_PROGRESSION", payload: value });
    },
    setMessage: message => {
      dispatch({ type: "SET_MESSAGE", payload: message });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
