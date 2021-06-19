import React, { useEffect, useState, KeyboardEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../index"
import { Student, StudentInfo } from "../../interface/models"
import { fetchStudentsRequest } from "../../reducers/actionCreators"
import "./searchStudent.css"

interface Props { 
    handleAddStudent: (student: StudentInfo) => void
}

const SearchStudent = (props: Props) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<string>("")
    const [studentMatch, setStudentMatch] = useState<StudentInfo[]>([])
    const { studentList } = useSelector((state: RootState) => state.teacher)
    const studentArray: Student[] = Object.values(studentList)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    useEffect(() => {
        dispatch(fetchStudentsRequest({}))
    }, [dispatch])

    const searchStudents = (input: string) => {
        let matches = studentArray.filter((student) => {
            const regex = new RegExp(input, 'gi')
            return student.email.match(regex)
        })
        let result = matches.slice(0, 3) // limit the result to only 3 students
        setStudentMatch(result)
        setSelectedIndex(0)
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        searchStudents(event.target.value)
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if(event.key === 'Enter'){
            props.handleAddStudent(studentMatch[selectedIndex])
            setInput('')
            return
        }
    }

    const handleKeyDown= (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown'){
            if (selectedIndex < studentMatch.length-1){
                const currentIdx = selectedIndex
                setSelectedIndex(currentIdx+1)
                return
            }
        }
        if (event.key === 'ArrowUp'){
            if (selectedIndex > 0){
                const currentIdx = selectedIndex
                setSelectedIndex(currentIdx-1)
                return
            }
        } 
    }

    return(
        <div>
            <input
                type="text" 
                className="resizedTextbox"
                placeholder="Type student email to search student"
                value={input}
                onChange={(e) => handleSearch(e)}
                onKeyPress={(e) => handleKeyPress(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="dropDown">
            {   
                input.length !== 0 &&
                studentMatch.map((student, idx) => (
                    <div 
                        className={idx===selectedIndex?"selectedcardContainer":"cardContainer"} 
                        key={idx} 
                        onClick={() => {
                            props.handleAddStudent(student)
                            setInput('')
                        }}
                    >
                        <div>
                            <h6>Email: {student.email} </h6>
                            First Name: {student.firstName} {" "}
                            Last Name: {student.lastName}
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SearchStudent