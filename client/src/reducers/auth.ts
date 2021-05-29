import { createReducer } from '@reduxjs/toolkit'
import { AuthReducerState } from '../interface/models'
import { loginFail, LoginFailReturnType, loginRequest, LoginSuccessReturnType, loginSucess, logout} from './actionCreators'

const initalState : AuthReducerState = {
    authData: null,
    error: null,
    loading: false
}

const authReducer = createReducer(initalState, {
    [loginRequest.type]: (state: AuthReducerState) => {
        state.loading = true
    },
    [loginSucess.type]: (state: AuthReducerState, { payload } : LoginSuccessReturnType) => {
        state.authData = payload
        state.loading = false
    },
    [loginFail.type]: (state: AuthReducerState, { payload } : LoginFailReturnType) => {
        state.error = payload
        state.loading = false
    },
    [logout.type]: (state: AuthReducerState) => {
        state.authData = null
    }
})

export default authReducer;