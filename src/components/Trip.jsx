import React from "react";
import { connect } from "react-redux";
import { Grid, Button } from "semantic-ui-react";
import Restaurants from "./Restaurants"
import Hotels from "./Hotels"
import Activities from "./Activities"


const Trip = props => {
  const finalizeTrip = () => {
    switch (false) {
      case props.gotActivities && props.gotHotels && props.gotRestaurants:
        props.setFinalizeMessage("You must add activities, hotels and restaurants");
        break;
      case props.gotActivities:
        props.setFinalizeMessage("You must add activities");
        break;

      case props.gotHotels:
        props.setFinalizeMessage("You must add hotels");
        break;

      case props.gotRestaurants:
        props.setFinalizeMessage("You must add Restaurants");
        break;

      default:
        props.setFinalizeMessage("Creating your trip...");
    }
  };

  return (
    <>
      <Grid>
        <Grid.Column width={8}>
          <Activities />
        </Grid.Column>
        <Grid.Column width={8}>
          <Hotels />
          <Restaurants />
        </Grid.Column>
      </Grid>
      <div id="finalize-trip">
        <Button id="create-trip" onClick={finalizeTrip}>
          Finalize Trip!
        </Button>
        <br />
        {props.finalizeMessage}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    message: state.message,
    gotActivities: state.gotActivities,
    gotHotels: state.gotHotels,
    gotRestaurants: state.gotRestaurants,
    finalizeMessage: state.finalizeMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    setFinalizeMessage: message => {
      dispatch({ type: "SET_FINALIZEMESSAGE", payload: message });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
