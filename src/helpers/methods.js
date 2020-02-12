import axios from "axios";

const sliderChoice = event => {
  Array.from(
    document.getElementsByClassName(`range-values-${event.target.name}`)[0]
      .children
  ).forEach(div => (div.style.color = "black"));
  let divId = `${event.target.name}${event.target.value}`;
  if (event.target.name === "hotel") {
    document.getElementById(divId).style.color = "gold";
  } else {
    document.getElementById(divId).style.color = "green";
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

export { sliderChoice, objectEraser };
