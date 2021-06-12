import React from "react"
import { useDispatch } from "react-redux";
import { UserType, Teacher, Student } from '../../interface/models'
import { deleteUserRequest } from "../../reducers/actionCreators";
import { Button, ButtonLabel, Table, TableHead, TableData, Tr } from "../common/styledComponents";

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
        <Table>
            <TableHead>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
            </TableHead>
            <tbody>
            {
                Object.values(props.list).map((user) => 
                    <Tr key={user.email}>
                        <TableData> {user.email} </TableData>
                        <TableData> {user.firstName} </TableData>
                        <TableData> {user.lastName} </TableData>
                        <TableData> 
                            <Button 
                                bgColor="white" 
                                hoveredBgColor="red"
                                borderColor= "red"
                                hoveredLabelColor="white"
                                onClick={() => handleDeleteUser(user.email)}
                            > 
                                <ButtonLabel color="red"> Delete </ButtonLabel>
                            </Button>                         
                        </TableData>
                    </Tr>                        
                )
            }
            </tbody>
        </Table>
    )
}

export default DisplayTable