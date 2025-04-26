import axios from "axios";
import environment from "../environment";

const SERVER_URL = environment.SERVER_URL;

export const getAuthReq = async (url, params) => {
  try {
    const getAuthDetail = await axios.get(`${SERVER_URL}/auth${url}`, {
      params,
      withCredentials: true,
    });
    return getAuthDetail?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const postAuthReq = async (path, body) => {
  try {
    const post = await axios.post(`${SERVER_URL}/auth${path}`, body, {
      withCredentials: true,
    });
    return post?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const patchAuthReq = async (path, body) => {
  try {
    const patch = await axios.patch(`${SERVER_URL}/auth${path}`, body, {
      withCredentials: true,
    });
    return patch?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteAuthReq = async (path, params) => {
  try {
    const deleteReq = await axios.delete(`${SERVER_URL}/auth${path}`, {
      params,
      withCredentials: true,
    });
    return deleteReq?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
