import axios from 'axios';

const url = 'http://localhost:5000';

export const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    const storage = localStorage.getItem('profile')

    if (storage) {
        const tokenValue = JSON.parse(storage).accessToken
        req.headers.authorization = `Bearer ${tokenValue}`;
    }

    console.log("get token")
    console.log("req", req)
    return req;
});


export const StoreMiddleware = (store) => (next) => (action) => {
    console.log("storeMiddleware: action type = ", action.type)
  
    if(action.type === "LOGIN_SUCCESS"){
      localStorage.setItem('profile', JSON.stringify(action.payload))
    } else if(action.type === "LOGOUT"){
      localStorage.clear()
    }
    next(action)
  }