import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ResultMap from "./ResultMap"
import { getActivities } from "../modules/destination.js"

const Result = props => {

  const setActivities = async () => {
    let response = await getActivities(props.trip)
    let activity_type = Object.keys(response.data)[0]
    let activities = response.data[activity_type]
    props.setActivities(activities)
  }

  useEffect(() => {
    setActivities();
  }, []);

  useEffect(() => {
  }, [props.activities]);

  return (
    <>
      <Grid>
        <Grid.Column>
          <ResultMap />
        </Grid.Column>
      </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    activities: state.activities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
