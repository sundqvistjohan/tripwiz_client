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
    debugger
    return response
  } catch (error) {
    return error;
  }
};

const initializeTrip = async (props) => {
  try {
    const response = await axios({
      method: "POST",
      url: "api/**",
      params: {
        name: props.name,
        coord_lat: props.coord_lat,
        coord_lng: props.coord_lng
      }
    });
    return response
  } catch (error) {
    return error;
  }
};

export { getCoords, initializeTrip };