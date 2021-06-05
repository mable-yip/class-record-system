import { Modal, Table } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { ClassModel, InputFormType } from "../../interface/models";
import { deleteClassRequest } from "../../reducers/actionCreators";
import { Link } from 'react-router-dom'
import { ButtonLabel, Button } from "../common/styledComponents"
import React, { useState } from "react";
import InputClassForm from "./InputClassForm";


interface Props { 
    email: string,
    classModelObj: { 
        [_id: string]: ClassModel 
    },
}

//params
const DisplayTable = (props: Props) => {
    const dispatch = useDispatch()
    const listArray  = Object.values(props.classModelObj)
    const [showEditClass, setShowEditClass] = useState(false)
    const [selectedClass, setSelectedClass] = useState< ClassModel | undefined>(undefined)

    console.log(selectedClass)

    const handleDelete = (classId: string) => {
        dispatch(deleteClassRequest({
            body: null,
            params: classId
        }))
    }

    const handleEdit = (classObj: ClassModel) => {
        setSelectedClass(classObj)
        setShowEditClass(true)
    }

    return (
        <div>
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
                                    <Link to={`/teacher/${classObj._id}`}>
                                        {classObj.className}
                                    </Link> 
                                </td>
                                <td> {classObj.startDate} </td>
                                <td>
                                    <Button 
                                        bgColor="#1E90FF" 
                                        hoveredBgColor="#4169E1"
                                        borderColor= "#1E90FF"
                                        hoveredLabelColor="white"
                                        onClick={() => handleEdit(classObj)}>
                                        <ButtonLabel
                                            color="white"
                                        >
                                            Edit
                                        </ButtonLabel>
                                    </Button>         
                                    <Button 
                                        className="ml-3"
                                        bgColor="white" 
                                        hoveredBgColor="red"
                                        borderColor= "red"
                                        hoveredLabelColor="white"
                                        onClick={() => handleDelete(classObj._id)}>
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

            <Modal show={showEditClass} onHide={() => setShowEditClass(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> Edit Class </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputClassForm 
                            teacherEmail={props.email} 
                            closeModal={()=>setShowEditClass(false)} 
                            formType={InputFormType.EDIT}
                            class={selectedClass}
                        />
                    </Modal.Body>
                </Modal>
                
        </div>
    )
}

export default DisplayTable