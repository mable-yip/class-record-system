import { createAction, createReducer } from '@reduxjs/toolkit'
import { AuthReducerState } from '../interface/models'

export const LOGIN_SUCCESS = createAction('LOGIN_SUCCESS')
export const LOGIN_FAILED = createAction('LOGIN_FAILED')
export const LOGOUT = createAction('LOGOUT')

const initalState : AuthReducerState = {
    authData: null,
    error: null
}

const authReducer = createReducer(initalState, {
    [LOGIN_SUCCESS.type]: (state: AuthReducerState, { payload }) => {
        console.log(payload)
        state.authData = payload
    },
    [LOGIN_FAILED.type]: (state: AuthReducerState, { payload }) => {
        state.error = payload
    },
    [LOGOUT.type]: (state: AuthReducerState) => {
        state = initalState
    }
})

export default authReducer;