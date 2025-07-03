import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
});

export default api;
