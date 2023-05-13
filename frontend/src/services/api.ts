import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh-token" &&
      originalRequest.url !== "/users/login"
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await instance.post("/auth/refresh-token");
          if (response.status === 200) {
            return instance(originalRequest);
          }
        } catch (error) {
          console.log("Refresh token request failed: ", error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
