import NavbarComponent from '../common/NavBarComponent'
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


const TeacherHomePage = () => {
    return (
        <div>
            <NavbarComponent />
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to="/teacher/class">
                        <h2> Manage Class </h2>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to="/teacher/classhistory">
                        <h2> Class History  </h2>
                    </Link>
                </Col>
            </Row>
        </div>

    )
}

export default TeacherHomePage