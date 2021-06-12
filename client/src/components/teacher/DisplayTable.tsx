import { Modal, Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { ClassModel, InputFormType } from "../../interface/models";
import { deleteClassRequest } from "../../reducers/actionCreators";
import { Link, useHistory } from 'react-router-dom'
import { ButtonLabel, Button } from "../common/styledComponents"
import React, { useState } from "react";


interface Props { 
    email: string,
    classModelObj: { 
        [_id: string]: ClassModel 
    },
}

//params
const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    let history = useHistory()
    const listArray  = Object.values(props.classModelObj)

    const handleDelete = (classId: string) => {
        dispatch(deleteClassRequest({
            body: null,
            params: classId
        }))
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>Start End</th>
                        <th>Frequency</th>
                        <th> # of students</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listArray.map(classObj => 
                            <tr key={classObj._id}>
                                <td> 
                                    <Link to={`/teacher/class/info/${classObj._id}`}>
                                        {classObj.className}
                                    </Link> 
                                </td>
                                <td> {classObj.startDate} </td>
                                <td> {classObj.repeat.startTime} </td>
                                <td> {classObj.repeat.endTime} </td>
                                <td> {classObj.repeat.cycle} </td>
                                <td> {classObj.studentsEmail.length}</td>
                                <td>
                                    <Button 
                                        bgColor="#1E90FF" 
                                        hoveredBgColor="#4169E1"
                                        borderColor= "#1E90FF"
                                        hoveredLabelColor="white"
                                        onClick={() => history.push(`/teacher/class/${classObj._id}`)}>
                                        <ButtonLabel color="white"> Edit </ButtonLabel>
                                    </Button>         
                                    <Button 
                                        className="ml-3"
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        onClick={() => handleDelete(classObj._id)}>
                                        <ButtonLabel color="red"> Delete </ButtonLabel>
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