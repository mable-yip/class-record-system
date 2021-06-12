import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../..";
import SearchStudent from "./SearchStudent";
import { ButtonLabel, Button, Table, TableHead, TableData, Tr } from "../common/styledComponents"
import "./classDetail.css"
import React, { useEffect, useState } from "react";
import { getClassRequest, updateClassRequest } from "../../reducers/actionCreators";
import { ClassModelPreview, StudentInfo } from "../../interface/models";
import axios from "axios";

interface ParamTypes {
    class_id: string
}

const ClassDetail = () => {
    let history = useHistory();
    const dispatch = useDispatch()
    const { class_id } = useParams<ParamTypes>()
    const [selectedStudents, setSelectedStudents] = useState<StudentInfo[]>([])
    const { currentClass } = useSelector((state: RootState) => state.teacher)

    useEffect(() => {
        dispatch(getClassRequest({
            params: class_id
        }))
        axios({
            method: 'post',
            url: '/studentsByemails',
            data: {
                studentemails: currentClass?.studentsEmail
            }
          }).then(({data}) => {
            setSelectedStudents(data)
          }, (error) => {
            console.log(error);
          });
    }, [class_id, currentClass?.className])
    


    const handleClick = () => {
        history.push("/teacher");
    }
    
    return(
        <div>
            <div className="classDetailPage">
                <div className="row"> 
                    <h1> Class Details </h1>
                    <Button
                        className="mt-2 ml-2"
                        bgColor="#1E90FF" 
                        hoveredBgColor="#4169E1"
                        borderColor= "#1E90FF"
                        hoveredLabelColor="white"
                        onClick={() => history.push(`/teacher/class/${class_id}`) }
                    >
                        <ButtonLabel color="white"> Edit </ButtonLabel>
                    </Button>
                </div>
                <div className="container mt-5">
                    <div>
                        <h3>Class Name: {currentClass?.className}</h3>
                        <h3>Start Date: {currentClass?.startDate}</h3>
                        <h3>Start Time: {currentClass?.repeat.startTime} </h3>
                        <h3>End Time: {currentClass?.repeat.endTime} </h3>
                        <h3>Repeat: {currentClass?.repeat.cycle} </h3>
                    </div>
                    <div>
                         <h3>Student List</h3>
                            {
                                <Table>
                                    <TableHead>
                                        <th>Email</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                    </TableHead>
                                    <tbody>
                                        {
                                            selectedStudents.map(student =>
                                                <Tr key={student.email}>
                                                <TableData> {student.email} </TableData>
                                                <TableData> {student.firstName} </TableData>
                                                <TableData> {student.lastName} </TableData>
                                            </Tr>     
                                            )
                                        }
                                    </tbody>
                                </Table>
                            }
                    </div>
                </div>
                <Button 
                    bgColor="white" 
                    hoveredBgColor="black"
                    borderColor= "black"
                    hoveredLabelColor="white"
                    onClick={handleClick}
                > 
                    <ButtonLabel
                        color="black"
                    > 
                        Back 
                    </ButtonLabel>
                </Button>
            </div>
        </div>
    )
}

export default ClassDetail
