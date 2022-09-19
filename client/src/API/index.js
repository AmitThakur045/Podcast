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

export default api;
