import axios from "axios";

export const fetchLocation = async (address) => {
  try {
    const response = await axios.get(
      `https://rsapi.goong.io/geocode?address=${address}&api_key=kFyHaloojteyUank9BEIBGpGcivMpq6gWoY3b0VE`
    );
    // const location = response.data.data.result[0];
    // const latitude = location?.geometry?.location?.lat;
    // const longitude = location?.geometry?.location?.lng;
    // // Update your state or props here with latitude and longitude
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error("Error fetching location: ", error);
  }
};
