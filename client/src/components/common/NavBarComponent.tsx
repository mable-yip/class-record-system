import { useEffect, useState } from "react";
import { Navbar, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";

const NavbarComponent = () => {
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const location = useLocation()

    const [{email, userType}, setUser] = useState(JSON.parse(initalState))
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    
        history.push('/login');
        setUser(null);
    };

    useEffect(() => {
        //const token = user?.token;
        // if (token) {
        //   const decodedToken = decode(token);
        //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        // }
        
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



