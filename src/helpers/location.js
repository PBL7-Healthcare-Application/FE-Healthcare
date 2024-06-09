import axios from "axios";

export const fetchLocation = async (address) => {
  try {
    const response = await axios.get(
      `https://rsapi.goong.io/geocode?address=${address}&api_key=kFyHaloojteyUank9BEIBGpGcivMpq6gWoY3b0VE`
    );
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error("Error fetching location: ", error);
  }
};
