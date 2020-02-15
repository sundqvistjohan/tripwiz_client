import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tab, Grid, GridColumn, Button } from "semantic-ui-react";
import ResultMap from "./ResultMap";
import {
  getActivities,
  getTrips,
  getRestaurants,
  getHotels
} from "../modules/destination.js";
import ActivitiesList from "./ActivitiesList";
import RestaurantsList from "./RestaurantsList";
import HotelsList from "./HotelsList";
import TripsList from "./TripsList";

const Result = props => {
  const panes = [
    {
      menuItem: "Map",
      render: () => (
        <Tab.Pane>
          <ResultMap />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Activities",
      render: () => (
        <Tab.Pane>
          <div className="ui stackable four column grid">
            <ActivitiesList />
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Restaurants",
      render: () => (
        <Tab.Pane>
          <div className="ui stackable four column grid">
            <RestaurantsList />
          </div>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Hotel",
      render: () => (
        <Tab.Pane>
          <HotelsList />
        </Tab.Pane>
      )
    }
  ];

  const setActivities = async () => {
    let response = await getActivities(props.trip);
    props.setActivities(response.data);
  };

  const setRestaurants = async () => {
    let response = await getRestaurants(props.trip);
    props.setRestaurants(response.data);
  };

  const getTripsData = async () => {
    let response = await getTrips();
    if (response.status === 200) {
      props.setSelectedCard(response.data[0]);
      props.setTrips(response.data);
    }
  };

  const setHotels = async () => {
    let response = await getHotels(props.trip);
    props.setHotels(response.data);
  };

  useEffect(() => {
    setActivities();
    setRestaurants();
    setHotels();
    getTripsData();
  }, [props.trip]);

  useEffect(() => {
    setActivities();
    setRestaurants();
    setHotels();
    getTripsData();
  }, []);

  let renderResult;
  if (props.trip === null) {
    renderResult = () => {
      return (
        <div id="main2" className="centered">
          Welcome back! You can find your previous trips to the left. Click the
          New Trip button to create a new trip.
        </div>
      );
    };
  } else {
    renderResult = () => {
      return (
        <div id="main2" className="centered">
          <Tab panes={panes} />
        </div>
      );
    };
  }

  debugger;
  
  return (
    <>
      <div className="trip-section">
        <h1 className="result-title">
          {props.days} days in {props.destination}
        </h1>
        <h5>Enjoy the {props.activityType}s!</h5>
        <Button>New Trip</Button>
        <Grid>
          <GridColumn width={4}>
            <TripsList />
          </GridColumn>
          <GridColumn width={12}>{renderResult}</GridColumn>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    destination: state.destination,
    trip: state.trip,
    activities: state.activities,
    days: state.days,
    activityType: state.activityType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: data => {
      dispatch({ type: "SET_ACTIVITIES", payload: data });
    },
    setRestaurants: data => {
      dispatch({ type: "SET_RESTAURANTS", payload: data });
    },
    setSelectedCard: data => {
      dispatch({ type: "SET_SELECTEDCARD", payload: data });
    },
    setTrips: data => {
      dispatch({ type: "SET_TRIPS", payload: data });
    },
    setHotels: data => {
      dispatch({ type: "SET_HOTELS", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
