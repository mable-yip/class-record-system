import axios from 'axios';

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

export const authenicate = (signinInfo: {email: string, password: string}) => axios.post<{auth: boolean, accessToken: string|null, message: string}>(`${url}/login`, signinInfo)

export const getUser = (email: string) => API.get(`/user/${email}`)
export const createUser = (user: {email: string, password: string, firstName: string, lastName: string, userType: string}) => API.post("/user/add", user)

export const getAllTeachers = () => API.get("/admin/allTeachers")




