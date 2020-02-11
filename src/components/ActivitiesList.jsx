import React from 'react'
import { connect } from "react-redux";
import { getActivities } from "../modules/destination.js";
import { Button } from "semantic-ui-react";

// response.status
// response.data.museum[0]

const ActivitiesList = props => {
  const getActivitiesData = async () => {
    let response = await getActivities(
      props.trip,
      props.activityType)
    if (response == 200) {
      
    } else {

    }
  }


  return (
    <>
      <Button onClick={getActivitiesData}>Show Activities</Button>
    </>
  )
}

const mapStateToProps = state => {
  return {
    trip: state.trip,
    activityType: state.activityType
  };
};

export default connect(
  mapStateToProps
)(ActivitiesList);
