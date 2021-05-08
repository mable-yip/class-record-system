import React from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/admin";
import { UserType, Teacher, Student} from '../../interface/models'

interface Props { 
    list: { 
        [email: string]: Teacher | Student 
    }, 
    userType: UserType.STUDENT | UserType.TEACHER 
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.list)
    const handleDeleteUser = async(email: string, userType: string) => {
        let action = await deleteUser(email, userType)
        dispatch(action)
    }
    return (
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
                                <Button 
                                    className="btn btn-outline-danger" 
                                    onClick={() => handleDeleteUser(user.email, user.userType)}>
                                        Delete 
                                </Button>                             
                            </td>
                        </tr>                        
                    )
                }
            </tbody>
        </Table>
    )
}

export default DisplayTable