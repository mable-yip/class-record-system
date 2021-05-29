import React, { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import InputClassForm from "./InputClassForm"
import NavbarComponent from "../common/NavBarComponent"
import DisplayTable from "./DisplayTable"
import { RootState } from '../..'
import { APIMethod } from "../../interface/models"
import { fetchClassesRequest } from "../../reducers/actionCreators"

const ManagerClass = () => {
    const loaclStorage = localStorage.getItem('profile')
    const {email} = JSON.parse( loaclStorage ? loaclStorage: "")
    const history = useHistory()
    const dispatch = useDispatch()
    const [showCreateClass, setShowCreateClass] = useState(false)
    const { classList } = useSelector((state: RootState) => state.teacher)

    useEffect(() => {
        dispatch(fetchClassesRequest({
            method: APIMethod.GET,
            path: `teacher/class/${email}`,
            body: null
        }))

    }, [dispatch])
    
    return(
        <div>
            <NavbarComponent />
            <h1 className="text-center">Manage Class  <Button onClick={() => setShowCreateClass(true)}>Add Class</Button></h1>
            <Container>
                <Row>
                    <Col>
                        <DisplayTable list={classList}/>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-dark" size="lg" onClick={()=>history.push('/teacher')}>
                Back
            </Button>

            <Modal show={showCreateClass} onHide={() => setShowCreateClass(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Class
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputClassForm teacherEmail={email} closeModal={()=>setShowCreateClass(false)}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ManagerClass