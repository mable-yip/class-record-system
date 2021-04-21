import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { RootState } from "../.."
import { UserType } from "../../interface/models"
import DisplayTable from "./DisplayTable"
import NavbarComponent from "../common/NavBarComponent"
import SearchStudent from "./SearchStudent"
import { getStudentList } from "../../actions/teacher"

const TeacherManagerStudent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { studentList } = useSelector((state: RootState) => state.teacher)
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    useEffect(() => {
        dispatch(getStudentList(email))
    }, [dispatch])
    
    return(
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage Student </h1>
            <Container>
                <Row>
                    <Col>
                    <DisplayTable emails={studentList}/>
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