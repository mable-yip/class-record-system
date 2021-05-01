import * as api from '../api'
import { TEACHER_FETCH_CLASSES, TEACHER_ADD_CLASS, TEACHER_DELETE_CLASS } from './types'
import { ClassModelPreview } from '../interface/models'


export const getClassList = (email: string) => async (dispatch: (arg0: { type: string; payload: any }) => void) =>{
    try{
        const { data } =  await api.getClassList(email)

        dispatch({
            type: TEACHER_FETCH_CLASSES,
            payload: data
        })
    } catch(error){
        alert(error.message)
    }
}

export const createClass = (classModel: ClassModelPreview) => async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    try{
        const result = await api.createClass(classModel)

        dispatch({
            type: TEACHER_ADD_CLASS,
            payload: result.data.ops[0]
        })
    } catch (error){
        alert(error.message)
    }
}

export const deleteClass = (classId: string) => async (dispatch: (arg0: { type: string; payload: string }) => void) => {
    try{
        await api.deleteClass(classId)

        dispatch({
            type: TEACHER_DELETE_CLASS,
            payload: classId
        })
    } catch (error){
        alert(error.message)
    }
}

// export const getClassHistory = (email) => async (dispatch) => {
//     try{
//         await api.getClassHistoryByTeaacherEmail(eamil)
//     } catch(error){
//         alert(error.message)
//     }
// }