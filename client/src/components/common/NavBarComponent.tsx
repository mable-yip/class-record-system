import { useEffect, useState } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "../..";
import { logout } from "../../reducers/actionCreators";

const NavbarComponent = () => {
    const loaclStorage = localStorage.getItem('profile')
    const {email, userType} = JSON.parse( loaclStorage ? loaclStorage: "")
    const dispatch = useDispatch()
    let history = useHistory()

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                {userType.charAt(0).toUpperCase() + userType.slice(1)}: {email}
            </Navbar.Brand>

            <Navbar.Brand className="ml-auto" onClick={handleLogout}>
                <Button className="btn-lg btn-dark">
                    Logout
                </Button>
            </Navbar.Brand>
        </Navbar>
    )
}

export default NavbarComponent



