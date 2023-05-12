import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export function setAuthToken(token: string | null) {
  if (token) {
    // If token is provided, set it to the Authorization header.
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

export default instance;
