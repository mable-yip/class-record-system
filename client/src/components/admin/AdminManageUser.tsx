import React, { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import InputForm from "./InputForm"
import NavbarComponent from "../common/NavBarComponent"
import { useHistory, useParams } from "react-router-dom";
import { getAllStudents, getAllTeachers } from "../../actions/admin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import DisplayTable from "./DisplayTable";
import { UserType } from '../../interface/models'

interface ParamTypes {
    userType: UserType.STUDENT | UserType.TEACHER
}

const AdminManageUser = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { userType } = useParams<ParamTypes>()
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    useEffect(() => {
        if (userType === UserType.TEACHER){
            dispatch(getAllTeachers())
        } else if (userType === UserType.STUDENT){
            dispatch(getAllStudents())
        }
    }, [dispatch])

    return (
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage {userType} </h1>
            <Container>
                <Row>
                    <Col>
                        <DisplayTable list={userType === UserType.TEACHER?teacherList:studentList} userType={userType}/>
                    </Col>
                    <Col>
                        <InputForm userType={userType}/>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/admin')}>
                Back
            </Button>
        </div>
    )
}

export default AdminManageUser