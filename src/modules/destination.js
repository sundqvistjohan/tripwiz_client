import axios from "axios";

const sendDestination = async (destination) => {
  try {
    let response = await axios.post("api/**", {
      destination: destination
    });
    await response;
    return response.data;
  } catch (error) {
    return error;
  }
};

export { sendDestination };