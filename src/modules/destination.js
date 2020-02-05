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
    debugger
    const response = await axios({
      method: "POST",
      url: "api/**",
      params: {
        name: props.name,
        coord_lat: props.lat,
        coord_lng: props.lng
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

export { getCoords, initializeTrip };