import { createReducer } from '@reduxjs/toolkit'
import { TeacherReducerState } from '../interface/models'
import { createClassFail, createClassFailReturnType, createClassSuccess, createClassSuccessReturnType, deleteClassFail, deleteClassFailReturnType, deleteClassSuccess, deleteClassSuccessReturnType, fetchClassesFail, fetchClassesFailReturnType, fetchClassesRequest, fetchClassesSuccess } from './actionCreators'

const initalState : TeacherReducerState = {
    loading: false,
    classList: {},
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

    [createClassSuccess.type]: (state: TeacherReducerState, { payload } : createClassSuccessReturnType) => {
        state.classList[payload._id] = payload
    },
    [createClassFail.type]: (state: TeacherReducerState, { payload } : createClassFailReturnType) => {
        state.error = payload
    },
    [deleteClassSuccess.type]: (state: TeacherReducerState, { payload } : deleteClassSuccessReturnType) => {
        delete state.classList[payload]
    },
    [deleteClassFail.type]: (state: TeacherReducerState, { payload } : deleteClassFailReturnType) => {
        state.error = payload
    }
})  

export default teacherReducer