import * as api from '../api'

export const getUser = (email) => async() => {
    try{
        await api.getUser(email)

    } catch(error){
        alert(error.message)
    }
}

export const createUser = (user) => async(dispatch) => {
    try{
        console.log(user)
        const userType = user.userType
        const result = await api.createUser(user)

        console.log(typeof result.config.data)

        if (userType === "teacher"){
            dispatch({
                type: "ADD_TEACHER",
                playload: JSON.parse(result.config.data)
            })
        }else if (userType === "student"){
            dispatch({
                type: "ADD_STUDENT",
                playload: JSON.parse(result.config.data)
            })
        }

    } catch(error){
        alert(error.message)
    }
}

export const getAllTeachers = () => async(dispatch) => {
    try{
        const result = await api.getAllTeachers()
        dispatch({
            type: "FETCH_TEACHER",
            playload: result.data
        })

    } catch(error){
        alert(error.message)
    }
}