import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "./InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import DisplayTable from "./DisplayTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { getAllStudents } from "../../actions/admin";
import { UserType } from '../../interface/models'

const AdminManageStudent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { studentList } = useSelector((state: RootState) => state.admin)

    useEffect(() => {
        dispatch(getAllStudents())
    }, [dispatch])

    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center"> Manage Student </h1>
            <Container>
                <Row>
                    <Col>
                        <DisplayTable list={studentList} userType={UserType.STUDENT}/>
                    </Col>
                    <Col>
                        <InputForm userType={UserType.STUDENT}/>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/admin')}>
                Back
            </Button>
        </div>

    )
}

export default AdminManageStudent