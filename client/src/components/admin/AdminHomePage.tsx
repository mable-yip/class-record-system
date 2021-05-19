import NavbarComponent from '../common/NavBarComponent'
import { UserType } from '../../interface/models'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DisplayTable from './DisplayTable';
import InputUserForm from './InputUserForm';
import { RootState } from '../..';
import { getAllStudents, getAllTeachers } from "../../actions/admin";
import  useFetchHook  from '../hooks/useFetchHook';
import * as api from '../../api'
import { ADMIN_FETCH_STUDENTS, ADMIN_FETCH_TEACHERS } from '../../actions/types';

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    console.log("teacherList", teacherList)
    console.log("studentList", studentList)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)

    const { result: allStudents , error: errorStudent, isLoading: isLoadingStudents} = useFetchHook(api.getAllStudents())
    dispatch({
        type: ADMIN_FETCH_STUDENTS,
        payload: allStudents
    })
    const { result: allTeachers, error: errorTeacher, isLoading: isLoadingTeachers } = useFetchHook(api.getAllTeachers())
    dispatch({
        type: ADMIN_FETCH_TEACHERS,
        payload: allTeachers
    })

    // useEffect(() => {
    //     const getStudentList = async() => {
    //         let getStudentAction = await getAllStudents()
    //         dispatch(getStudentAction)
    //     }
    //     const getTeacherList = async() => {
    //         let getTeacherAction = await getAllTeachers()
    //         dispatch(getTeacherAction)
    //     }
    //     getStudentList()
    //     getTeacherList()
    // }, [])

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
                        <DisplayTable list={teacherList} userType={UserType.TEACHER} isLoading={isLoadingTeachers} error={errorTeacher}/>
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
                        <DisplayTable list={studentList} userType={UserType.STUDENT} isLoading={isLoadingStudents} error={errorStudent}/>
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