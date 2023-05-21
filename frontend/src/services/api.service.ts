// Import the axios library, along with two specific types from it: AxiosError and AxiosRequestConfig.
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Define a new type that extends the AxiosRequestConfig type. It has an optional property _retry.
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

// Create a new axios instance. This instance has some default configuration:
// it will send requests to "http://localhost:3000/api", and it will include credentials (like cookies) with its requests.
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Add an interceptor to the axios instance. Interceptors allow you to transform the request or the response in some way.
instance.interceptors.response.use(
  // This function will be called when a response is received. It doesn't change the response in any way; it just returns it as-is.
  (response) => response,
  // This function will be called when an error occurs. It has a chance to recover from certain types of errors.
  async (error: AxiosError) => {
    // The error object includes the original request configuration. We'll use this to possibly retry the request.
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    // If the error is a 401 Unauthorized error, and the request was not to the refresh-token or login endpoints,
    // then we will try to get a new access token and retry the request.
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh-token" &&
      originalRequest.url !== "/auth/re" &&
      originalRequest.url !== "/users/login"
    ) {
      // We only want to retry once, so we use the _retry property to keep track of whether we've already retried this request.
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          console.log("Trying to refresh token via axios interceptor!");

          // Attempt to refresh the access token.
          const response = await instance.post("/auth/refresh-token");

          // If the refresh was successful, retry the original request.
          if (response.status === 200) {
            return instance(originalRequest);
          }
        } catch (error) {
          // If the refresh failed, log the error and give up.
          console.log("Refresh token request failed: ", error);
        }
      }
    }

    // If the error was not a recoverable error, just reject the Promise with the original error.
    // This will cause the Promise returned by the axios request to be rejected.
    return Promise.reject(error);
  }
);

// Export the configured axios instance so it can be used elsewhere in the application.
export default instance;
