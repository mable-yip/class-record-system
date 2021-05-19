import React from "react"
import { Alert, Button, Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/admin";
import { UserType, Teacher, Student} from '../../interface/models'

interface Props { 
    list: { 
        [email: string]: Teacher | Student 
    }, 
    userType: UserType.STUDENT | UserType.TEACHER,
    isLoading: Boolean,
    error: string
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const handleDeleteUser = async(email: string, userType: string) => {
        let action = await deleteUser(email, userType)
        dispatch(action)
    }

    console.log(props.isLoading)

    return (
        props.error? 
        <Alert variant="danger">
            {props.error}
        </Alert> :
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
                    props.isLoading ? <h2> Loading...</h2> :  
                        Object.values(props.list).map((user) => 
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