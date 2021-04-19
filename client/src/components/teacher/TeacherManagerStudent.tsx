import React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../.."
import { UserType } from "../../interface/models"
import DisplayTable from "./DisplayTable"
import NavbarComponent from "../common/NavBarComponent"
import SearchStudent from "./SearchStudent"

const TeacherManagerStudent = () => {
    const history = useHistory()
    const { studentList } = useSelector((state: RootState) => state.teacher)
    return(
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage Student </h1>
            <Container>
                <Row>
                    <Col>
                    <DisplayTable list={studentList} userType={UserType.STUDENT}/>
                    </Col>
                    <Col>
                        <SearchStudent />
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/teacher')}>
                Back
            </Button>
        </div>
    )
}

export default TeacherManagerStudent