export enum UserType {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
}

export interface Admin {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.ADMIN
}

export interface Teacher {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.TEACHER
}

export interface Student {
    firstName: string 
    lastName: string
    email: string 
    password: string
    userType: UserType.STUDENT
}

export interface AdminReducerState {
    teacherList: {
        [email: string]: Teacher
    }
    studentList: {
        [email: string]: Student
    }
}

export enum CycleType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    FORNIGHTLY = 'fornughtly',
    MONTHLY = 'monthly'
}

export interface Repeat {
    cycle: string
    startTime: string,
    endTime: string
}

export interface ClassModel {
    _id: string 
    className: string 
    teacherEmail: string
    studentsEmail: string[]
    startDate: string
    repeat: Repeat
}

export type ClassModelPreview = Omit<ClassModel, "_id"> 

export interface TeacherReducerState {
    classList: {
        [classId: string]: ClassModel
    }
}

export interface AuthData {
    accessToken: string,
    email: string,
    userType: string
}

export interface AuthReducerState {
    authData: AuthData | null,
    error: string | null
}