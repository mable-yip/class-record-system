import * as api from '../api'
import { TEACHER_FETCH_STUDENTS, TEACHER_ADD_STUDENT, TEACHER_DELETE_STUDENT} from './types'


export const getStudentList = (email) => async (dispatch) =>{
    try{
        const { data } =  await api.getUser(email)
        console.log(data.studentList)

        if (data.studentList === undefined){
            dispatch({
                type: TEACHER_FETCH_STUDENTS,
                payload: []
            })
        } else {
            dispatch({
                type: TEACHER_FETCH_STUDENTS,
                payload: data.studentList
            })
        }
    } catch(error){
        alert(error.message)
    }
}

export const teacherAddStudent = (studentEmail, teacherEmail) => async (dispatch) => {
    try{
        const { status } = await api.addStudentToTeacher(teacherEmail, {studentEmail: studentEmail})
        if (status === 200){
            dispatch({
                type: TEACHER_ADD_STUDENT,
                payload: studentEmail
            })
        }
    } catch (error){
        alert(error.message)
    }
}

export const teacherRemoveStudent = (studentEmail, teacherEmail) => async (dispatch) => {
    try{
        await api.removeStudentFromTeacher(teacherEmail, {studentEmail: studentEmail})
        dispatch({
            type: TEACHER_DELETE_STUDENT,
            payload: studentEmail
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