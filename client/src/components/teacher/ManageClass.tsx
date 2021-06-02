import { useEffect, useState } from "react"
import { Col, Row, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import InputClassForm from "./InputClassForm"
import NavbarComponent from "../common/NavBarComponent"
import DisplayTable from "./DisplayTable"
import { RootState } from '../..'
import { fetchClassesRequest } from "../../reducers/actionCreators"
import { ButtonLabel, Button } from "../common/styledComponents"

const ManagerClass = () => {
    const loaclStorage = localStorage.getItem('profile')
    const {accessToken, email} = JSON.parse( loaclStorage ? loaclStorage: "")
    const dispatch = useDispatch()
    const [showCreateClass, setShowCreateClass] = useState(false)
    const { classList } = useSelector((state: RootState) => state.teacher)

    useEffect(() => {
        dispatch(fetchClassesRequest({
            body: null,
            params: accessToken
        }))

    }, [dispatch])
    
    return(
        <div>
            <NavbarComponent />
                <Row>
                    <h1 className="ml-3">Manage Class</h1>
                        <Button 
                            className="mt-2 ml-3"
                            bgColor="#1E90FF" 
                            hoveredBgColor="#4169E1"
                            borderColor= "#1E90FF"
                            onClick={() => setShowCreateClass(true)}
                        >
                            <ButtonLabel
                                color="white"
                                hoveredColor="white"
                            >
                                Add Class
                            </ButtonLabel>
                        </Button>

                </Row>
                <Row>
                    <Col>
                        <DisplayTable list={classList}/>
                    </Col>
                </Row>


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