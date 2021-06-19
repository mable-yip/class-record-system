import { UserType } from '../../interface/models'
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import InputUserForm from './InputUserForm';
import { RootState } from '../../index';
import { deleteUserRequest, fetchStudentsRequest, fetchTeachersRequest } from '../../reducers/actionCreators';
import { Button, ButtonLabel } from '../common/styledComponents';
import "./manageUser.css"
import DataTable from '../common/DataTable';

const ManagerUser = () => {
    const dispatch = useDispatch()
    const [showCreateTeacher, setShowCreateTeacher] = useState(false)
    const [showCreateStudent, setShowCreatetudent] = useState(false)
    const { teacherList, studentList } = useSelector((state: RootState) => state.admin)

    const handleShowCreateTeacher = () => setShowCreateTeacher(true)
    const handleCloseCreateTeacher = () => setShowCreateTeacher(false)

    const handleShowCreateStudent = () => setShowCreatetudent(true)
    const handleCloseCreateStudent = () => setShowCreatetudent(false)

    const handleDeleteUser = (email: string) => {
        dispatch(deleteUserRequest({
            body: null,
            params: email
        }))
    }

    useEffect(() => {
        dispatch(fetchTeachersRequest({}))
        dispatch(fetchStudentsRequest({}))
    }, [dispatch])

    const headers = ["Email", "First Name", "Last Name", "Action"]

    return (
        <div>
            <div className="container">
                <div className="mt-3 mr-3">
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
                                <ButtonLabel color="white"> 
                                    Add Teacher 
                                </ButtonLabel>
                            </Button>
                        </div>
                    </div>

                    <DataTable 
                        headers={() => headers.map(header => 
                            <th key={header}> {header} </th>)
                        }
                        body={() => Object.values(teacherList).map(teacher => 
                            <tr key={teacher.email}>
                                <td> {teacher.email} </td>
                                <td> {teacher.firstName} </td>
                                <td> {teacher.lastName} </td>
                                <td> 
                                    <Button 
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        onClick={() => handleDeleteUser(teacher.email)}
                                    > 
                                        <ButtonLabel color="red"> Delete </ButtonLabel>
                                    </Button>
                                </td>
                            </tr>)
                        }
                    />
                </div>

                <div className="mt-3 ml-3">
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
                                <ButtonLabel color="white">Add Student</ButtonLabel>
                            </Button>
                        </div>
                    </div>
                    
                    <DataTable 
                        headers={() => headers.map(header => 
                            <th key={header}> {header} </th>)
                        }
                        body={() => Object.values(studentList).map(student => 
                            <tr key={student.email}>
                                <td> {student.email} </td>
                                <td> {student.firstName} </td>
                                <td> {student.lastName} </td>
                                <td> 
                                    <Button 
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        onClick={() => handleDeleteUser(student.email)}
                                    > 
                                        <ButtonLabel color="red"> Delete </ButtonLabel>
                                    </Button>
                                </td>
                            </tr>)
                        }
                    />
                </div>
            </div>

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