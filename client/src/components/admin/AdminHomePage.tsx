import NavbarComponent from '../common/NavBarComponent'
import { Link } from 'react-router-dom';
import { UserType } from '../../interface/models'
import { Col, Row } from 'react-bootstrap';

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
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to={`/admin/manageUser/${UserType.TEACHER}`}>
                        <h2>Manage Teachers</h2>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to={`/admin/manageUser/${UserType.STUDENT}`}>
                        <h2>Manage Students</h2>
                    </Link>
                </Col>
            </Row>
        </div>

    )
}

export default AdminHomePage