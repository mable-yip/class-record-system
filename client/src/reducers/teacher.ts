import { createReducer } from '@reduxjs/toolkit'
import { TeacherReducerState } from '../interface/models'
import { createClassFail, createClassFailReturnType, createClassSuccess, createClassSuccessReturnType, deleteClassFail, deleteClassFailReturnType, deleteClassSuccess, deleteClassSuccessReturnType, fetchClassesFail, fetchClassesFailReturnType, fetchClassesRequest, fetchClassesSuccess, fetchStudentsFail, FetchStudentsFailReturnType, fetchStudentsSuccess, FetchStudentsSuccessReturnType, getClassFail, getClassFailReturnType, getClassSuccess, getClassSuccessReturnType, updateClassFail, updateClassFailReturnType, updateClassSuccess, updateClassSuccessReturnType } from './actionCreators'

const initalState : TeacherReducerState = {
    loading: false,
    classList: {},
    studentList: {},
    error: null
}

const teacherReducer = createReducer(initalState, {
    [fetchClassesRequest.type]: (state: TeacherReducerState) => {
        state.loading = true
    },
    [fetchClassesSuccess.type]: (state: TeacherReducerState, { payload }) => {
        //convert array to object 
        const dataObj = payload.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['_id']]: item,
            }
            }, {})
        state.classList = dataObj
        state.loading = false
    },
    [fetchClassesFail.type]: (state: TeacherReducerState, { payload } : fetchClassesFailReturnType) => {
        state.error = payload
        state.loading = false
    },
    [getClassFail.type]: (state: TeacherReducerState, { payload } : getClassFailReturnType) => {
        state.error = payload
    },
    [createClassSuccess.type]: (state: TeacherReducerState, { payload } : createClassSuccessReturnType) => {
        state.classList[payload._id] = payload
    },
    [createClassFail.type]: (state: TeacherReducerState, { payload } : createClassFailReturnType) => {
        state.error = payload
    },
    [updateClassSuccess.type]: (state: TeacherReducerState, { payload } : updateClassSuccessReturnType) => {
        state.classList[payload._id] = payload
    },
    [updateClassFail.type]: (state: TeacherReducerState, { payload } : updateClassFailReturnType) => {
        state.error = payload
    },
    [deleteClassSuccess.type]: (state: TeacherReducerState, { payload } : deleteClassSuccessReturnType) => {
        delete state.classList[payload]
    },
    [deleteClassFail.type]: (state: TeacherReducerState, { payload } : deleteClassFailReturnType) => {
        state.error = payload
    },
    [fetchStudentsSuccess.type]: (state: TeacherReducerState, { payload } : FetchStudentsSuccessReturnType) => {
        const dataObj = payload.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['email']]: item,
            }
            }, {})
        state.studentList = dataObj
    },
    [fetchStudentsFail.type]: (state: TeacherReducerState, { payload } : FetchStudentsFailReturnType) => {
        state.error = payload
    },
})  

export default teacherReducer