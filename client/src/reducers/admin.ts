import { createReducer } from '@reduxjs/toolkit'
import { AdminReducerState, UserType } from '../interface/models'
import { clearError, createUserFail, createUserFailReturnType, createUserRequest, createUserSuccess, createUserSuccessReturnType, deleteUserFail, deleteUserFailReturnType, deleteUserSuccess, deleteUserSuccessReturnType, fetchStudentsFail, FetchStudentsFailReturnType, fetchStudentsRequest, fetchStudentsSuccess, FetchStudentsSuccessReturnType, fetchTeachersFail, FetchTeachersFailReturnType, fetchTeachersRequest, fetchTeachersSuccess, FetchTeachersSuccessReturnType } from './actionCreators'

const initalState: AdminReducerState = {
    loadingTeachers: false,
    loadingStudents: false, 
    teacherList: {},
    studentList: {},
    loading: false
}

const adminReducer = createReducer(initalState, {
    [fetchTeachersRequest.type]: (state: AdminReducerState) => {
        state.loadingTeachers = true
        state.error = undefined
    },
    [fetchStudentsRequest.type]: (state: AdminReducerState) => {
        state.loadingStudents = true
        state.error = undefined
    },
    [fetchTeachersSuccess.type]: (state: AdminReducerState, { payload } : FetchTeachersSuccessReturnType) => {
        //convert array to object 
        const dataObj = payload.reduce((obj: any, item: { [x: string]: any }) => {
        return {
            ...obj, [item['email']]: item,
        }
        }, {})
        state.teacherList = dataObj
        state.loadingTeachers = false
        state.error = undefined
    },
    [fetchStudentsSuccess.type]: (state: AdminReducerState, { payload } : FetchStudentsSuccessReturnType) => {
        const dataObj = payload.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['email']]: item,
            }
            }, {})
        state.studentList = dataObj
        state.loadingStudents = false
        state.error = undefined
    },
    [fetchTeachersFail.type]: (state: AdminReducerState, { payload } : FetchTeachersFailReturnType) => {
        state.errorTeachers = payload
        state.loadingTeachers = false
    },
    [fetchStudentsFail.type]: (state: AdminReducerState, { payload } : FetchStudentsFailReturnType) => {
        state.errorStudents = payload
        state.loadingStudents = false
    },
    [createUserRequest.type]: (state: AdminReducerState) => {
        state.loading = true
    },
    [createUserSuccess.type]: (state: AdminReducerState, { payload } : createUserSuccessReturnType) => {
        state.error = undefined
        console.log("success!!!")
        if(payload.userType === UserType.TEACHER){
            state.teacherList[payload.email] = payload
        }

        if (payload.userType === UserType.STUDENT){
            state.studentList[payload.email] = payload
        }

        state.loading = false
    },
    [createUserFail.type]: (state: AdminReducerState, { payload } : createUserFailReturnType) => {
        state.error = payload
        state.loading = false
    },
    [deleteUserSuccess.type]: (state: AdminReducerState, { payload }: deleteUserSuccessReturnType) => {
        state.error = undefined
        if (payload.userType === UserType.TEACHER){
            delete state.teacherList[payload.email]
        }
        if (payload.userType === UserType.STUDENT){
            delete state.studentList[payload.email]
        }
    },
    [deleteUserFail.type]: (state: AdminReducerState, { payload } : deleteUserFailReturnType) => {
        state.error = payload
    },
    [clearError.type]: (state: AdminReducerState) => {
        state.error = undefined
    },
})  

export default adminReducer