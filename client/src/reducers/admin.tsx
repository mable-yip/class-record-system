import { createAction, createReducer } from '@reduxjs/toolkit'
import { AdminReducerState } from '../interface/models'

export const adminFetchTeachers = createAction('ADMIN_FETCH_TEACHERS')
export const adminFetchStudents = createAction('ADMIN_FETCH_STUDENTS')
export const adminAddTeacher = createAction('ADMIN_ADD_TEACHER')
export const adminAddStudent = createAction('ADMIN_ADD_STUDENT')
export const adminDeleteTeacher = createAction<string>('ADMIN_DELETE_TEACHER')
export const adminDeleteStudent = createAction<string>('ADMIN_DELETE_STUDENT')

type DeleteTeacherAction = ReturnType<typeof adminDeleteTeacher>
type DeleteStudentAction = ReturnType<typeof adminDeleteStudent>

const initalState = {
    teacherList: {},
    studentList: {}
}

const adminReducer = createReducer(initalState, {
    [adminFetchTeachers.type]: (state: AdminReducerState, { payload }) => {
        state.teacherList = payload
    },
    [adminFetchStudents.type]: (state: AdminReducerState, { payload }) => {
        state.studentList = payload
    },
    [adminAddTeacher.type]: (state: AdminReducerState, { payload }) => {
        state.teacherList[payload.email] = payload
    },
    [adminAddStudent.type]: (state: AdminReducerState, { payload }) => {
        state.studentList[payload.email] = payload
    },
    [adminDeleteTeacher.type]: (state: AdminReducerState, { payload }: DeleteTeacherAction) => {
        delete state.teacherList[payload]
    },
    [adminDeleteStudent.type]: (state: AdminReducerState, { payload }: DeleteStudentAction) => {
        delete state.studentList[payload]
    }
})  

export default adminReducer
  