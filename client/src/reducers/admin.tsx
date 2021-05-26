import { createAction, createReducer } from '@reduxjs/toolkit'
import { AdminReducerState } from '../interface/models'

export const FETCH_TEACHERS_REQUEST = createAction('FETCH_TEACHERS_REQUEST')
export const FETCH_STUDENTS_REQUEST = createAction('FETCH_STUDENTS_REQUEST')
export const FETCH_TEACHERS_SUCCESS = createAction('FETCH_TEACHERS_SUCCESS')
export const FETCH_STUDENTS_SUCCESS = createAction('FETCH_STUDENTS_SUCCESS')
export const FETCH_TEACHERS_FAILED = createAction('FETCH_TEACHERS_FAILED')
export const FETCH_STUDENTS_FAILED = createAction('FETCH_STUDENTS_FAILED')


export const adminAddTeacher = createAction('ADMIN_ADD_TEACHER')
export const adminAddStudent = createAction('ADMIN_ADD_STUDENT')
export const adminDeleteTeacher = createAction<string>('ADMIN_DELETE_TEACHER')
export const adminDeleteStudent = createAction<string>('ADMIN_DELETE_STUDENT')

type DeleteTeacherAction = ReturnType<typeof adminDeleteTeacher>
type DeleteStudentAction = ReturnType<typeof adminDeleteStudent>

const initalState: AdminReducerState = {
    loadingTeachers: false,
    loadingStudents: false, 
    errorTeachers: null,
    errorStudents: null,
    teacherList: {},
    studentList: {}
}

const adminReducer = createReducer(initalState, {
    [FETCH_TEACHERS_REQUEST.type]: (state: AdminReducerState) => {
        state.loadingTeachers = true
    },
    [FETCH_STUDENTS_REQUEST.type]: (state: AdminReducerState) => {
        state.loadingStudents = true
    },
    [FETCH_TEACHERS_SUCCESS.type]: (state: AdminReducerState, { payload }) => {
        state.teacherList = payload
        state.loadingTeachers = false
    },
    [FETCH_STUDENTS_SUCCESS.type]: (state: AdminReducerState, { payload }) => {
        state.studentList = payload
        state.loadingStudents = false
    },
    [FETCH_TEACHERS_FAILED.type]: (state: AdminReducerState, { payload }) => {
        state.errorTeachers = payload
        state.loadingTeachers = false
    },
    [FETCH_STUDENTS_FAILED.type]: (state: AdminReducerState, { payload }) => {
        state.errorStudents = payload
        state.loadingStudents = false
    },




    
    [adminAddTeacher.type]: (state: AdminReducerState, { payload }) => {
        console.log(payload)
        state.teacherList[payload.email] = payload
        console.log(state.teacherList)
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