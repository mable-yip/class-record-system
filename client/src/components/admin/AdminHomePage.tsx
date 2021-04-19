import NavbarComponent from '../common/NavBarComponent'
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import { getUser } from '../../actions/common/user'
import { Link } from 'react-router-dom';
import { UserType } from '../../interface/models'

const AdminHomePage = () => {
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    // const dispatch = useDispatch()
    // const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    // useEffect(()=>{
    //     dispatch(getUser(email))
    // }, [ email, dispatch])

    return (
        <div>
            <NavbarComponent />
            <Link to={`/admin/manageUser/${UserType.TEACHER}`}>
                Manage Teachers
            </Link>
            <Link to={`/admin/manageUser/${UserType.STUDENT}`}>
                Manage Students 
            </Link>
        </div>

    )
}

export default AdminHomePage