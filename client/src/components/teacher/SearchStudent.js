import React, { useState } from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getUser } from "../../actions/common/user"
//import { teacherAddStudent } from "../../actions/teacher"



const SearchStudent = () => {
    const [ input, setInput] = useState("")
    const [ searchResult, setSearchResult ] = useState({})
    const dispatch = useDispatch()
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    const handleClick = async () => {
        const student = await dispatch(getUser(input)) // why need to put dispatch here???????????????// no need to called the getUser function in api file directly 
        if (student !== undefined){
            setSearchResult(student)
        }
        setInput("")
    }

    const displayStudent = () => {
        if (Object.keys(searchResult).length !== 0){
            return(
                <div>
                    <h5> First Name: {searchResult.firstName}</h5> 
                    <h5> Last Name: {searchResult.lastName}</h5> 
                    <h5> Email: {searchResult.email}</h5> 
                    {/* <Button onClick={()=> dispatch(teacherAddStudent(searchResult.email, email))}> Add </Button> */}
                </div>
            )
        } 
    }

    return (
        <div>
            <InputGroup>
                <FormControl
                    type="text"
                    value={input}
                    placeholder="Search by Student Email"
                    onChange={(event) => setInput(event.target.value)}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={handleClick}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
            {
                displayStudent()
            }
        </div>
    )
}

export default SearchStudent