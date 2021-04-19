import NavbarComponent from '../common/NavBarComponent'
import { useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import { getUser } from '../../actions/common/user'
import { Link } from 'react-router-dom';
import { UserType } from '../../interface/models';


const TeacherHomePage = () => {
    return (
        <div>
            <NavbarComponent />
            <Link to="/teacher/manageStudent">
                Manage Students
            </Link>
        </div>

    )
}

export default TeacherHomePage