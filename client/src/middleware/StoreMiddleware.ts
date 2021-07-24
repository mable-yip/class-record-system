import axios from 'axios';
import { AnyAction } from 'redux';

const url = 'http://localhost:5000';

export const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    const storage = localStorage.getItem('profile')
    if (storage) {
        req.headers.authorization = `Bearer ${storage}`;
    }

    console.log("get token")
    console.log("req", req)
    return req;
});


export const StoreMiddleware = (store: any) => (next: any) => (action: AnyAction) => {
    console.log("storeMiddleware: action type = ", action.type)
  
    if(action.type === "LOGIN_SUCCESS"){
      localStorage.setItem('profile', action.payload)
    } else if(action.type === "LOGOUT"){
      localStorage.removeItem('profile')
    }
    next(action)
  }