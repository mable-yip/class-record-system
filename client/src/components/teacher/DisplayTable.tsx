import React, { useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { ClassModel } from "../../interface/models";
import { deleteClass } from "../../actions/teacher";

interface Props { 
    list: { 
        [_id: string]: ClassModel 
    }
}


const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.list)

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
                            <td> {classObj.className} </td>
                            <td> {classObj.startDate} </td>
                            <td> 
                                <Button className="btn btn-outline-danger" onClick={() => dispatch(deleteClass(classObj._id))}>
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