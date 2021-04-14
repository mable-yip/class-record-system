import React from "react"
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";

const DisplayTable = (props: {list: any}) => {

    const { teacherList } = useSelector((state: RootState) => state.admin)
    console.log(teacherList)
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teacherList.map((user: { email: string, firstName: string, lastName: string }) => 
                            <tr key={user.email}>
                                <td> {user.email} </td>
                                <td> {user.firstName} </td>
                                <td> {user.lastName} </td>
                            </tr>                        
                            )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default DisplayTable