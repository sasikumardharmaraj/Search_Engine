import React from "react";
import axios from "axios";
import environment from '../appSettings/environment'
const { useState, useCallback,useMemo, useEffect } = React;
export const axiosInstance = axios.create({
  baseURL: environment.api.baseURL,
  timeout: 1000,
});

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  
  const inc = useCallback(() => setCounter(counter => counter + 1), [setCounter]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter
  
  const interceptors = useMemo(() => ({
    request: config => ((inc(), config)),
    response: response => ((dec(), response)),
    error: error => ((dec(), Promise.reject(error))),
  }), [inc, dec]); // create the interceptors
  
  useEffect(() => {
    // add request interceptors
    axiosInstance.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    axiosInstance.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      axiosInstance.interceptors.request.eject(interceptors.request);
      axiosInstance.interceptors.request.eject(interceptors.error);
      axiosInstance.interceptors.response.eject(interceptors.response);
      axiosInstance.interceptors.response.eject(interceptors.error);
    };
  }, [interceptors]);
  
  return [counter > 0];
};

/*axiosInstance.interceptors.request.use(function (config) {
    //config.headers = { ...config.headers, auth_token: getAuthToken() };
    // you can also do other modification in config
    return config;
  }, function (error) {
    return Promise.reject(error);
  });*/

/*axiosInstance.interceptors.response.use(function (response) {
    if(response.status === 401) {
        return Promise.reject(response);
    }
 -   return response;
  }, function (error) {
    return Promise.reject({errorMessage: "Service unavailable"});
  });*/
