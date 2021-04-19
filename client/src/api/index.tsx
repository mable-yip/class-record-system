import axios from 'axios';
import { Teacher, Student } from '../interface/models'
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

export const updateTeacher = (email: string, updatedteacher: Teacher) => API.patch(`/teacher/${email}`, updatedteacher)// change to student list 




