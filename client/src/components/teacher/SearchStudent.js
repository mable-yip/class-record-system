import React, { useState } from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getUser } from "../../actions/common/user"
import { addStudent } from "../../reducers/teacher"

const SearchStudent = () => {
    const [ input, setInput] = useState("")
    const [ searchResult, setSearchResult ] = useState({})
    const dispatch = useDispatch()

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
                    <Button onClick={()=> dispatch(addStudent(searchResult))}> Add </Button>
                </div>
            )
        } 
    }

    const handleSubmit = () => {
        setSearchResult({})
    }

    return (
        <div>
            <h3>Search Student Page </h3>

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