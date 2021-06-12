import axios, { Method } from 'axios';
import { AnyAction } from 'redux';
import { APIMethod } from '../interface/models';
import { getClassFail, getClassRequest, getClassSuccess, loginFail, loginRequest, loginSuccess, updateClassFail, updateClassRequest, updateClassSuccess } from '../reducers/actionCreators';
import { createUserFail, createUserRequest, createUserSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess, fetchStudentsFail, fetchStudentsRequest, fetchStudentsSuccess, fetchTeachersFail, fetchTeachersRequest, fetchTeachersSuccess,
createClassFail, createClassRequest, createClassSuccess, deleteClassFail, deleteClassRequest, deleteClassSuccess, fetchClassesFail, fetchClassesRequest, fetchClassesSuccess } from '../reducers/actionCreators';
import { API } from './StoreMiddleware'

const url = 'http://localhost:5000';
axios.defaults.baseURL = url

const actionMap = {
  [loginRequest.type]: [loginSuccess, loginFail],
  [fetchTeachersRequest.type]: [fetchTeachersSuccess, fetchTeachersFail],
  [fetchStudentsRequest.type]: [fetchStudentsSuccess, fetchStudentsFail],
  [createUserRequest.type]: [createUserSuccess, createUserFail],
  [deleteUserRequest.type]: [deleteUserSuccess, deleteUserFail],
  [fetchClassesRequest.type]: [fetchClassesSuccess, fetchClassesFail],
  [getClassRequest.type]: [ getClassSuccess, getClassFail],
  [createClassRequest.type]: [createClassSuccess, createClassFail],
  [updateClassRequest.type]: [updateClassSuccess, updateClassFail],
  [deleteClassRequest.type]: [deleteClassSuccess, deleteClassFail],
}

// API method, url, isTokenRequired
const apiCallMap = {
  [loginRequest.type]: [ APIMethod.POST, "login", false],
  [fetchTeachersRequest.type]: [ APIMethod.GET, "admin/allTeachers", true ], // assuming the params is at the end of the url
  [fetchStudentsRequest.type]: [ APIMethod.GET, "admin/allStudents", true ],
  [createUserRequest.type]: [ APIMethod.POST, "admin/user", true],
  [deleteUserRequest.type]: [ APIMethod.DELETE, "admin/user/", true],
  [fetchClassesRequest.type]: [ APIMethod.GET, "teacher/class", true],
  [getClassRequest.type]: [ APIMethod.GET, "teacher/class/", true],
  [createClassRequest.type]: [ APIMethod.POST, "teacher/class", true],
  [updateClassRequest.type]: [ APIMethod.PATCH, "teacher/class/", true],
  [deleteClassRequest.type]: [ APIMethod.DELETE, "teacher/class/", true],
}

export const FetchMiddleware = (store: any) => (next: any) => (action: AnyAction) => {  

    console.log("FetchMiddleware: action type = ", action.type)
    next(action)

    if (action.type.slice(-7) === "REQUEST"){
      const apiCall = apiCallMap[action.type]
      const actions = actionMap[action.type]
      const [ method, path, isTokenRequired ] = apiCall  
      const [actionSuccess, actionFail] = actions
      const url = action.payload.params? path + action.payload.params: path
  
      if (isTokenRequired){
        API.request({
          method: method as Method,
          url: url,
          data: action.payload.body
        }).then(({data}) => {
          store.dispatch(actionSuccess(data))
        })
        .catch((error) => {
          console.log("!!!", error.response.data)
          store.dispatch(actionFail(error.response.data)) // accpet string only
        })
      } else {
        console.log(action.payload.body)
        axios({
          method: method as Method,
          url: url,
          data: action.payload.body
        }).then(({data}) => {
          store.dispatch(actionSuccess(data))
        })
        .catch((error) => {
          console.log("!!!", error.response.data)
          store.dispatch(actionFail(error.response.data))
        })
      }
    }
  }
    