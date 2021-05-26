import axios from 'axios';

const url = 'http://localhost:5000';
const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
    console.log("get token")
    const storage = localStorage.getItem('profile')

    if (storage) {
        const tokenValue = JSON.parse(storage).accessToken
        req.headers.authorization = `Bearer ${tokenValue}`;
    }
    return req;
});

export const FetchMiddleware = (store) => (next) => (action) => {
    if (action.type.substr(action.type.length - 7) === "REQUEST"){
      
    }
  
    console.log("FetchMiddleware: action type = ", action.type)
  
    if(action.type === "LOGIN_REQUEST"){
      axios.post(`${url}/${action.payload.path}`, action.payload.body).then((response)=>{
        console.log(response)
        store.dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data
        })
      }).catch((error)=> console.log(error.response))
    } else if (action.type === "FETCH_TEACHERS_REQUEST"){
      API.get(`${url}/${action.payload.path}`).then((response)=>{
        console.log(response.data)
        store.dispatch({
          type: "FETCH_TEACHERS_SUCCESS",
          payload: response.data
        })
      }).catch((error)=> console.log(error.response))
    }else if (action.type === "FETCH_STUDENTS_REQUEST"){
      API.get(`${url}/${action.payload.path}`).then((response)=>{
        console.log(response.data)
        store.dispatch({
          type: "FETCH_STUDENTS_SUCCESS",
          payload: response.data
        })
      }).catch((error)=> console.log(error.response))
    }
    return next(action)
  }