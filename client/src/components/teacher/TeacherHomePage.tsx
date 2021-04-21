import NavbarComponent from '../common/NavBarComponent'
import { useDispatch } from 'react-redux';
import React, {useEffect, useState} from 'react'
import { getUser } from '../../actions/common/user'
import { Link } from 'react-router-dom';
import { UserType } from '../../interface/models';
import { Col, Row } from 'react-bootstrap';


const TeacherHomePage = () => {
    return (
        <div>
            <NavbarComponent />
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to="/teacher/manageStudent">
                        <h2> Manage Students </h2>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <Link to="/teacher/classHistory">
                        <h2> Class History  </h2>
                    </Link>
                </Col>
            </Row>
        </div>

    )
}

export default TeacherHomePage