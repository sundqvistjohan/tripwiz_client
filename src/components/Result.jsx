import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import ResultMap from "./ResultMap";
import { getActivities } from "../modules/destination.js";
import ActivitiesList from "./ActivitiesList";
import HotelsList from "./HotelsList";

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
          Add restaurant info
        </Tab.Pane>
      )
    },
    { menuItem: "Hotel", 
    render: () => (
      <Tab.Pane>
        <HotelsList />
      </Tab.Pane>)}
  ];

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
      <Tab panes={panes} />
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
