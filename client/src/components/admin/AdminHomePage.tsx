import NavbarComponent from '../common/NavBarComponent'
import { APIMethod, UserType } from '../../interface/models'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DisplayTable from './DisplayTable';
import InputUserForm from './InputUserForm';
import { RootState } from '../..';
import { fetchStudentsRequest, fetchTeachersRequest } from '../../reducers/actionCreators';

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    console.log(teacherList, studentList)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)


    useEffect(() => {
        console.log("called_dispatch")
        dispatch(fetchTeachersRequest({
            method: APIMethod.GET,
            path: "admin/allTeachers",
            body: null
        }))

        dispatch(fetchStudentsRequest({
            method: APIMethod.GET,
            path: "admin/allStudents",
            body: null
        }))
    }, [dispatch])

    return (
        <div>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage Teacher</h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShowCreateTeacher} className="btn btn-success"> Add Teacher</Button>					
                                </div>
                            </div>
                        </div>
                        <DisplayTable list={teacherList} userType={UserType.TEACHER}/>
                    </Col>
                    <Col>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage Student</h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShowCreateStudent} className="btn btn-success">Add Student</Button>					
                                </div>
                            </div>
                        </div>
                        <DisplayTable list={studentList} userType={UserType.STUDENT}/>
                    </Col>
                </Row>
            </Container>

            <Modal show={showCreateTeacher} onHide={handleCloseCreateTeacher}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Teacher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputUserForm userType={UserType.TEACHER} closeModal={handleCloseCreateTeacher}/>
                </Modal.Body>
            </Modal>

            
            <Modal show={showCreateStudent} onHide={handleCloseCreateStudent}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputUserForm userType={UserType.STUDENT} closeModal={handleCloseCreateStudent}/>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default AdminHomePage