import * as api from '../api'
import { AUTH_SIGN_IN, AUTH_SIGN_IN_ERROR } from './types'
import { UserType } from '../interface/models'
import { History } from 'history'

interface SigninInfo{
    email:string, 
    password: string
}

export const login = async(signinInfo:SigninInfo) => {
    try{
        const { data } = await api.authenicate(signinInfo)

        if(data.auth){
            const authData = {
                accessToken: data.accessToken,
                email: data.email,
                userType: data.userType
            }

            return {
                type: AUTH_SIGN_IN,
                payload: authData
            }
        } 
    } catch(error){
        return {
            type: AUTH_SIGN_IN_ERROR,
            payload: error.message
        }
    }
}

