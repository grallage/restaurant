// import React, { useEffect } from "react";
// import { useAuth } from "constants/Hooks";
import axios from "axios";

export function useAxios() {
  // const { session } = useAuth();
  // useEffect(() => {
  //   console.log("初始化axios");
  //   if (!session) {
  //     return;
  //   }
  // // 更新token
  //   console.log(session);
  // }, [session]);

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
      // req.headers.Authorization = `Token ${token}`;
      req.headers.Authorization = `JWT ${token}`;
      // req.headers.Authorization = `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI2ODgwMzEwLCJqdGkiOiJiMmEzOTJmOTBiYmE0YzY0YmMxMzA3MmYwZTA3NzZkYiIsInVzZXJfaWQiOiI3ODQzYTkyNy1mZDFhLTRmMmEtYTQzMC1iZTRjYjUxYmRiMDAifQ.ll9re1sm0w90R_ylMNUenCUQlELnT2UTwuh72GZzLuw`;
      // req.headers.Authorization = `Basic ${token}`;
      // req.headers["Authorization"] = "Basic " + token;
    }
    return req;
  });

  const setAccessToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
  };

  return {
    axios: instance,
    setAccessToken,
  };
}
