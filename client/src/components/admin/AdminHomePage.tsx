import NavbarComponent from '../common/NavBarComponent'
import { UserType } from '../../interface/models'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DisplayTable from './DisplayTable';
import InputUserForm from './InputUserForm';
import { RootState } from '../..';
import { getAllStudents, getAllTeachers } from "../../actions/admin";

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)

    useEffect(() => {
        dispatch(getAllTeachers())
        dispatch(getAllStudents())
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
                                    <h2>Manage <b>Teacher</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShowCreateTeacher} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Teacher</span></Button>					
                                </div>
                            </div>
                        </div>
                        <DisplayTable list={teacherList} userType={UserType.TEACHER}/>
                    </Col>
                    <Col>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Student</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button onClick={handleShowCreateStudent} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Student</span></Button>					
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
                {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close Button
                        </Button>
                </Modal.Footer> */}
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
                {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close Button
                        </Button>
                </Modal.Footer> */}
            </Modal>
        </div>

    )
}

export default AdminHomePage