import React, { useState } from "react";
import { connect } from "react-redux";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { addActivity } from "../modules/destination.js"

const Activities = props => {
  const [activity, setActivity] = useState(null);
  const [actTimes, setActTimes] = useState(null);

  const activities = [
    { key: 1, value: "amusement park", text: "Amusement Park" },
    { key: 2, value: "aquarium", text: "Aquarium" },
    { key: 3, value: "art gallery", text: "Art Gallery" },
    { key: 4, value: "beauty salon", text: "Beauty Salon" },
    { key: 5, value: "casino", text: "Casino" },
    { key: 6, value: "shopping", text: "Shopping" },
    { key: 7, value: "museum", text: "Museum" },
    { key: 8, value: "night club", text: "Night Club" },
    { key: 9, value: "park", text: "Park" },
    { key: 10, value: "zoo", text: "Zoo" }
  ];

  const number = [
    { key: 1, value: "1", text: "One" },
    { key: 2, value: "2", text: "Two" },
    { key: 3, value: "3", text: "Three" }
  ];

  const onNextHandler = async () => {
    const response = await addActivity(activity, actTimes);
    if (response.status == 200) {
    } else {
      return props.setMessage("Something went wrong.");
    }
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
            onChange={(e, data) => setActivity(data.value)}
          />
          <h3>Number of times:</h3>
          <Dropdown
            placeholder="How many times?"
            fluid
            selection
            options={number}
            onChange={(e, data) => setActTimes(data.value)}
          />
          <Button onClick={onNextHandler}>Next</Button>
          {props.message}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    message: set.message
  };
};

export default connect(mapStateToProps)(Activities);
