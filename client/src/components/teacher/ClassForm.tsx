import { RootState } from "../.."
import { useDispatch, useSelector } from "react-redux"
import { ClassModelPreview, ClassModelWithStudentInfo, CycleType, StudentInfo, UpdatedForm } from "../../interface/models"
import './classForm.css'
import React, { useEffect, useState } from "react"
import { Button, ButtonLabel } from "../common/styledComponents"
import { Form, FormGroup } from "react-bootstrap"
import SearchStudent from "./SearchStudent"
import { useHistory, useParams } from "react-router-dom"
import { createClassRequest, updateClassRequest } from "../../reducers/actionCreators"
import axios from "axios"
import DataTable from "../common/DataTable"

const url = 'http://localhost:5000';
axios.defaults.baseURL = url

interface ParamTypes {
    classId?: string
}

const ClassForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { classId } = useParams<ParamTypes>()
    const { email } = useSelector((state: RootState) => state.auth)

    const newClassForm : ClassModelWithStudentInfo = {
        className:"",
        teacherEmail: email?email:"",
        startDate:"",
        repeat: {
            cycle: CycleType.DAILY,
            startTime: "",
            endTime: ""
        },
        studentInfo: []
    }

    const [oldClassInfo, setOldClassInfo] = useState<ClassModelWithStudentInfo>(newClassForm)
    const [classInfo, setClassInfo] = useState<ClassModelWithStudentInfo>(newClassForm)
    const [updatedForm, setUpdatedForm] = useState<UpdatedForm>({})
    const [updateMode, setUpdateMode] = useState<boolean>(classId?false:true)

    useEffect(() => {
        if(classId){
            axios({
                method: 'get',
                url: `/teacher/classes/${classId}`
              }).then(({data} : {data: ClassModelWithStudentInfo}) => {
                    console.log(data)
                    setClassInfo(data)
                    setOldClassInfo(data)
                    setUpdatedForm({repeat: data.repeat})
              })
              .catch((error) => {
                console.log(error);
              })
        }
    }, [classId])

    const handleOnChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setClassInfo({...classInfo, [key]: newValue})
        setUpdatedForm({...updatedForm, [key]: newValue})
    }

    const handleAddStudent = (student: StudentInfo) => {
        if (!classInfo.studentInfo.some(selctedStudent => selctedStudent.email === student.email)){
            setClassInfo({...classInfo, studentInfo: [...classInfo.studentInfo, student]})
            const addedStudentEmails = updatedForm.addedStudentEmail || []
            addedStudentEmails.push(student.email)
            setUpdatedForm({...updatedForm, addedStudentEmail: addedStudentEmails})
        }
    }

    const handleRemoveStudent = (email: string) => {
        const newStudentInfo = classInfo.studentInfo.filter(student => student.email !== email)
        setClassInfo({...classInfo, studentInfo: newStudentInfo})
        const deletedStudentEmails = updatedForm.deletedStudentEmail || []
        deletedStudentEmails.push(email)
        setUpdatedForm({...updatedForm, deletedStudentEmail: deletedStudentEmails})
    }

    const handleSubmit = async () => {
        if (classId){
            dispatch(updateClassRequest({
                body: updatedForm,
                params: classId
            }))
        } else{ // create new class
            const classModel : ClassModelPreview = 
            {
                teacherEmail: classInfo.teacherEmail,
                className: classInfo.className,
                startDate: classInfo.startDate,
                repeat: classInfo.repeat,
                studentsEmail: classInfo.studentInfo.map(student => student.email)
            }
            dispatch(createClassRequest({
                body: classModel
            }))
        }
        history.push('/teacher/classes')
    }

    const renderHeaders = () => {
        const headers = updateMode ?  ["Email", "First Name", "Last Name", "Actions"] : ["Email", "First Name", "Last Name"]
        return (
            headers.map(header => 
                <th key={header}> {header} </th>)
        )
    }

    return(
        <>
            <div className="buttons">
                {
                    classId && 
                    <div className="row">
                        <Button
                            bgColor="#1E90FF"
                            hoveredBgColor="#4169E1"
                            borderColor= "#1E90FF"
                            hoveredLabelColor="white"
                            onClick={() => {
                                setUpdateMode(!updateMode)
                                setClassInfo(oldClassInfo)
                            }}
                        >
                            <ButtonLabel color="white"> {updateMode?"Cancel":"Edit Class"} </ButtonLabel>
                        </Button>
                    </div>
                }
            </div>

            <div className="classFormBody mt-5">
                <div>
                    <h2> Class Detail</h2>
                    <Form>
                        <FormGroup>
                            <Form.Label>Class Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Class Name"
                                value={classInfo.className}
                                onChange={handleOnChange("className")}
                                disabled={!updateMode}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Start date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Start date"
                                value={classInfo.startDate}
                                onChange={handleOnChange("startDate")}
                                disabled={!updateMode}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Start time</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="Start time"
                                value={classInfo.repeat.startTime}
                                disabled={!updateMode}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setClassInfo({...classInfo, repeat: {...classInfo.repeat, startTime: event.target.value}})
                                        setUpdatedForm({...updatedForm, repeat: {...updatedForm.repeat, startTime: event.target.value}})
                                    }
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>End time</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder="End time"
                                value={classInfo.repeat.endTime}
                                disabled={!updateMode}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setClassInfo({...classInfo, repeat: {...classInfo.repeat, endTime: event.target.value}})
                                        setUpdatedForm({...updatedForm, repeat: {...updatedForm.repeat, endTime: event.target.value}})
                                    }
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Form.Label>Cycle</Form.Label>
                            <Form.Control
                                as="select"
                                value={classInfo.repeat.cycle}
                                disabled={!updateMode}
                                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                        setClassInfo({...classInfo, repeat: {...classInfo.repeat, cycle: event.target.value}})
                                        setUpdatedForm({...updatedForm, repeat: {...updatedForm.repeat, cycle: event.target.value}})
                                    }
                                }
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
                    <h2> Student List </h2>
                    { updateMode && <SearchStudent handleAddStudent={handleAddStudent}/> }
                    <div className="studentList">
                        <DataTable 
                            headers={renderHeaders}
                            body={() => classInfo.studentInfo.map(student => 
                                <tr key={student.email}>
                                    <td> {student.email} </td>
                                    <td> {student.firstName} </td>
                                    <td> {student.lastName} </td>
                                    {
                                        updateMode &&
                                        <td>
                                            <Button
                                                onClick={()=>handleRemoveStudent(student.email)}
                                                bgColor="white"
                                                hoveredBgColor="red"
                                                borderColor= "red"
                                                hoveredLabelColor="white"
                                            >
                                                <ButtonLabel color="red"> Delete </ButtonLabel>
                                            </Button>
                                        </td>
                                    }
                                </tr>)
                            }
                        />
                    </div>
                </div>

            </div>

            <div className="buttons">
                <div>
                    <Button
                        bgColor="#1E90FF"
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={() => history.push('/teacher/classes') }
                    >
                        <ButtonLabel color="white"> Back </ButtonLabel>
                    </Button>
                </div>

                <div>
                {
                    updateMode && 
                    <Button
                        bgColor="#1E90FF"
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={handleSubmit}
                    >
                        <ButtonLabel color="white"> {classId?"Update":"Create"} </ButtonLabel>
                    </Button>
                }
                </div>
            </div>
        </>
    )
}
export default ClassForm