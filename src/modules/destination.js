import axios from "axios";

const sendDestination = async (destination) => {
  try {
    let response = await axios.post("/api/v1/trips", {
      destination: destination
    });
    await response;
    return response.data;
  } catch (error) {
    return error;
  }
};

export { sendDestination };