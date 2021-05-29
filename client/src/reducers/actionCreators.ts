import { createAction } from '@reduxjs/toolkit'
import { APIRequest, AuthData, ClassModel, Student, Teacher } from '../interface/models'

// auth
export const loginRequest = createAction<APIRequest>('LOGIN_REQUEST')
export const loginSucess = createAction<AuthData>('LOGIN_SUCCESS')
export const loginFail = createAction<string>('LOGIN_FAILED')
export const logout = createAction('LOGOUT')
export type LoginSuccessReturnType = ReturnType<typeof loginSucess>
export type LoginFailReturnType = ReturnType<typeof loginFail>

//admin
export const fetchTeachersRequest = createAction<APIRequest>('FETCH_TEACHERS_REQUEST')
export const fetchStudentsRequest = createAction<APIRequest>('FETCH_STUDENTS_REQUEST')
export const fetchTeachersSuccess = createAction<Teacher[]>('FETCH_TEACHERS_SUCCESS') 
export const fetchStudentsSuccess = createAction<Student[]>('FETCH_STUDENTS_SUCCESS')
export const fetchTeachersFail = createAction<string>('FETCH_TEACHERS_FAILED')
export const fetchStudentsFail = createAction<string>('FETCH_STUDENTS_FAILED')
export type FetchTeachersSuccessReturnType = ReturnType<typeof fetchTeachersSuccess>
export type FetchStudentsSuccessReturnType = ReturnType<typeof fetchStudentsSuccess>
export type FetchTeachersFailReturnType = ReturnType<typeof fetchTeachersFail>
export type FetchStudentsFailReturnType = ReturnType<typeof fetchStudentsFail>

export const createUserRequest = createAction<APIRequest>('CREATE_USER_REQUEST')
export const createUserSuccess = createAction<Teacher|Student>('CREATE_USER_SUCCESS')
export const createUserFail = createAction<string>('CREATE_USER_FAIL')
export type createUserSuccessReturnType = ReturnType<typeof createUserSuccess>
export type createUserFailReturnType = ReturnType<typeof createUserFail>


export const deleteUserRequest = createAction<APIRequest>('DELETE_USER_REQUEST')
export const deleteUserSuccess = createAction<Teacher|Student>('DELETE_USER_SUCCESS')
export const deleteUserFail = createAction<string>('DELETE_USER_FAIL')
export type deleteUserSuccessReturnType = ReturnType<typeof deleteUserSuccess>
export type deleteUserFailReturnType = ReturnType<typeof deleteUserFail>

//teacher
export const fetchClassesRequest = createAction<APIRequest>('FETCH_CLASSES_REQUEST')
export const fetchClassesSuccess = createAction<ClassModel[]>('FETCH_CLASSES_SUCCESS')
export const fetchClassesFail = createAction<string>('FETCH_CLASSES_FAIL')
export type fetchClassesSuccessReturnType = ReturnType<typeof fetchClassesSuccess>
export type fetchClassesFailReturnType = ReturnType<typeof fetchClassesFail>

export const createClassRequest = createAction<APIRequest>('CREATE_CLASS_REQUEST')
export const createClassSuccess = createAction<ClassModel>('CREATE_CLASS_SUCCESS')
export const createClassFail = createAction<string>('CREATE_CLASS_FAIL')
export type createClassSuccessReturnType = ReturnType<typeof createClassSuccess>
export type createClassFailReturnType = ReturnType<typeof createClassFail>

export const deleteClassRequest = createAction<APIRequest>('DELETE_CLASS_REQUEST')
export const deleteClassSuccess = createAction<string>('DELETE_CLASS_SUCCESS')
export const deleteClassFail = createAction<string>('DELETE_CLASS_FAIL')
export type deleteClassSuccessReturnType = ReturnType<typeof deleteClassSuccess>
export type deleteClassFailReturnType = ReturnType<typeof deleteClassFail>


