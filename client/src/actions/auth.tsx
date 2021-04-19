import * as api from '../api'
import { AUTH_SIGN_IN } from './types'
import { UserType } from '../interface/models'
import { History } from 'history'

interface SigninInfo{
    email:string, 
    password: string
}

export const login = (signinInfo:SigninInfo, router: History<unknown>) => 
    async(dispatch: (arg0: { type: string; payload: { accessToken: string | null; email: string; userType: string } }) 
    => void) => {
    try{
        const { data } = await api.authenicate(signinInfo)

        if(data.auth){
            const authData = {
                accessToken: data.accessToken,
                email: data.email,
                userType: data.userType
            }

            dispatch({
                type: AUTH_SIGN_IN,
                payload: authData
            })

            if(data.userType === UserType.ADMIN){
                router.push('/admin')
            } else if (data.userType === UserType.STUDENT){
                router.push('/student')
            } else if (data.userType === UserType.TEACHER){
                router.push('/teacher')
            }
        } 
    } catch(error){
        alert(error.message)
    }
}

