import React, { useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { teacherRemoveStudent } from "../../actions/teacher";

interface Props { 
    emails: string[]
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const loaclStorage = localStorage.getItem('profile')
    const initalState = loaclStorage ? loaclStorage: ""
    const [{ email }, setAuthData] = useState(JSON.parse(initalState))

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.emails.map((studentEmail) => 
                            <tr key={studentEmail}>
                                <td> {studentEmail} </td>
                                <td> 
                                    <Button className="btn btn-outline-danger" onClick={()=>dispatch(teacherRemoveStudent(studentEmail, email))}>
                                         Delete 
                                    </Button>                             
                                </td>
                            </tr>                        
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default DisplayTable