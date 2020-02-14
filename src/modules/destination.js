import axios from "axios";

const getCoords = async destination => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json?",
      params: {
        address: destination,
        key: process.env.REACT_APP_GOOGLE_APIKEY
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const initializeTrip = async (props, days) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/trips",
      params: {
        days: days,
        lat: props.lat,
        lng: props.lng
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addActivityType = async (activityType, activityVisits, trip) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/activity_types",
      params: {
        trip: trip,
        activity_type: activityType,
        activity_visits: activityVisits
      }
    });
    return response;
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
    return response;
  } catch (error) {
    return error;
  }
};

const addRestaurants = async (preference, budget, trip, preference2) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/v1/activity_types",
      params: {
        trip: trip,
        keyword: preference,
        max_price: budget,
        activity_type: "restaurant"
      }
    });
    if (preference2) {
      try {
        const response = await axios({
          method: "POST",
          url: "api/v1/activity_types",
          params: {
            trip: trip,
            keyword: preference2,
            max_price: budget,
            activity_type: "restaurant",
            additional_activity: "yes"
          }
        });
        return response;
      } catch (error) {
        return error;
      }
    }
    return response;
  } catch (error) {
    return error;
  }
};

const getHotels = async trip => {
  try {
    const response = await axios({
      url: "api/v1/hotels",
      method: "GET",
      params: { trip: trip }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getRestaurants = async trip => {
  try {
    const response = await axios({
      url: "api/v1/activity_types",
      method: "GET",
      params: { trip: trip, activity_type: "restaurant" }
    });   
    return response;
  } catch (error) {
    return error;
  }
};

const chooseHotel = async (trip, hotelId) => {
  try {
    const response = await axios({
      url: "api/v1/hotels",
      method: "DELETE",
      params: {
        hotel_id: hotelId,
        trip: trip
      }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getActivities = async trip => {
  try {
    const response = await axios({
      url: "api/v1/activity_types",
      method: "GET",
      params: { trip: trip }
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getTrips = async () => {
  try {
    const response = await axios({
      url: "api/v1/trips",
      method: "GET"
    });
    return response;
  } catch (error) {
    return error;
  }
};

const objectEraser = async (component, trip, restaurant) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `api/v1/${component}`,
      params: { trip: trip, activity_type: restaurant }
    });
    return response;
  } catch (error) {
    return error;
  }
};

export {
  getCoords,
  initializeTrip,
  addActivityType,
  addHotels,
  addRestaurants,
  getHotels,
  chooseHotel,
  getActivities,
  objectEraser,
  getTrips,
  getRestaurants,
};
