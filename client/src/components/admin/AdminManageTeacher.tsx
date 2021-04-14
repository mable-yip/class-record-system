import React, { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "../common/InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory } from "react-router-dom";
import { getAllTeachers } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import DisplayTable from "../common/DisplayTable";

const AdminManageTeacher = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { teacherList } = useSelector((state: RootState) => state.admin)

    console.log(teacherList)

    useEffect(() => {
        dispatch(getAllTeachers())
    }, [dispatch])

    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage Teacher </h1>
            <Container>
                <Row>
                    <Col>
                        <DisplayTable list={teacherList}/>
                    </Col>
                    <Col>
                        <InputForm userType="teacher"/>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/admin')}>
                Back
            </Button>
        </div>

    )
}

export default AdminManageTeacher