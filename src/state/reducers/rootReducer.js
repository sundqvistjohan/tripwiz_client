import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_COORDS":
      return {
        ...state,
        coords: action.payload
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
