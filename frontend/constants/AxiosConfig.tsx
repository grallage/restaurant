// import React, { useEffect } from "react";
// import { useAuth } from "constants/Hooks";
import axios from "axios";

export function useAxios() {
  const instance = axios.create({
    // baseURL: 'https://api.example.com'
  });

  instance.defaults.xsrfCookieName = "csrftoken";
  instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  instance.defaults.withCredentials = true;
  instance.defaults.headers.post["Content-Type"] = "application/json";

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `JWT ${token}`;
    }
    return req;
  });

  const setAccessToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
  };
  const setRefreshToken = (refreshToken) => {
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  return {
    axios: instance,
    setAccessToken,
    setRefreshToken,
  };
}
