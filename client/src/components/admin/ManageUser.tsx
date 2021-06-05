import { UserType } from '../../interface/models'
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DisplayTable from './DisplayTable';
import InputUserForm from './InputUserForm';
import { RootState } from '../..';
import { fetchStudentsRequest, fetchTeachersRequest, loginSuccess } from '../../reducers/actionCreators';
import { Button, ButtonLabel } from '../common/styledComponents';

const ManagerUser = () => {
    const dispatch = useDispatch()
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)


    useEffect(() => {
        dispatch(fetchTeachersRequest({}))
        dispatch(fetchStudentsRequest({}))
    }, [dispatch])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage Teacher</h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button 
                                        bgColor="green" 
                                        hoveredBgColor="darkgreen"
                                        borderColor= "green"
                                        hoveredLabelColor="white"
                                        onClick={handleShowCreateTeacher}
                                    > 
                                        <ButtonLabel
                                            color="white"
                                        > 
                                            Add Teacher 
                                        </ButtonLabel>
                                    </Button>
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
                                    <Button 
                                        bgColor="green" 
                                        hoveredBgColor="darkgreen"
                                        borderColor= "green"
                                        hoveredLabelColor="white"
                                        onClick={handleShowCreateStudent}
                                    > 
                                        <ButtonLabel
                                            color="white"
                                        > 
                                            Add Student 
                                        </ButtonLabel>
                                    </Button>

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

export default ManagerUser