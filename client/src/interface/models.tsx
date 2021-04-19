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

export interface TeacherReducerState {
    studentList: {
        [email: string]: Student
    }
}