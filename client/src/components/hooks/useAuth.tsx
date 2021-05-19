import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_SIGN_IN_SUCCESS, AUTH_SIGN_IN_FAIL } from "../../actions/types";
import * as api from '../../api'

interface SigninInfo{
    email:string, 
    password: string
}

export const UseAuth = (signinInfo : SigninInfo) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const authenicateUser = async(signinInfo: SigninInfo) => {
            return await api.authenicate(signinInfo)
        }
        try{
            setIsLoading(true)
            const result = authenicateUser(signinInfo)
            console.log(result)
            // if(result.data.auth){
            //     const authData = {
            //         accessToken: result.data.accessToken,
            //         email: result.data.email,
            //         userType: result.data.userType
            //     }
    
            //     dispatch({
            //         type: AUTH_SIGN_IN_SUCCESS,
            //         payload: authData
            //     })
            // } 

        } catch(error){
            setIsLoading(false)
            setError(error.message)
        }
    }, [])

    return {
        isLoading,
        response
    }
}