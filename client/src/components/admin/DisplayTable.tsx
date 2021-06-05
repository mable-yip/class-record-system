import React from "react"
import { Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { UserType, Teacher, Student, APIMethod} from '../../interface/models'
import { deleteUserRequest } from "../../reducers/actionCreators";
import { Button, ButtonLabel } from "../common/styledComponents";

interface Props { 
    list: { 
        [email: string]: Teacher | Student 
    }, 
    userType: UserType.STUDENT | UserType.TEACHER
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const handleDeleteUser = (email: string) => {
        dispatch(deleteUserRequest({
            body: null,
            params: email
        }))
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
                    Object.values(props.list).map((user) => 
                        <tr key={user.email}>
                            <td> {user.email} </td>
                            <td> {user.firstName} </td>
                            <td> {user.lastName} </td>
                            <td> 
                                <Button 
                                    bgColor="white" 
                                    hoveredBgColor="red"
                                    borderColor= "red"
                                    hoveredLabelColor="white"
                                    onClick={() => handleDeleteUser(user.email)}
                                > 
                                    <ButtonLabel
                                        color="red"
                                    > 
                                        Delete 
                                    </ButtonLabel>
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