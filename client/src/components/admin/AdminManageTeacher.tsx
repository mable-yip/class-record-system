import React, { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "./InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory } from "react-router-dom";
import { getAllTeachers } from "../../actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import DisplayTable from "./DisplayTable";
import { UserType } from '../../interface/models'

const AdminManageTeacher = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { teacherList } = useSelector((state: RootState) => state.admin)

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
                        <DisplayTable list={teacherList} userType={UserType.TEACHER}/>
                    </Col>
                    <Col>
                        <InputForm userType={UserType.TEACHER}/>
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