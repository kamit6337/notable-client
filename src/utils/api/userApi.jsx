import axios from "axios";

export const getFromBackend = async (url, params) => {
  try {
    const getDetail = await axios.get(
      `${import.meta.env.VITE_APP_SERVER_URL}/user${url}`,
      {
        params,
        withCredentials: true,
      }
    );
    return getDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postToBackend = async (url, body) => {
  try {
    const postDetail = await axios.post(
      `${import.meta.env.VITE_APP_SERVER_URL}/user${url}`,
      body,
      {
        withCredentials: true,
      }
    );
    return postDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const patchToBackend = async (url, body) => {
  try {
    const patchDetail = await axios.patch(
      `${import.meta.env.VITE_APP_SERVER_URL}/user${url}`,
      body,
      {
        withCredentials: true,
      }
    );
    return patchDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const putToBackend = async (url, body) => {
  try {
    const putDetail = await axios.patch(
      `${import.meta.env.VITE_APP_SERVER_URL}/user${url}`,
      body,
      {
        withCredentials: true,
      }
    );
    return putDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteToBackend = async (url, params) => {
  try {
    const postDetail = await axios.delete(
      `${import.meta.env.VITE_APP_SERVER_URL}/user${url}`,
      {
        withCredentials: true,
        params, // Use params for query parameters
      }
    );
    return postDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
