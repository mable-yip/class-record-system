import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../.."
import { Student } from "../../interface/models"
import { fetchStudentsRequest } from "../../reducers/actionCreators"
import "./searchStudent.css"

const SearchStudent = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<string>("")
    const [studentMatch, setStudentMatch] = useState<Student[]>([])
    const { studentList } = useSelector((state: RootState) => state.teacher)
    const studentArray: Student[] = Object.values(studentList)

    useEffect(() => {
        dispatch(fetchStudentsRequest({}))
    }, [])

    console.log(studentMatch)

    const searchStudents = (input: string) => {
        let matches = studentArray.filter((student) => {
            const regex = new RegExp(`${input}`, 'gi')
            return student.email.match(regex)
        })
        setStudentMatch(matches)
    }

    const handleAddStudent = (student: Student) => {
        console.log("student", student)
        setInput("")
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        searchStudents(event.target.value)
    }

    return(
        <div>
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
        </div>
    )
}

export default SearchStudent