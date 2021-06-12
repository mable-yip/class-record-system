import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import DisplayTable from "./DisplayTable"
import { RootState } from '../..'
import { fetchClassesRequest } from "../../reducers/actionCreators"
import { ButtonLabel, Button } from "../common/styledComponents"
import "./manageClass.css"
import { useHistory } from "react-router-dom"

const ManagerClass = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { classList } = useSelector((state: RootState) => state.teacher)
    const { email } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchClassesRequest({}))
    }, [dispatch])
    
    return(
        <div className="classList">
            <div className="row">
                <h1 className="ml-3">Manage Class</h1>
                <Button 
                    className="mt-2 ml-3"
                    bgColor="#1E90FF" 
                    hoveredBgColor="#4169E1"
                    borderColor= "#1E90FF"
                    hoveredLabelColor="white"
                    onClick={() => history.push('/teacher/class')}
                >
                    <ButtonLabel color="white"> Add Class </ButtonLabel>
                </Button>
            </div>

            <div className="mt-4">
                <DisplayTable email={email?email:""} classModelObj={classList}/>
            </div>
        </div>
    )
}

export default ManagerClass