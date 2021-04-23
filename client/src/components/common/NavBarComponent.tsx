import { useEffect, useState } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { AUTH_SIGN_OUT } from "../../actions/types";

const NavbarComponent = () => {
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const location = useLocation()

    const [{email, userType}, setUser] = useState(JSON.parse(initalState))
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch({ type: AUTH_SIGN_OUT });
    
        history.push('/login');
        setUser(null);
    };

    useEffect(() => {
        const loaclStorage = localStorage.getItem('profile')
        const initalState = loaclStorage ? loaclStorage: ""
        setUser(JSON.parse(initalState));
      }, [ location ])
    
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                {userType.charAt(0).toUpperCase() + userType.slice(1)}: {email}
            </Navbar.Brand>

            <Navbar.Brand className="ml-auto" onClick={logout}>
                <Button className="btn-lg btn-dark">
                    Logout
                </Button>
            </Navbar.Brand>
        </Navbar>
    )
}

export default NavbarComponent



