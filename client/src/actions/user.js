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
        const userType = user.userType
        const result = await api.createUser(user)

        if (userType === "teacher"){
            dispatch({
                type: "ADD_TEACHER",
                payload: JSON.parse(result.config.data)
            })
        } else if (userType === "student"){
            dispatch({
                type: "ADD_STUDENT",
                payload: JSON.parse(result.config.data)
            })
        }
    } catch(error){
        alert(error.message)
    }
}

export const deleteUser = (email, userType) => async(dispatch) => {
    try{
        await api.deleteUser(email)

        if (userType === "teacher"){
            dispatch({
                type: "DELETE_TEACHER",
                payload: email
            })
        } else if (userType === "student"){
            dispatch({
                type: "DELETE_STUDENT",
                payload: email
            })
        }
    } catch (error){
        alert(error.message)
    }
}


export const getAllTeachers = () => async(dispatch) => {
    try{
        const { data } = await api.getAllTeachers()

        //convert array to object 
        const dataObj = data.reduce((obj, item) => {
            return {
                ...obj, [item['email']]: item,
            }
        }, {})

        dispatch({
            type: "FETCH_TEACHERS",
            payload: dataObj
        })

    } catch(error){
        alert(error.message)
    }
}

export const getAllStudents = () => async(dispatch) => {
    try{
        const { data } = await api.getAllStudents()

        //convert array to object 
        const dataObj = data.reduce((obj, item) => {
            return {
                ...obj, [item['email']]: item,
            }
        }, {})

        dispatch({
            type: "FETCH_STUDENTS",
            payload: dataObj
        })

    } catch(error){
        alert(error.message)
    }
}