import React, { useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { APIMethod, ClassModel } from "../../interface/models";
import { deleteClassRequest } from "../../reducers/actionCreators";
import { Link } from 'react-router-dom'

interface Props { 
    list: { 
        [_id: string]: ClassModel 
    }
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.list)

    const handleDelete = (classId: string) => {
        dispatch(deleteClassRequest({
            method: APIMethod.DELETE,
            path: `teacher/class/${classId}`,
            body: null
        }))
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Start</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listArray.map(classObj => 
                        <tr key={classObj._id}>
                            <td> 
                                <Link to={`/teacher/class/${classObj._id}`}>
                                    {classObj.className}
                                </Link> 
                            </td>
                            <td> {classObj.startDate} </td>
                            <td> 
                                <Button className="btn btn-outline-danger" onClick={() => handleDelete(classObj._id)}>
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