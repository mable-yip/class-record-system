import { createReducer } from '@reduxjs/toolkit'
import { AdminReducerState, UserType } from '../interface/models'
import { createUserFail, createUserFailReturnType, createUserSuccess, createUserSuccessReturnType, deleteUserFail, deleteUserFailReturnType, deleteUserSuccess, deleteUserSuccessReturnType, fetchStudentsFail, FetchStudentsFailReturnType, fetchStudentsRequest, fetchStudentsSuccess, FetchStudentsSuccessReturnType, fetchTeachersFail, FetchTeachersFailReturnType, fetchTeachersRequest, fetchTeachersSuccess, FetchTeachersSuccessReturnType } from './actionCreators'

const initalState: AdminReducerState = {
    loadingTeachers: false,
    loadingStudents: false, 
    errorTeachers: null,
    errorStudents: null,
    teacherList: {},
    studentList: {},
    error: null
}

const adminReducer = createReducer(initalState, {
    [fetchTeachersRequest.type]: (state: AdminReducerState) => {
        state.loadingTeachers = true
    },
    [fetchStudentsRequest.type]: (state: AdminReducerState) => {
        state.loadingStudents = true
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
    },
    [fetchStudentsSuccess.type]: (state: AdminReducerState, { payload } : FetchStudentsSuccessReturnType) => {
        const dataObj = payload.reduce((obj: any, item: { [x: string]: any }) => {
            return {
                ...obj, [item['email']]: item,
            }
            }, {})
        state.studentList = dataObj
        state.loadingStudents = false
    },
    [fetchTeachersFail.type]: (state: AdminReducerState, { payload } : FetchTeachersFailReturnType) => {
        state.errorTeachers = payload
        state.loadingTeachers = false
    },
    [fetchStudentsFail.type]: (state: AdminReducerState, { payload } : FetchStudentsFailReturnType) => {
        state.errorStudents = payload
        state.loadingStudents = false
    },
    [createUserSuccess.type]: (state: AdminReducerState, { payload } : createUserSuccessReturnType) => {
        if(payload.userType === UserType.TEACHER){
            state.teacherList[payload.email] = payload
        }

        if (payload.userType === UserType.STUDENT){
            state.studentList[payload.email] = payload
        }
    },
    [createUserFail.type]: (state: AdminReducerState, { payload } : createUserFailReturnType) => {
        state.error = payload
    },
    [deleteUserSuccess.type]: (state: AdminReducerState, { payload }: deleteUserSuccessReturnType) => {
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
})  

export default adminReducer