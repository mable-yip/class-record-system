import { useHistory, useParams } from "react-router-dom";
import { ButtonLabel, Button, Table, TableHead, TableData, Tr } from "../common/styledComponents"
import "./classDetail.css"
import React, { useEffect, useState } from "react";
import { ClassModelWithStudentInfo } from "../../interface/models";
import axios from "axios";

interface ParamTypes {
    classId: string
}

const ClassDetail = () => {
    let history = useHistory();
    const { classId } = useParams<ParamTypes>()
    const [ classInfo, setClassInfo ]= useState<ClassModelWithStudentInfo|null>(null)

    useEffect(() => {
        axios({
            method: 'get',
            url: `/teacher/class/${classId}`
          }).then(({data}) => {
            setClassInfo(data)
          }, (error) => {
            console.log(error);
          });
    }, [classId])
    
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
                        onClick={() => history.push(`/teacher/class/${classId}`) }
                    >
                        <ButtonLabel color="white"> Edit </ButtonLabel>
                    </Button>
                </div>
                <div className="container mt-5">
                    <div>
                        <h3>Class Name: {classInfo?.className}</h3>
                        <h3>Start Date: {classInfo?.startDate}</h3>
                        <h3>Start Time: {classInfo?.repeat.startTime} </h3>
                        <h3>End Time: {classInfo?.repeat.endTime} </h3>
                        <h3>Repeat: {classInfo?.repeat.cycle} </h3>
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
                                    classInfo?.studentInfo.map(student =>
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
                    <ButtonLabel color="black">Back</ButtonLabel>
                </Button>
            </div>
        </div>
    )
}

export default ClassDetail