import NavbarComponent from '../common/NavBarComponent'
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import { getUser } from '../../actions/user'
import { Link } from 'react-router-dom';

const AdminHomePage = () => {
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const dispatch = useDispatch()
    const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    useEffect(()=>{
        dispatch(getUser(email))
    }, [ email, dispatch])

    return (
        <div>
            <NavbarComponent />
            <Link to="/admin/manageTeacher">
                Manage Teachers
            </Link>
            <Link to="/admin/manageStudent">
                Manage Students 
            </Link>
        </div>

    )
}

export default AdminHomePage