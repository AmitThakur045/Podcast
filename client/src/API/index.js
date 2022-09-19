import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // to send request which contains cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// End Points
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");

// interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    // original request which get triggered by user from frontend
    const originalRequest = error.config;

    // if status code is 401 (token expired) then we
    // will refresh the token and again perform the previous task
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        // refresh the token
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true, // sending the cookies
          }
        );

        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default api;
