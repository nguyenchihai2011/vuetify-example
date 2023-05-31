import axios from "axios";

// Khởi tạo một instance của Axios
const apiClient = axios.create({
  baseURL: "http://localhost:8081/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient };
