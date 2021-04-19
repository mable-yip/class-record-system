import React from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../reducers/teacher";
import { UserType, Teacher, Student} from '../../interface/models'

interface Props { 
    list: { 
        [email: string]: Student 
    }, 
    userType: UserType.STUDENT 
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.list)

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listArray.map((user) => 
                            <tr key={user.email}>
                                <td> {user.email} </td>
                                <td> {user.firstName} </td>
                                <td> {user.lastName} </td>
                                <td> 
                                    <Button className="btn btn-outline-danger" onClick={()=>dispatch(deleteStudent(user.email))}>
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