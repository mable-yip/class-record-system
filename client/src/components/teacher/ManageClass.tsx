import { useEffect, useState } from "react"
import { Col, Row, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import InputClassForm from "./InputClassForm"
import DisplayTable from "./DisplayTable"
import { RootState } from '../..'
import { fetchClassesRequest } from "../../reducers/actionCreators"
import { ButtonLabel, Button } from "../common/styledComponents"
import { InputFormType } from "../../interface/models"
import "./manageClass.css"

const ManagerClass = () => {
    const dispatch = useDispatch()
    const [showCreateClass, setShowCreateClass] = useState(false)
    const { classList } = useSelector((state: RootState) => state.teacher)
    const { email } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchClassesRequest({}))
    }, [dispatch])
    
    return(
        email!==null?
            <div className="classList">
                    <div>
                        <h1 className="ml-3">Manage Class</h1>
                        <Button 
                            className="mt-2 ml-3"
                            bgColor="#1E90FF" 
                            hoveredBgColor="#4169E1"
                            borderColor= "#1E90FF"
                            hoveredLabelColor="white"
                            onClick={() => setShowCreateClass(true)}
                        >
                            <ButtonLabel color="white"> Add Class </ButtonLabel>
                        </Button>
                    </div>

                    <div className="mt-4">
                        <DisplayTable email={email} classModelObj={classList}/>
                    </div>

                <Modal show={showCreateClass} onHide={() => setShowCreateClass(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title> Create Class </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputClassForm 
                            teacherEmail={email} 
                            closeModal={()=>setShowCreateClass(false)} 
                            formType={InputFormType.CREATE}
                        />
                    </Modal.Body>
                </Modal>
            </div>:null
    )
}

export default ManagerClass