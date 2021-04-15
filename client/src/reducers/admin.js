import { createAction, createReducer } from '@reduxjs/toolkit'

export const fetchTeacher = createAction('FETCH_TEACHERS')
export const fetchStudent = createAction('FETCH_STUDENTS')
export const addTeacher = createAction('ADD_TEACHER')
export const addStudent = createAction('ADD_STUDENT')
export const deleteTeacher = createAction('DELETE_TEACHER')
export const deleteStudent = createAction('DELETE_STUDENT')


const initalState = {
    teacherList: {},
    studentList: {}
}


const adminReducer = createReducer(initalState, {
    [fetchTeacher.type]: (state, {payload}) => {
        state.teacherList = payload
    },
    [fetchStudent.type]: (state, {payload}) => {
        state.studentList = payload
    },
    [addTeacher.type]: (state, {payload}) => {
        state.teacherList[payload.email] = payload
    },
    [addStudent.type]: (state, {payload}) => {
        state.studentList[payload.email] = payload
    },
    [deleteTeacher.type]: (state, {payload}) => {
        delete state.teacherList[payload]
    },
    [deleteStudent.type]: (state, {payload}) => {
        delete state.studentList[payload]
    }
})  

export default adminReducer;
  