import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ResultMap from "./ResultMap";
import { getActivities } from "../modules/destination.js";

const Result = props => {

  const setActivities = async () => {
    let response = await getActivities(props.trip);
    let activities = response.data;
    props.setActivities(activities);
  };

  useEffect(() => {
    setActivities();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Row columns={1}>
          <ResultMap />
        </Grid.Row>
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
