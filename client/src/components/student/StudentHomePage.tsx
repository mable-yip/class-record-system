import NavbarComponent from '../common/NavBarComponent'
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';


const StudentHomePage = () => {
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const dispatch = useDispatch()
    // const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    // useEffect(()=>{
    //     dispatch(getUser(email))
    // }, [ email, dispatch])

    return (
        <div>

        </div>

    )
}

export default StudentHomePage