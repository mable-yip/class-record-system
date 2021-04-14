import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "../common/InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory } from "react-router-dom";

const AdminManageStudent = () => {
    const history = useHistory()
    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage Student </h1>
            <Container>
                <Row>
                    <Col>Student List</Col>
                    <Col>
                        <InputForm userType="student"/>
                    </Col>
                </Row>
            </Container>
            <Button 
                variant="outline-dark" 
                size="lg" 
                onClick={()=>history.push('/admin')}
            >
                Back
            </Button>
        </div>

    )
}

export default AdminManageStudent