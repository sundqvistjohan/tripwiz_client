import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../modules/destination.js";

const ActivitiesList = props => {
  const getActivitiesData = async () => {
    let response = await getActivities(props.trip);
    if (response.status === 200) {
      props.setActivities(response.data[props.activityType]);
    }
  };

  useEffect(() => {

  }, [props.activities]);

  let activityCard;

  if (props.activities) {
    let activityTypes = Object.keys(props.activities);
    activityCard = props.activities[activityTypes[0]].map(activity => {
      return (
        <>
          <div className="activity-card" key={activity.id}>
            <div id="activity-cards" className="ui card">
              <div className="image">
                <img
                  alt=""
                  src="https://img.guidebook-sweden.com/stockholms-kommun/gustav-iiis-antikmuseum.jpg"
                />
              </div>
              <div className="content">
                <div className="header">{activity.name}</div>
                <div>{activity.address}</div>
              </div>
              <div id="activity-desc" className="extra content">
                <div id="price-box">Rating: {activity.rating} / 5</div>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  return <>{activityCard}</>;
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
    activityType: state.activityType,
    activities: state.activities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActivities: id => {
      dispatch({ type: "SET_ACTIVITIES", payload: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);
