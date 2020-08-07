import { axiosInstance } from './axiosInstance';

export const httpClient={
    get: get,
}

async function get(url){
 const response = await axiosInstance.get(url);
 return response;
}