import { RootState } from "../.."
import { useDispatch, useSelector } from "react-redux"
import { ClassModelPreview, CycleType, Student, StudentInfo, TeacherReducerState } from "../../interface/models"
import "./classForm.css"
import React, { useEffect, useState } from "react"
import { Button, ButtonLabel, Table, TableData, TableHead, Tr } from "../common/styledComponents"
import { Form, FormGroup, Modal } from "react-bootstrap"
import SearchStudent from "./SearchStudent"
import { useHistory, useParams } from "react-router-dom"
import { createClassRequest, getClassRequest, updateClassRequest } from "../../reducers/actionCreators"
import axios from "axios"

const url = 'http://localhost:5000';
axios.defaults.baseURL = url

interface ParamTypes {
    classId?: string
}

const ClassForm = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { classId } = useParams<ParamTypes>()
    const { email } = useSelector((state: RootState) => state.auth)

    const [showSearchStudent, setShowSearchStudent] = useState(false)
    const teacherState : TeacherReducerState = useSelector((state: RootState) => state.teacher)
    const currentClass : ClassModelPreview | undefined = teacherState.currentClass

    const newClassForm: ClassModelPreview = { 
        className:"", 
        teacherEmail: email?email:"", 
        studentsEmail: [], 
        startDate:"", 
        repeat: {
            cycle: CycleType.DAILY,
            startTime: "",
            endTime: ""
        }
    }

    // if update, get all the students model by email via API call and save here
    const [selectedStudents, setSelectedStudents] = useState<StudentInfo[]>([])
    const [form, setForm] = useState<ClassModelPreview>(currentClass ? currentClass : newClassForm)

    console.log(form)
    
    useEffect(() => {
        if (classId){
            dispatch(getClassRequest({
                params: classId
            }))
            axios({
                method: 'post',
                url: '/studentsByemails',
                data: {
                    studentemails: currentClass?.studentsEmail
                }
              }).then(({data}) => {
                setSelectedStudents(data)
              }, (error) => {
                console.log(error);
              });

            setForm(currentClass ? currentClass: newClassForm)
        }
    }, [classId, currentClass?.className])

    useEffect(() => {
        console.log("called")
        let studentsEmailArray: string[] = []
        selectedStudents.forEach(student => studentsEmailArray.push(student.email))
        setForm({...form, studentsEmail: studentsEmailArray})
    }, [JSON.stringify(selectedStudents)])


    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setForm({...form, [key]: newValue})
    }

    const handleCallback = (studentList: Student[]) => {
        console.log(studentList)
        setSelectedStudents(studentList)
    }

    const handleRemoveStudent = (email: string) => {
        console.log(email)
        const newStudentList = selectedStudents.filter(student => student.email !== email)
        console.log(newStudentList)
        setSelectedStudents(selectedStudents.filter(student => student.email !== email))
    }

    console.log(form)

    const handleSubmit = () => {
        console.log(form)
        if (classId){
            dispatch(updateClassRequest({
                body: form,
                params: classId
            }))
        } else{ // create new class
            dispatch(createClassRequest({
                body: form
            }))
        }
        history.push('/teacher')
    }
    
    return(
        <>
            <div className="createClassPage"> 
                <h1> {classId?"Update":"Create"} Class</h1>
                <div className="container mt-5">
                    <div className="mr-3">
                        <h2> Class Detail</h2>
                        <Form>
                            <FormGroup>
                                <Form.Label>Class Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Class Name" 
                                    value={form.className}
                                    onChange={handleOnChange("className")}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Form.Label>Start date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    placeholder="Start date" 
                                    value={form.startDate}
                                    onChange={handleOnChange("startDate")}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Form.Label>Start time</Form.Label>
                                <Form.Control 
                                    type="time" 
                                    placeholder="Start time" 
                                    value={form.repeat.startTime}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setForm({...form, repeat: {...form.repeat, startTime: event.target.value}})}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Form.Label>End time</Form.Label>
                                <Form.Control 
                                    type="time" 
                                    placeholder="End time" 
                                    value={form.repeat.endTime}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setForm({...form, repeat: {...form.repeat, endTime: event.target.value}})}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Form.Label>Cycle</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    value={form.repeat.cycle}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>)=> setForm({...form, repeat: {...form.repeat, cycle: event.target.value}})}
                                >
                                    <option> {CycleType.DAILY} </option>
                                    <option> {CycleType.WEEKLY} </option>
                                    <option> {CycleType.FORNIGHTLY} </option>
                                    <option> {CycleType.MONTHLY} </option>
                                </Form.Control>
                            </FormGroup>
                        </Form>
                    </div>

                    <div>
                        <div className="row">
                            <h2> Student List </h2>
                            <Button 
                                className="ml-3"
                                bgColor="#1E90FF" 
                                hoveredBgColor="#4169E1"
                                borderColor= "#1E90FF"
                                hoveredLabelColor="white"
                                onClick={() => setShowSearchStudent(true)}
                            >
                                <ButtonLabel color="white"> Add Student </ButtonLabel>
                            </Button>
                        </div>
                        <Table>
                            <TableHead>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Action</th>
                            </TableHead>
                            <tbody>
                                {
                                    selectedStudents.map(student =>
                                        <Tr key={student.email}>
                                        <TableData> {student.email} </TableData>
                                        <TableData> {student.firstName} </TableData>
                                        <TableData> {student.lastName} </TableData>
                                        <TableData> 
                                            <Button 
                                                onClick={()=>handleRemoveStudent(student.email)}
                                                bgColor="white" 
                                                hoveredBgColor="red"
                                                borderColor= "red"
                                                hoveredLabelColor="white"
                                            > 
                                                <ButtonLabel color="red"> Delete </ButtonLabel>
                                            </Button>                         
                                        </TableData>
                                    </Tr>     
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div className="container"> 
                    <Button
                        bgColor="#1E90FF" 
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={() => history.push('/teacher') }
                    >
                        <ButtonLabel color="white"> Back </ButtonLabel>
                    </Button>

                    <Button
                        bgColor="#1E90FF" 
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={handleSubmit}
                    >
                        <ButtonLabel color="white"> {classId?"Update":"Create"} </ButtonLabel>
                    </Button>
                </div>
            </div>

            <Modal size="lg" show={showSearchStudent} onHide={() => setShowSearchStudent(false)}>
                <Modal.Header closeButton>
                    <Modal.Title> Add Students to Class </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SearchStudent selectedStudents={selectedStudents} submit={handleCallback} closeModal={()=>setShowSearchStudent(false)}/>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ClassForm