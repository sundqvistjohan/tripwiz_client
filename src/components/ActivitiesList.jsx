import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getActivities } from "../modules/destination.js";

const ActivitiesList = props => {
  const [activities, setActivities] = useState(null);
  const [gotActivities, setGotActivities] = useState(false);

  const getActivitiesData = async () => {
    let response = await getActivities(props.trip);
    if (response.status === 200) {
      setActivities(response.data[props.activityType]);
      setGotActivities(true);
    }
  };
  useEffect(() => {
    getActivitiesData();
  }, []);

  let activityCard;

  if (gotActivities) {
    activityCard = activities.map(activity => {
      return (
        <>
          <div className="activity-card">
            <div id="activity-cards" key={activity.id} className="ui card">
              <div className="image">
                <img img alt="" src="https://img.guidebook-sweden.com/stockholms-kommun/gustav-iiis-antikmuseum.jpg" />
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

  return (
    <>
      <h5 id="tab-msg">Your activities</h5>
      {activityCard}
    </>
  );
};

const mapStateToProps = state => {
  return {
    trip: state.trip,
    activityType: state.activityType
  };
};

export default connect(mapStateToProps)(ActivitiesList);
