
import axios from "axios";

console.log(`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`)

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default api;
