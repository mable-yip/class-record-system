import { createReducer } from '@reduxjs/toolkit'
import { AdminInfo, AuthReducerState, StudentInfo, TeacherInfo } from '../interface/models'
import { loginFail, LoginFailReturnType, loginRequest, LoginSuccessReturnType, loginSuccess, logout} from './actionCreators'
import jwt_decode from 'jwt-decode';

const initalState : AuthReducerState = {
    loading: false,
    signIn: false
}

const authReducer = createReducer(initalState, {
    [loginRequest.type]: (state: AuthReducerState) => {
        state.loading = true
    },
    [loginSuccess.type]: (state: AuthReducerState, { payload } : LoginSuccessReturnType) => {
        const userObj: AdminInfo | StudentInfo | TeacherInfo = jwt_decode(payload)
        state.firstName = userObj?.firstName
        state.lastName = userObj?.lastName
        state.email = userObj?.email
        state.userType = userObj?.userType
        state.loading = false
        state.signIn = true
    },
    [loginFail.type]: (state: AuthReducerState, { payload } : LoginFailReturnType) => {
        state.error = payload
        state.loading = false
    },
    [logout.type]: (state: AuthReducerState) => {
        state.signIn = false
    }
})

export default authReducer;