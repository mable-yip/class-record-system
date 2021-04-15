import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "../common/InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import DisplayTable from "../common/DisplayTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { getAllStudents } from "../../actions/user";

const AdminManageStudent = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { studentList } = useSelector((state: RootState) => state.admin)

    console.log("studentList", studentList)

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
                        <DisplayTable list={studentList} userType="student"/>
                    </Col>
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