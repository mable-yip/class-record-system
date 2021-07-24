import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from "../../reducers/actionCreators";
import jwt_decode from 'jwt-decode';
import { AdminInfo, StudentInfo, TeacherInfo } from "../../interface/models";
import "./navbar.css"
import { Button, ButtonLabel } from '../common/styledComponents';

const NavBarComponent = () => {
    const accessToken = localStorage.getItem('profile')
    const user : AdminInfo | TeacherInfo | StudentInfo | null = accessToken ? jwt_decode(accessToken) : null
    console.log(user)
    const dispatch = useDispatch()
    let history = useHistory()

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };
    
    return (
        <nav className="navbar">
            <div> 
                <h3>{user && user.userType.charAt(0).toUpperCase() + user?.userType.slice(1)}: {user?.email}</h3>
            </div>
            <div>            
                <Button 
                    bgColor="white" 
                    hoveredBgColor="black"
                    borderColor= "black"
                    hoveredLabelColor="white"
                    onClick={handleLogout}
                > 
                    <ButtonLabel
                        color="black"
                    > 
                        Logout 
                    </ButtonLabel>
                </Button>
            </div>
        </nav>
    )
}

export default NavBarComponent

