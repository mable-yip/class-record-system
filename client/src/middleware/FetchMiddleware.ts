import axios from 'axios';
import { AnyAction } from 'redux';
import { loginFail, loginRequest, loginSucess } from '../reducers/actionCreators';
import { createUserFail, createUserRequest, createUserSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess, fetchStudentsFail, fetchStudentsRequest, fetchStudentsSuccess, fetchTeachersFail, fetchTeachersRequest, fetchTeachersSuccess,
createClassFail, createClassRequest, createClassSuccess, deleteClassFail, deleteClassRequest, deleteClassSuccess, fetchClassesFail, fetchClassesRequest, fetchClassesSuccess } from '../reducers/actionCreators';
import { API } from './StoreMiddleware'

const url = 'http://localhost:5000';

const actionMap = {
  [loginRequest.type]: [loginSucess, loginFail],
  [fetchTeachersRequest.type]: [fetchTeachersSuccess, fetchTeachersFail],
  [fetchStudentsRequest.type]: [fetchStudentsSuccess, fetchStudentsFail],
  [createUserRequest.type]: [createUserSuccess, createUserFail],
  [deleteUserRequest.type]: [deleteUserSuccess, deleteUserFail],
  [fetchClassesRequest.type]: [fetchClassesSuccess, fetchClassesFail],
  [createClassRequest.type]: [createClassSuccess, createClassFail],
  [deleteClassRequest.type]: [deleteClassSuccess, deleteClassFail]
}

export const FetchMiddleware = (store: any) => (next: any) => (action: AnyAction) => {  
    console.log("FetchMiddleware: action type = ", action.type)

    next(action)  
    if(action.type === "LOGIN_REQUEST"){
      axios.post(`${url}/${action.payload.path}`, action.payload.body).then((response)=>{
        console.log(response)
        store.dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data
        })
      }).catch((error)=> {
        store.dispatch({
        type: "LOGIN_FAILED",
        payload: error.response.data
      })
    }) }


      else if (action.type.substr(action.type.length - 7) === "REQUEST"){
        console.log("action.type", action.type)
        const actions = actionMap[action.type]

        const [actionSuccess, actionFail] = actions
        const { body, path, method } = action.payload

        API.request({
          method,
          url: path,
          data: body
        }).then(({data}) => {
          const successAction = actionSuccess(data)
          console.log("successAction", successAction)
          store.dispatch(successAction)
        })
        .catch((error) => {
          console.log(error.response.data, action.type)
          store.dispatch(actionFail(error.response.data))
        })
      } 
    }