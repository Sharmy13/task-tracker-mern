import axios from "axios";

const API = axios.create({
  baseURL: "https://task-tracker-mern-mcwu.onrender.com",
});

export default API;