import * as api from '../api'

export const login = (signinInfo, router) => async(dispatch) => {
    try{
        const { data } = await api.authenicate(signinInfo)

        console.log(data)
        if(data.auth){
            const authData = {
                accessToken: data.accessToken,
                email: data.email,
                userType: data.userType
            }

            dispatch({
                type: "AUTH",
                payload: authData
            })

            if(data.userType === "admin"){
                router.push('/admin')
            } else if (data.userType === "student"){
                router.push('/student')
            } else if (data.userType === "teacher"){
                router.push('/teacher')
            }
        } 
    } catch(error){
        alert(error.message)
    }
}

