import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://68c847ee5d8d9f514734e5f2.mockapi.io/api/v1",
  timeout: 5000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      new Error(
        error.response?.data?.message || error.message || "Something went wrong"
      )
    );
  }
);

export default apiClient;
