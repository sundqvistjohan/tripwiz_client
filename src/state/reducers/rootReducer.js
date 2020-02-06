import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LAT":
      return {
        ...state,
        lat: action.payload
      };
    case "CHANGE_LNG":
      return {
        ...state,
        lng: action.payload
      };
    case "SET_DEST":
      return {
        ...state,
        destination: action.payload
      };
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    case "SET_TRIP_ID":
      return {
        ...state,
        tripId: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
