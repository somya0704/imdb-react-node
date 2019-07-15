import axios from "axios";

// const BACKEND_URL = 'http://192.168.0.183:3000/api/v1';
const BACKEND_URL = "http://localhost:3000";

export const fetchApi = async (
  endpoint,
  payload = {},
  method = "get",
  onUploadProgress = ""
) => {
  const axiosConfig = {
    method: method.toLowerCase(),
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (axiosConfig.method === "get") {
    axiosConfig.params = payload;
  } else {
    axiosConfig.data = payload;
    axiosConfig.onUploadProgress = onUploadProgress;
  }

  return axios(`${BACKEND_URL}${endpoint}`, axiosConfig);
};
