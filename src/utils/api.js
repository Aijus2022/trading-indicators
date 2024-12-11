import axios from "axios";

/**
 * Utility function to fetch data from an API.
 * @param {string} url - The API endpoint.
 * @param {object} params - Query parameters for the request.
 * @param {string} host - The `x-rapidapi-host` value for the API provider.
 * @param {string} apiKey - Your RapidAPI key.
 * @returns {Promise<object>} - The API response data.
 */
export const fetchData = async (url, params = {}, host, apiKey) => {
  const headers = {
    "Content-Type": "application/json",
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": host,
  };

  try {
    const response = await axios.get(url, { params, headers });
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch data.");
  }
};
