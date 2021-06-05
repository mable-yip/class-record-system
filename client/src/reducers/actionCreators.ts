import { createAction } from '@reduxjs/toolkit'
import { APIRequestInput, ClassModel, ClassModelPreview, SignInInfo, Student, Teacher } from '../interface/models'

// auth
export const loginRequest = createAction<APIRequestInput<SignInInfo>>('LOGIN_REQUEST')
export const loginSuccess = createAction<string>('LOGIN_SUCCESS')
export const loginFail = createAction<string>('LOGIN_FAILED')
export const logout = createAction('LOGOUT')
export type LoginSuccessReturnType = ReturnType<typeof loginSuccess>
export type LoginFailReturnType = ReturnType<typeof loginFail>

//admin
export const fetchTeachersRequest = createAction<APIRequestInput<null>>('FETCH_TEACHERS_REQUEST')
export const fetchStudentsRequest = createAction<APIRequestInput<null>>('FETCH_STUDENTS_REQUEST')
export const fetchTeachersSuccess = createAction<Teacher[]>('FETCH_TEACHERS_SUCCESS') 
export const fetchStudentsSuccess = createAction<Student[]>('FETCH_STUDENTS_SUCCESS')
export const fetchTeachersFail = createAction<string>('FETCH_TEACHERS_FAILED')
export const fetchStudentsFail = createAction<string>('FETCH_STUDENTS_FAILED')
export type FetchTeachersSuccessReturnType = ReturnType<typeof fetchTeachersSuccess>
export type FetchStudentsSuccessReturnType = ReturnType<typeof fetchStudentsSuccess>
export type FetchTeachersFailReturnType = ReturnType<typeof fetchTeachersFail>
export type FetchStudentsFailReturnType = ReturnType<typeof fetchStudentsFail>

export const createUserRequest = createAction<APIRequestInput<Teacher|Student>>('CREATE_USER_REQUEST')
export const createUserSuccess = createAction<Teacher|Student>('CREATE_USER_SUCCESS')
export const createUserFail = createAction<string>('CREATE_USER_FAIL')
export type createUserSuccessReturnType = ReturnType<typeof createUserSuccess>
export type createUserFailReturnType = ReturnType<typeof createUserFail>


export const deleteUserRequest = createAction<APIRequestInput<null>>('DELETE_USER_REQUEST')
export const deleteUserSuccess = createAction<Teacher|Student>('DELETE_USER_SUCCESS')
export const deleteUserFail = createAction<string>('DELETE_USER_FAIL')
export type deleteUserSuccessReturnType = ReturnType<typeof deleteUserSuccess>
export type deleteUserFailReturnType = ReturnType<typeof deleteUserFail>

//teacher
export const fetchClassesRequest = createAction<APIRequestInput<null>>('FETCH_CLASSES_REQUEST')
export const fetchClassesSuccess = createAction<ClassModel[]>('FETCH_CLASSES_SUCCESS')
export const fetchClassesFail = createAction<string>('FETCH_CLASSES_FAIL')
export type fetchClassesSuccessReturnType = ReturnType<typeof fetchClassesSuccess>
export type fetchClassesFailReturnType = ReturnType<typeof fetchClassesFail>

export const getClassRequest = createAction<APIRequestInput<null>>('GET_CLASS_REQUEST')
export const getClassSuccess = createAction<ClassModel>('GET_CLASS_SUCCESS')
export const getClassFail = createAction<string>('GET_CLASS_FAIL')
export type getClassSuccessReturnType = ReturnType<typeof getClassSuccess>
export type getClassFailReturnType = ReturnType<typeof getClassFail>

export const createClassRequest = createAction<APIRequestInput<ClassModelPreview>>('CREATE_CLASS_REQUEST')
export const createClassSuccess = createAction<ClassModel>('CREATE_CLASS_SUCCESS')
export const createClassFail = createAction<string>('CREATE_CLASS_FAIL')
export type createClassSuccessReturnType = ReturnType<typeof createClassSuccess>
export type createClassFailReturnType = ReturnType<typeof createClassFail>

export const updateClassRequest = createAction<APIRequestInput<ClassModelPreview>>('UPDATE_CLASS_REQUEST')
export const updateClassSuccess = createAction<ClassModel>('UPDATE_CLASS_SUCCESS')
export const updateClassFail = createAction<string>('UPDATE_CLASS_FAIL')
export type updateClassSuccessReturnType = ReturnType<typeof updateClassSuccess>
export type updateClassFailReturnType = ReturnType<typeof updateClassFail>

export const deleteClassRequest = createAction<APIRequestInput<null>>('DELETE_CLASS_REQUEST')
export const deleteClassSuccess = createAction<string>('DELETE_CLASS_SUCCESS')
export const deleteClassFail = createAction<string>('DELETE_CLASS_FAIL')
export type deleteClassSuccessReturnType = ReturnType<typeof deleteClassSuccess>
export type deleteClassFailReturnType = ReturnType<typeof deleteClassFail>


