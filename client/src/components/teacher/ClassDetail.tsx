import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../..";
import NavbarComponent from "../common/NavBarComponent";
import SearchStudent from "./SearchStudent";

interface ParamTypes {
    class_id: string
}

const ClassDetail = () => {
    let history = useHistory();
    const { class_id } = useParams<ParamTypes>()

    const { classList } = useSelector((state: RootState) => state.teacher)

    const handleClick = () => {
        history.push("/teacher/class");
    }
    
    return(
        <div>
            <NavbarComponent />
            <Row>
                <Col>
                    <h3>ClassName: {classList[class_id].className}</h3>
                    <h3>Start Date: {classList[class_id].startDate}</h3>
                    <h3>Start Time: {classList[class_id].repeat.startTime} </h3>
                    <h3>End Time: {classList[class_id].repeat.endTime} </h3>
                    <h3>Repeat: {classList[class_id].repeat.cycle} </h3>
                </Col>
                <Col>
                    <SearchStudent />
                </Col>
            </Row>
            <Button onClick={handleClick}> Back </Button>
        </div>
    )
}

export default ClassDetail