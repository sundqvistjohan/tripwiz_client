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
        days: props.days,
        lat: props.lat,
        lng: props.lng
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

const addActivityType = async (activityType, actTimes, trip) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/activity_types",
      params: {
        trip: trip,
        activity_type: activityType,
        actTimes: actTimes
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

const addHotels = async (budget, trip) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/hotels",
      params: {
        trip: trip,
        budget: budget
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

const addRestaurants = async (preference, budget, trip) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/hotels",
      params: {
        trip: trip,
        keyword: preference,
        max_price: budget,
        activity_type: "restaurant"
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

export { getCoords, initializeTrip, addActivityType, addHotels, addRestaurants };