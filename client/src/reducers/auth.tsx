import { createAction, createReducer } from '@reduxjs/toolkit'
import { AuthReducerState } from '../interface/models'

export const authSignIn = createAction('AUTH_SIGN_IN')
export const authSignOut = createAction('AUTH_SIGN_OUT')
export const authError = createAction('AUTH_Error')

const initalState = {
    authData: null,
    error: null
}

const authReducer = createReducer(initalState, {
    [authSignIn.type]: (state: AuthReducerState, { payload }) => {
        localStorage.setItem('profile', JSON.stringify(payload))
        state.authData = payload
    },
    [authSignOut.type]: (state: AuthReducerState) => {
        localStorage.clear()
        state = initalState
    },
    [authError.type]: (state: AuthReducerState, { payload }) => {
        state.error = payload
    }
})

export default authReducer;