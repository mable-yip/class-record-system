import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../index"
import { Student, StudentInfo } from "../../interface/models"
import { fetchStudentsRequest } from "../../reducers/actionCreators"
import { Button, ButtonLabel, Table, TableData, TableHead, Tr } from "../common/styledComponents"
import "./searchStudent.css"

interface Props { 
    selectedStudents: StudentInfo[],
    submit: (studentList: StudentInfo[]) => void,
    closeModal: () => void
}

const SearchStudent = (props: Props) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<string>("")
    const [studentMatch, setStudentMatch] = useState<StudentInfo[]>([])
    const [seletcedStudents, setSelectedStduents] = useState<StudentInfo[]>(props.selectedStudents)
    const { studentList } = useSelector((state: RootState) => state.teacher)
    const studentArray: Student[] = Object.values(studentList)

    useEffect(() => {
        dispatch(fetchStudentsRequest({}))
    }, [dispatch])

    const searchStudents = (input: string) => {
        let matches = studentArray.filter((student) => {
            const regex = new RegExp(input, 'gi')
            return student.email.match(regex)
        })
        setStudentMatch(matches)
    }

    const handleAddStudent = (student: StudentInfo) => {
        console.log("student", student)
        console.log(seletcedStudents)
        if (seletcedStudents.some(selctedStudent => selctedStudent.email === student.email)){
            console.log("student is already added")
        } else{
            const newStudentList = seletcedStudents
            newStudentList.push(student)
            setSelectedStduents(newStudentList)
        }
        setInput("")
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        searchStudents(event.target.value)
    }

    const handleRemoveStudent = (email: string) => {
        console.log(email)
        const newStudentList = seletcedStudents.filter(student => student.email !== email)
        console.log("new list", newStudentList)
        setSelectedStduents(newStudentList)
    }

    const handleSubmit = () => {
        console.log(seletcedStudents)
        props.submit(seletcedStudents)
        props.closeModal()
    }

    return(
        <div className="container">
            <div className="mr-2">
                <Table>
                    <TableHead>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Action</th>
                    </TableHead>
                    <tbody>
                    {
                       seletcedStudents.map((student) => 
                            <Tr key={student.email}>
                                <TableData> {student.email} </TableData>
                                <TableData> {student.firstName} {student.lastName}</TableData>
                                <TableData> 
                                    <Button 
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        onClick={()=>handleRemoveStudent(student.email)}
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
            <div className="ml-2">
                <input
                    type="text" 
                    className="resizedTextbox"
                    placeholder="Type student email to search student"
                    value={input}
                    onChange={(e) => handleSearch(e)}
                />
                {   
                    input.length !== 0 &&
                    studentMatch.map((student, idx) => (
                        <div className="card" key={idx} onClick={() => handleAddStudent(student)}>
                            <div className="cardContainer">
                                <h6>Email: {student.email} </h6>
                                First Name: {student.firstName} {" "}
                                Last Name: {student.lastName}
                            </div>
                        </div>
                    ))
                }
                <button onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    )
}

export default SearchStudent