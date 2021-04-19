import { createAction, createReducer } from '@reduxjs/toolkit'
import { TeacherReducerState } from '../interface/models'

// export const fetchStudent = createAction('FETCH_STUDENTS')
export const addStudent = createAction('ADD_STUDENT')
export const deleteStudent = createAction<string>('DELETE_STUDENT')

type DeleteStudentAction = ReturnType<typeof deleteStudent>

const initalState = {
    studentList: {}
}


const teacherReducer = createReducer(initalState, {
    // [fetchStudent.type]: (state: TeacherReducerState, { payload }) => {
    //     state.studentList = payload
    // },
    [addStudent.type]: (state: TeacherReducerState, { payload }) => {
        state.studentList[payload.email] = payload
    },
    [deleteStudent.type]: (state: TeacherReducerState, { payload }: DeleteStudentAction) => {
        delete state.studentList[payload]
    }
})  

export default teacherReducer