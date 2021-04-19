import * as api from '../api'
import { ADMIN_ADD_TEACHER, ADMIN_ADD_STUDENT, ADMIN_DELETE_TEACHER, ADMIN_DELETE_STUDENT, ADMIN_FETCH_TEACHERS, ADMIN_FETCH_STUDENTS } from './types'
import { UserType, Teacher, Student } from '../interface/models'


export const createUser = (user: Teacher| Student) => async(dispatch: (arg0: { type: string; payload: any }) => void) => {
    try{
        const userType = user.userType
        const result = await api.createUser(user)

        if (userType === UserType.TEACHER){
            dispatch({
                type: ADMIN_ADD_TEACHER,
                payload: JSON.parse(result.config.data)
            })
        } else if (userType === UserType.STUDENT){
            dispatch({
                type: ADMIN_ADD_STUDENT,
                payload: JSON.parse(result.config.data)
            })
        }
    } catch(error){
        alert(error.message)
    }
}

export const deleteUser = (email: string, userType: string) => async(dispatch: (arg0: { type: string; payload: string }) => void) => {
    try{
        await api.deleteUser(email)

        if (userType === UserType.TEACHER){
            dispatch({
                type: ADMIN_DELETE_TEACHER,
                payload: email
            })
        } else if (userType === UserType.STUDENT){
            dispatch({
                type: ADMIN_DELETE_STUDENT,
                payload: email
            })
        }
    } catch (error){
        alert(error.message)
    }
}


export const getAllTeachers = () => async(dispatch: (arg0: { type: string; payload: any }) => void) => {
    try{
        const { data } = await api.getAllTeachers()

        //convert array to object 
        const dataObj = data.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['email']]: item,
            }
        }, {})

        dispatch({
            type: ADMIN_FETCH_TEACHERS,
            payload: dataObj
        })

    } catch(error){
        alert(error.message)
    }
}

export const getAllStudents = () => async(dispatch: (arg0: { type: string; payload: any }) => void) => {
    try{
        const { data } = await api.getAllStudents()

        //convert array to object 
        const dataObj = data.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['email']]: item,
            }
        }, {})

        dispatch({
            type: ADMIN_FETCH_STUDENTS,
            payload: dataObj
        })

    } catch(error){
        alert(error.message)
    }
}