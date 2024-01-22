import axios from "axios";

export const getAuthFromBackend = async (url, params) => {
  try {
    const getAuthDetail = await axios.get(
      `${import.meta.env.VITE_APP_SERVER_URL}/auth${url}`,
      {
        params,
        withCredentials: true,
      }
    );
    return getAuthDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message)
  }
};
