import { createAction, createReducer } from '@reduxjs/toolkit'
import { TeacherReducerState } from '../interface/models'

export const teacherFetchClasses = createAction('TEACHER_FETCH_CLASSES')
export const teacherAddClass = createAction('TEACHER_ADD_CLASS')
export const teacherDeleteClass = createAction('TEACHER_DELETE_CLASS')


const initalState = {
    classList: {}
}


const teacherReducer = createReducer(initalState, {
    [teacherFetchClasses.type]: (state: TeacherReducerState, { payload }) => {
        state.classList = payload
    },
    [teacherAddClass.type]: (state: TeacherReducerState, { payload }) => {
        state.classList[payload._id] = payload
    },
    [teacherDeleteClass.type]: (state: TeacherReducerState, { payload }) => {
        console.log("payload", payload)
        delete state.classList[payload]
    }
})  

export default teacherReducer