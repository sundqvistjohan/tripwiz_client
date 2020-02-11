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
    case "SET_DAYS":
      return {
        ...state,
        days: action.payload
      };
    case "SET_TRIP":
      return {
        ...state,
        trip: action.payload
      };
    case "GOT_ACTIVITIES":
      return {
        ...state,
        gotActivities: action.payload
      };
    case "GOT_HOTELS":
      return {
        ...state,
        gotHotels: action.payload
      };
    case "GOT_RESTAURANTS":
      return {
        ...state,
        gotRestaurants: action.payload
      };
    case "SET_FINALIZEMESSAGE":
      return {
        ...state,
        gotRestaurants: action.payload
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
