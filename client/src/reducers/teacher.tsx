import { createAction, createReducer } from '@reduxjs/toolkit'
import { TeacherReducerState } from '../interface/models'

export const teacherFetchStudent = createAction('TEACHER_FETCH_STUDENTS')
export const teacherAddStudent = createAction('TEACHER_ADD_STUDENT')
export const teacherDeleteStudent = createAction<string>('TEACHER_DELETE_STUDENT')

type DeleteStudentAction = ReturnType<typeof teacherDeleteStudent>

const initalState = {
    studentList: []
}


const teacherReducer = createReducer(initalState, {
    [teacherFetchStudent.type]: (state: TeacherReducerState, { payload }) => {
        console.log(payload)
        state.studentList = payload
    },
    [teacherAddStudent.type]: (state: TeacherReducerState, { payload }) => {
        state.studentList.push(payload)
    },
    [teacherDeleteStudent.type]: (state: TeacherReducerState, { payload }: DeleteStudentAction) => {
        const index = state.studentList.findIndex(email => email === payload)
        if (index !== -1) state.studentList.splice(index, 1)
    }
})  

export default teacherReducer