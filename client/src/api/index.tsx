import axios from 'axios';
import { Teacher, Student, ClassModelPreview } from '../interface/models'
const url = 'http://localhost:5000';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    const storage = localStorage.getItem('profile')

    if (storage) {
        const tokenValue = JSON.parse(storage).accessToken
        req.headers.authorization = `Bearer ${tokenValue}`;
    }
    return req;
});

interface authenicateRequest {email: string, password: string}
interface authenicateResponse {auth: boolean, accessToken: string|null, userType: string, email: string}

export const authenicate = (signinInfo: authenicateRequest) => axios.post<authenicateResponse>(`${url}/login`, signinInfo)
export const getUser = (email: string) => API.get(`/user/${email}`)
export const createUser = (user: Teacher | Student) => API.post("/admin/user", user)
export const deleteUser = (email: string) => API.delete(`/admin/user/${email}`)
export const getAllTeachers = () => API.get("/admin/allTeachers")
export const getAllStudents = () => API.get("/admin/allStudents")

export const getClassList = (email: string) => API.get(`/teacher/class/${email}`)
export const createClass = (classModel: ClassModelPreview) => API.post("/teacher/class", classModel)
export const deleteClass = (classId: string) => API.delete(`/teacher/class/${classId}`)




export const addStudentToTeacher = (teacherEmail: string, studentEmail: {studentEmail: string}) => 
    API.patch(`/teacher/${teacherEmail}/addStudent`, studentEmail)

export const removeStudentFromTeacher = (teacherEmail: string, studentEmail: {studentEmail: string}) => 
    API.patch(`/teacher/${teacherEmail}/removeStudent`, studentEmail)
