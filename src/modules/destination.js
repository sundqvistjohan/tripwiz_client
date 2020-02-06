import axios from "axios";

const getCoords = async (destination) => {

  try {
    const response = await axios({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

const initializeTrip = async (props) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/trips",
      params: {
        lat: props.lat,
        lng: props.lng
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

const addActivity = async (activity, actTimes, tripId) => {
  try {
    const response = await axios({
      method: "PUT",
      url: "api/v1/activities",
      params: {
        tripId: tripId,
        activity: activity,
        actTimes: actTimes
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

export { getCoords, initializeTrip, addActivity };